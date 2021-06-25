import { Partnership } from './types';

const PartnershipsConfig: Partnership[] = [
        {
            iso3: 'CAN',
            routeName: "Canada",
            tableauKey: "CanadianTableau",
            tableauUrl: {
                "en": "https://public.tableau.com/views/SeroTrackerAnalyse/Canadiandetail?:language=en&:display_count=y&publish=yes&:origin=viz_share_link",
                "fr": "https://public.tableau.com/views/Canada-FR/Canadiandetail?:language=fr&:display_count=y&publish=yes&:origin=viz_share_link"
            },
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

export default PartnershipsConfig;