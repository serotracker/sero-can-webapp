import { useState, useEffect, useContext } from "react"
import { AppContext } from "context";
import ReactDOMServer from "react-dom/server";
import { EstimateGradePrevalence, CountriesMapConfig } from "types";
import mapboxgl from "mapbox-gl";
import CountryPopup from 'components/map/Popups/CountryPopup'
import PartnershipsConfig from '../../../PartnershipsConfig'
import { useHistory } from 'react-router-dom';
import { sendAnalyticsEvent } from "../../../utils/analyticsUtils";
import {getMapboxLatitudeOffset} from "../../../utils/utils";

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

function SetMapData(map: mapboxgl.Map, estimateGradePrevalences: EstimateGradePrevalence[]) {
    if(map.getSource(COUNTRY_LAYER_ID))
    {
    SetCountryEstimates(map, estimateGradePrevalences);
    }
}

const Countries = (map: mapboxgl.Map | undefined, {estimateGradePrevalences, countryFocus}: CountriesMapConfig) => {

    const [state] = useContext(AppContext);
    const [highlight, setHighlight] = useState<string | undefined>(undefined);
    const [countriesLoaded, setCountriesLoaded] = useState<boolean>(false);
    const history = useHistory();

    // If estimates are updated, maps estimate data to country features
    useEffect(() => {
        if (map && estimateGradePrevalences && countriesLoaded)
        {
            SetMapData(map, estimateGradePrevalences);
        }
    }, [map, estimateGradePrevalences, countryFocus, countriesLoaded]);

    // Waits until map is loaded
    useEffect(() => {
        if (map)
        {
            if (!map.getSource(COUNTRY_LAYER_ID)) 
            {
                map.on('styledata', ()=>setCountriesLoaded(true));
            }
            else
            {
                setCountriesLoaded(true);
            }
        }
    }, [map]);


    // wait until map is loaded then creates and binds popup to map events
    useEffect(() => {
        if (map) {
            map.on('click', COUNTRY_LAYER_ID, function(e: any) {
                if (map.queryRenderedFeatures(e.point).filter((f) => f.source === "study-pins").length === 0) {
                    const country = e.features[0];
                    const offset = getMapboxLatitudeOffset(map)
                    console.log("clicked country layer")
                    new mapboxgl.Popup({offset: 25, className: "pin-popup",})
                      .setMaxWidth("370px")
                      .setHTML(ReactDOMServer.renderToString(CountryPopup(country, state.language)))
                      .setLngLat(e.lngLat)
                      .addTo(map);
                    map.flyTo({
                        center: [e.lngLat.lng, e.lngLat.lat - offset],
                        curve: 0.5,
                        speed: 0.5,
                    });
                    sendAnalyticsEvent({
                        category: "Country popup",
                        action: "open",
                        label: e.features[0].id,
                    });
                }
            });
        }
    }, [map, state.language, history])

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
                    
                    setHighlight(e.features[0].id)
                    map.setFeatureState(
                        { source: COUNTRY_LAYER_ID, sourceLayer: COUNTRY_LAYER_ID, id: e.features[0].id },
                        { isHighlighted: true }
                    );
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