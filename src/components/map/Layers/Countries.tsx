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

            const partnershipConfig = PartnershipsConfig.find(x => x.iso3 === country.alpha3Code)

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

function SetMapData(map: mapboxgl.Map, estimateGradePrevalences: EstimateGradePrevalence[], countryFocus: any) {

    SetCountryEstimates(map, estimateGradePrevalences);

    if(countryFocus) // Shades following countries dark
    {
        const fa = map.querySourceFeatures(COUNTRY_LAYER_ID, 
            {
            sourceLayer: COUNTRY_LAYER_ID
            });

        fa.forEach(f => { //filter((f) => Object.keys(f.state).length > 0)\
            if (f.id !== countryFocus)
            {
                map.setFeatureState({
                source: f.source,
                sourceLayer: f.sourceLayer,
                id: f.id,
                }, 
                {
                    Shaded: true
                });
            }
        })
    }
}

const Countries = (map: mapboxgl.Map | undefined, {estimateGradePrevalences, countryFocus}: CountriesMapConfig) => {

    const [state] = useContext(AppContext);
    const [popup, setPopup] = useState<mapboxgl.Popup | undefined>(undefined);
    const [highlight, setHighlight] = useState<string | undefined>(undefined);
    const history = useHistory();

    // If estimates are updated, waits until map is loaded then maps estimate data to country features
    useEffect(() => {

        if (map)
        {
            if(estimateGradePrevalences)
            {
                if (!map.getSource(COUNTRY_LAYER_ID)) 
                {
                    map.on('styledata', ()=>SetMapData(map, estimateGradePrevalences, countryFocus));
                }
                else {
                    SetMapData(map, estimateGradePrevalences, countryFocus);
                }
            }
        }
    }, [map, estimateGradePrevalences, countryFocus]);


    // wait until map is loaded then creates and binds popup to map events
    useEffect(() => {
        if (map && popup === undefined) {
            const countryPopup = new mapboxgl.Popup({
              offset: 25,
              className: "pin-popup",
              closeOnClick: true,
              closeButton: true,
              anchor: 'top-left'
            });

            setPopup(countryPopup)

            map.on('click', COUNTRY_LAYER_ID, function(e: any) {
                
                if (map.queryRenderedFeatures(e.point).filter((f) => f.source === "study-pins").length === 0) {
                    const country = e.features[0];
                    countryPopup
                      .setHTML(ReactDOMServer.renderToString(
                          CountryPopup(
                            country, 
                            state.language)))
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