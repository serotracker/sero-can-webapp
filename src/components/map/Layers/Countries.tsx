import React, { useState, useEffect } from "react"
import { EstimateGradePrevalence } from "types";

function UpdateCountryEstimates(map: mapboxgl.Map, estimateGradePrevalences: EstimateGradePrevalence[]) {
    var features = map.querySourceFeatures('Countries', {
        sourceLayer: 'Countries',
    });

    features.forEach((f) => {
        map.setFeatureState({
            source: 'Countries',
            sourceLayer: "Countries",
            id: f.id,
        },
            {
                hasData: false
            });
    })

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

const Countries = (map: mapboxgl.Map | undefined, estimateGradePrevalences: EstimateGradePrevalence[]) => {
    useEffect(() => {
        if (estimateGradePrevalences.length > 0 && map) {
            if (map.getSource('Countries')) {
                UpdateCountryEstimates(map, estimateGradePrevalences)
            }
            else {
                map.on('styledata', function () {
                    if (map.getSource('Countries')) {
                        UpdateCountryEstimates(map, estimateGradePrevalences)
                    }
                });
            }
        }
    }, [estimateGradePrevalences, map]);

    return;
}

export default Countries;