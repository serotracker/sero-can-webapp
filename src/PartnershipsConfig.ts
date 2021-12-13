import { Partnership } from './types';

const PartnershipsConfig: Partnership[] = [
        {
            iso3: 'CAN',
            routeName: "Canada",
            tableauKey: "CanadianTableau",
            tableauUrl: {
                "en": "https://public.tableau.com/views/Canada-EN/Canadiancharts?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link",
                "fr": "https://public.tableau.com/views/Canada-FR/CanadianchartsFR?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
            },
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