import { useState, useEffect, useContext } from "react"
import { AppContext } from "context";
import ReactDOMServer from "react-dom/server";
import { EstimateGradePrevalence, CountriesMapConfig } from "types";
import mapboxgl from "mapbox-gl";
import CountryPopup from 'components/map/Popups/CountryPopup'
import PartnershipsConfig from '../../../PartnershipsConfig'
import { useHistory } from 'react-router-dom';

const COUNTRY_LAYER_ID = 'Countries';

// Maps estimate grade prevalence data to a match ISO3 code in the countries feature layer
function SetCountryEstimates(map: mapboxgl.Map, estimateGradePrevalences: EstimateGradePrevalence[]) {

    map.removeFeatureState({
        source: COUNTRY_LAYER_ID,
        sourceLayer: COUNTRY_LAYER_ID
        });

    estimateGradePrevalences.forEach((country: EstimateGradePrevalence) => {
        if (country && country.testsAdministered && country.alpha3Code) {

            let partnershipConfig: any = PartnershipsConfig.Country.find(x => x.iso3 === country.alpha3Code)

            //PartnershipsConfig.Country.hasOwnProperty(country.alpha3Code)

            map.setFeatureState(
                {
                    source: COUNTRY_LAYER_ID,
                    sourceLayer: COUNTRY_LAYER_ID,
                    id: country.alpha3Code,
                },
                {
                    hasData: true,
                    isHighlighted: false,
                    testsAdministered: country.testsAdministered,
                    geographicalName: country.geographicalName,
                    numberOfStudies: country.numberOfStudies,
                    localEstimate: country.localEstimate,
                    nationalEstimate: country.nationalEstimate,
                    regionalEstimate: country.regionalEstimate,
                    sublocalEstimate: country.sublocalEstimate,
                    partnershipConfig: partnershipConfig
                }
            );
        }
    });
}

// Filters out Country features based on their existance within the new estimate grade prevalences
function FilterCountryEstimates(map: mapboxgl.Map, estimateGradePrevalences: EstimateGradePrevalence[]) {
    const onlyIso3: (string | null)[] = estimateGradePrevalences.map((c) => { return c.alpha3Code })

    if (map.getLayer(COUNTRY_LAYER_ID) && map.isSourceLoaded(COUNTRY_LAYER_ID)) {
        map?.setFilter(COUNTRY_LAYER_ID,
            ["in",
                ["get", 'CODE'],
                ["literal", onlyIso3]
            ]);
    }
    else { // If countries has not been loaded, wait until it's source has finished.
        map.on('sourcedata', function (e: any) {
            if (e.sourceId === COUNTRY_LAYER_ID && map.isSourceLoaded(COUNTRY_LAYER_ID)) {
                map?.setFilter(COUNTRY_LAYER_ID,
                    ["in",
                        ["get", 'CODE'],
                        ["literal", onlyIso3]
                    ]);
            }
        });
    }
}

const Countries = (map: mapboxgl.Map | undefined, {estimateGradePrevalences}: CountriesMapConfig) => {

    const [state] = useContext(AppContext);
    const [popup, setPopup] = useState<mapboxgl.Popup | undefined>(undefined);
    const [highlight, setHighlight] = useState<string | undefined>(undefined);
    const history = useHistory();

    // If estimates are updated, waits until map is loaded then maps estimate data to country features
    useEffect(() => {

        if (map)
        {
            if (map?.getSource(COUNTRY_LAYER_ID) === undefined) 
            {
                map.once('sourcedata', function (e: any) {
                    if (e.sourceId === COUNTRY_LAYER_ID && map.isSourceLoaded(COUNTRY_LAYER_ID)) {
                        SetCountryEstimates(map, estimateGradePrevalences);
                    }
                });
            }
            else {
                SetCountryEstimates(map, estimateGradePrevalences);
            }
        }
    }, [map, estimateGradePrevalences]);


    // wait until map is loaded then creates and binds popup to map events
    useEffect(() => {
        if (map && popup === undefined) {
            const countryPop = new mapboxgl.Popup({
              offset: 25,
              className: "pin-popup",
              closeOnClick: true,
              closeButton: true,
              anchor: 'top-left'
            });

            setPopup(countryPop)

            map.on('click', COUNTRY_LAYER_ID, function(e: any) {
                
                if (map.queryRenderedFeatures(e.point).filter((f) => f.source === "study-pins").length === 0) {
                    const country = e.features[0];
                    countryPop
                      .setHTML(ReactDOMServer.renderToString(
                          CountryPopup(
                            country, 
                            state.language, 
                            country.state?.studyConfig ? (() => history.push(`/${state.language}/${country.state.studyConfig.viewUrl}`)) : null )))
                      .setLngLat(e.lngLat)
                      .addTo(map);
                  }
            });
        }
    }, [map, state.language, popup, history])

    useEffect(() => {
        if (map) {
            map.on('mousemove', COUNTRY_LAYER_ID, function(e: any){
                if(e.features && e.features.length > 0 && e.features[0].state.hasData) {
                    if (highlight !== undefined){
                        map.setFeatureState(
                            { source: COUNTRY_LAYER_ID, sourceLayer: COUNTRY_LAYER_ID, id: highlight },
                            { isHighlighted: false }
                        );
                    }
                    
                    map.setFeatureState(
                        { source: COUNTRY_LAYER_ID, sourceLayer: COUNTRY_LAYER_ID, id: e.features[0].id },
                        { isHighlighted: true }
                    );
                    setHighlight(e.features[0].id)
                }
            })
            map.on('mouseleave', COUNTRY_LAYER_ID, function(){
                if (highlight !== undefined){
                    map.setFeatureState(
                        { source: COUNTRY_LAYER_ID, sourceLayer: COUNTRY_LAYER_ID, id: highlight },
                        { isHighlighted: false }
                    );
                }
                setHighlight(undefined)
            })
        }
    }, [map, highlight])

    return;
}

export default Countries;