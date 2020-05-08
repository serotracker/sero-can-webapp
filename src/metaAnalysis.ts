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
        seroprevalence: p_over_var_sum / inv_var_sum * 100,
        error: Z_SCORE * Math.sqrt(var_sum) * 100
    }
}

// Given an aggregation factor (either 'country' or 'populations')
// get pooled seroprevalence and error bounds for each country or population
export function getAggregateData(records: AirtableRecord[], aggregation_factor: "country" | "populations") {
    const grouped_records: Record<string, AirtableRecord[]> = {}
    records.forEach((record: AirtableRecord) => {
        if ((record.seroprevalence !== null) && (record.denominator !== null) && (record[aggregation_factor] != null)) {
            if (aggregation_factor === 'country') {
                groupRecords(grouped_records, record, record.country!)
            }
            else {
                record.populations!.forEach((group) => {
                    groupRecords(grouped_records, record, group)
                })
            }
        }
    });


    const aggregate_data: Record<string, string | number>[] = []

    for (const name in grouped_records) {
        const result = calcPooledPrevalence(grouped_records[name]);
        aggregate_data.push({ ...result, name });
    }
    return aggregate_data;
}

function groupRecords(grouped_records: Record<string, AirtableRecord[]>, record: AirtableRecord, group: string) {
    if (group in grouped_records) {
        grouped_records[group].push(record);
    }
    else {
        grouped_records[group] = [record];
    }
}