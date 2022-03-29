import { Partnership } from './types';
import { CANADA_URLS } from "./constants";

const PartnershipsConfig: Partnership[] = [
        {
            iso3: 'CAN',
            routeName: "Canada",
            tableauKey: "CanadianTableau",
            tableauUrl: CANADA_URLS,
            mapboxMapOptions: {
                bounds: [
                    [-148, 39], // Southwest coordinates
                    [-50, 75] // Northeast coordinates
                ],
                /*
                maxBounds: [
                    [-147, 37], // Southwest coordinates
                    [-48, 86] // Northeast coordinates
                ]
                */
            }
        }
    ]

export default PartnershipsConfig;