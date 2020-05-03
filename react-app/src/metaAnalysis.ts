import { AirtableRecord } from "./types"

const Z_SCORE: number = 1.96;

function calcPooledPrevalence(records: AirtableRecord[]) {
    let var_sum = 0;
    let inv_var_sum = 0;
    let p_over_var_sum = 0;

    records.forEach((record: AirtableRecord) => {
        if ((record.seroprevalence !== null) && (record.denominator !== null)) {
            const variance = (record.seroprevalence * (1 - record.seroprevalence)) / record.denominator;
            var_sum = var_sum + variance;
            inv_var_sum = inv_var_sum + (1 / variance);
            p_over_var_sum = p_over_var_sum + (record.seroprevalence / variance);
        }
    });

    return {
        seroprevalence: p_over_var_sum / inv_var_sum,
        error: Z_SCORE * Math.sqrt(var_sum)
    }
}

// Given an aggregation factor (either 'countries' or 'populations')
// get pooled seroprevalence and error bounds for each country or population
export function getAggregateData(records: AirtableRecord[], aggregation_factor: "countries" | "populations") {
    const grouped_records: Record<string, AirtableRecord[]> = {}
    records.forEach((record: AirtableRecord) => {
        if ((record.seroprevalence !== null) && (record.denominator !== null) && (record[aggregation_factor] !== null)) {
            record[aggregation_factor]!.forEach((entry: string) => {

                if (entry in grouped_records) {
                    grouped_records[entry].push(record);
                }
                else {
                    grouped_records[entry] = [record];
                }
            })

        }
    });


    const aggregate_data: Record<string, string | number>[] = []

    for (const name in grouped_records) {
        const result = calcPooledPrevalence(grouped_records[name]);
        aggregate_data.push({ ...result, name });
    }
    return aggregate_data;
}