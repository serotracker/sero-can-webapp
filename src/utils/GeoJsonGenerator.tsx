import { AirtableRecord } from "../types";

// Please refer to GeoJSON spec rfc7946 if adding addiontal members: https://tools.ietf.org/html/rfc7946#section-3.1.1
function recordsToGeoJsonFeatures(records: AirtableRecord[]): GeoJSON.Feature[] {
    return records.flatMap((record) => {
        if (!record.pin_latitude && !record.pin_longitude){
            return [];
        }
        return {
            type: "Feature",
            properties: { // We can add any properties here to modify how we want to render the pin - helpful for WHO data
                estimate_grade: record.estimate_grade,
                source_id: record.source_id ?? undefined
            },
            geometry: {
                type: "Point",
                coordinates: [record.pin_longitude, record.pin_latitude],
            },
        };
    });
}

export default function generateSourceFromRecords(records: AirtableRecord[]): mapboxgl.GeoJSONSourceRaw {
    const f = recordsToGeoJsonFeatures(records);
    const source = {
        type: "geojson",
        promoteId: 'source_id',
        data: {
            type: "FeatureCollection",
            features: f,
        },
    } as mapboxgl.GeoJSONSourceRaw;

    return source;
}