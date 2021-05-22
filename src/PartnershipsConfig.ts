import { CANADA_URLS } from "./constants";

const PartnershipsConfig = {
    Country: [
        {
            iso3: 'CAN',
            tableauKey: "CanadianTableau",
            tableauUrl: CANADA_URLS,
            routeName: "Canada",
            mapboxMapOptions: {
                bounds: [
                    [-140.99778, 41.6751050889], // Southwest coordinates
                    [-52.6480987209, 83.23324] // Northeast coordinates
                ],
                maxBounds: [
                    [-145, 40], // Southwest coordinates
                    [-50, 84] // Northeast coordinates
                ]
            }
        }
    ]
}

export default PartnershipsConfig;