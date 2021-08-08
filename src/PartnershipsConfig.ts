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
                    [-140.99, 41.67], // Southwest coordinates
                    [-52.64, 83.23] // Northeast coordinates
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