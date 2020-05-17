import { AirtableRecord, AggregationFactor, AggregatedRecord } from "./types"

const Z_SCORE: number = 1.96;

export function aggregateRecords(records: AirtableRecord[]) {
    let total_positive = 0;
    let total_tested = 0;

    const filteredRecords = records.filter(record => ((record.seroprevalence !== null) && (record.denominator !== null && record.denominator > 0)));
    const n_studies = filteredRecords.length;

    filteredRecords.forEach((record: AirtableRecord) => {
        total_positive += (record.seroprevalence as number) * (record.denominator as number);
        total_tested += (record.denominator as number);
    });

    const pooled_p = total_positive / total_tested;
    const pooled_var = ((pooled_p) * (1 - pooled_p)) / total_tested;
    const error_sym = Z_SCORE * Math.sqrt(pooled_var)
    let error: number | number[] = error_sym * 100;
    if (error_sym > pooled_p) {
        error = [pooled_p * 100, error_sym * 100];
    }

    const aggregatedRecord: AggregatedRecord = {
        seroprevalence: pooled_p * 100,
        error,
        n: total_tested,
        num_studies: n_studies,
        name: ""
    }
    return aggregatedRecord
}

// Given an aggregation factor (either 'country' or 'populations')
// get pooled seroprevalence, error bounds, and n (total number of tests) for each country or population
export function getAggregateData(records: AirtableRecord[], aggregation_factor: AggregationFactor) {
    const grouped_records: Record<string, AirtableRecord[]> = {}
    const aggregationString: string = aggregation_factor.toString();
    records.forEach((record: AirtableRecord) => {
        if ((record.seroprevalence !== null) && (record.denominator !== null) && (record[aggregationString as "country" | "populations"] != null)) {
            if (aggregationString === 'country') {
                groupRecords(grouped_records, record, record.country!)
            }
            else {
                record.populations!.forEach((group) => {
                    groupRecords(grouped_records, record, group)
                })
            }
        }
    });


    const aggregate_data: AggregatedRecord[] = []

    for (const name in grouped_records) {
        const result = aggregateRecords(grouped_records[name]);
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