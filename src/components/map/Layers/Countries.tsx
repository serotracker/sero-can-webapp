import { useState, useEffect, useContext } from "react"
import { AppContext } from "context";
import ReactDOMServer from "react-dom/server";
import { EstimateGradePrevalence } from "types";
import mapboxgl from "mapbox-gl";
import CountryPopup from 'components/map/Popups/CountryPopup'

function SetCountryEstimates(map: mapboxgl.Map, estimateGradePrevalences: EstimateGradePrevalence[]) {
    estimateGradePrevalences.forEach((country: EstimateGradePrevalence) => {
        if (country && country.testsAdministered && country.alpha3Code) {
            map.setFeatureState(
                {
                    source: "Countries",
                    sourceLayer: "Countries",
                    id: country.alpha3Code,
                },
                {
                    hasData: true,
                    testsAdministered: country.testsAdministered,
                    geographicalName: country.geographicalName,
                    numberOfStudies: country.numberOfStudies,
                    localEstimate: country.localEstimate,
                    nationalEstimate: country.nationalEstimate,
                    regionalEstimate: country.regionalEstimate,
                    sublocalEstimate: country.sublocalEstimate,
                }
            );
        }
    });
}

function UpdateCountryEstimates(map: mapboxgl.Map, estimateGradePrevalences: EstimateGradePrevalence[]) {
    var onlyIso3: (string | null)[] = estimateGradePrevalences.map((c) => { return c.alpha3Code })

    if (map.getLayer("Countries") && map.isSourceLoaded('Countries')) {
        map?.setFilter('Countries',
            ["in",
                ["get", 'CODE'],
                ["literal", onlyIso3]
            ]);
    }
    else { // If countries has not been loaded, wait until it's source has finished.
        map.on('sourcedata', function (e: any) {
            if (e.sourceId == 'Countries' && map.isSourceLoaded('Countries')) {
                map?.setFilter('Countries',
                    ["in",
                        ["get", 'CODE'],
                        ["literal", onlyIso3]
                    ]);
            }
        });
    }
}

const Countries = (map: mapboxgl.Map | undefined, estimateGradePrevalences: EstimateGradePrevalence[]) => {

    const [state] = useContext(AppContext);
    const [popup, setPopup] = useState<mapboxgl.Popup | undefined>(undefined);

    useEffect(() => {
        if (estimateGradePrevalences.length > 0 && map && map.getSource('Countries')) {
            SetCountryEstimates(map, estimateGradePrevalences);
        }
        else if (map) {
            map.on('sourcedata', function (e: any) {
                if (e.sourceId == 'Countries' && map.isSourceLoaded('Countries')) {
                    SetCountryEstimates(map, estimateGradePrevalences);
                }
            });
        }
    }, [estimateGradePrevalences, map]);

    useEffect(() => {
        if (estimateGradePrevalences.length > 0 && map) {
            UpdateCountryEstimates(map, estimateGradePrevalences)
        }
    }, [estimateGradePrevalences, map]);

    useEffect(() => {
        if (map && popup === undefined) {
            const countryPop = new mapboxgl.Popup({ offset: 5, className: "pin-popup", closeButton: false });

            map.on("mouseenter", "Countries", function (e: any) {
                if (e.features[0].state.hasData) {
                    countryPop.setMaxWidth("250px")
                        .setHTML(ReactDOMServer.renderToString(CountryPopup(e.features[0], state.language)))
                        .setLngLat(e.lngLat)
                        .trackPointer()
                        .addTo(map);
                }
            });

            map.on("mouseleave", "Countries", function (e: any) {
                if (countryPop.isOpen()) {
                    countryPop
                    .remove()
                }
            });

            map.on("mousemove", "Countries", function (e: any) {
                if (e.features[0].state.hasData && countryPop.isOpen()) {
                    countryPop.setHTML(ReactDOMServer.renderToString(CountryPopup(e.features[0], state.language)))
                }
            });

            setPopup(countryPop);
        }
    }, [map, state.language])

    return;
}

export default Countries;