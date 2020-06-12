import { AirtableRecord, AggregationFactor, AggregatedRecord, FilterType } from "./types"

const Z_SCORE: number = 1.96;
export const MIN_DENOMINATOR: number = 0;

function transformPrevalence (p: number, N: number, method: string){
    switch(method as any) {
        case "inverse_variance": {
            return p; 
        }
        case "logit": {
            return Math.log(p / (1 - p))
        }
        case "arcsin": {
            return Math.asin(Math.sqrt(p))
        }
        case "double_arcsin": {
            const n = N * p
            return (Math.asin(Math.sqrt(n / (N + 1))) + Math.asin(Math.sqrt((n + 1) / (N + 1))) )
        }
        case "double_arcsin_RSM": {
            const n = N * p
            return 0.5 * (Math.asin(Math.sqrt(n / (N + 1))) + Math.asin(Math.sqrt((n + 1) / (N + 1))) )
        }
    }
}

function transformVariance(p: number, N: number, method: string){
    switch(method as any){
        case "inverse_variance": {
            return p * (1 - p) / N; 
        }
        case "logit": {
            return 1 / (N * p) + 1 / (N * (1 - p));
        }
        case "arcsin": {
            return 1 / (4 * N)
        }
        case "double_arcsin": {
            return 1 / (N + 0.5)
        }
        case "double_arcsin_RSM": {
            return 1 / (4 * N + 2)
        }
    }
}

function backTransform(t: number, n: number, method: string){
    switch(method as any){
        case "inverse_variance": {
            return t;
        }
        case "logit": {
            return Math.exp(t) / (Math.exp(t) + 1);
        }
        case "arcsin": {
            return Math.sin(t) ** 2
        }
        case "double_arcsin": {
            return Math.sin(t / 2) ** 2
        }
        case "double_arcsin_RSM": {
            return 0.5 * (1 - Math.sign(Math.cos(t)) 
            * Math.sqrt(1 - (Math.sin(2 * t) + (Math.sin(2 * t) - 2 * Math.sin(2 * t)) / n) ** 2))
        }
    }
}

export function aggregateRecords(records: AirtableRecord[], method: string = "double_arcsin_RSM") {
    let total_positive = 0;
    let total_tested = 0;

    const filteredRecords = records.filter(record => ((record.seroprevalence !== null) && (record.denominator !== null && record.denominator >= MIN_DENOMINATOR)));
    const n_studies = filteredRecords.length;

    let pooled_p: number = 0;
    let error: number[] = [0, 0];

    if (method === "naive_pooling"){
        filteredRecords.forEach((record: AirtableRecord) => {
            total_positive += (record.seroprevalence as number) * (record.denominator as number);
            total_tested += (record.denominator as number);
        });

        pooled_p = total_positive / total_tested;

        const pooled_var = ((pooled_p) * (1 - pooled_p)) / total_tested;
        error = [Z_SCORE * Math.sqrt(pooled_var), Z_SCORE * Math.sqrt(pooled_var)];
    } else {
        let var_sum = 0;
        let inv_var_sum = 0;
        let p_over_var_sum = 0;
        let inv_n_sum = 0;
        let prevalence = 0;
        let variance = 0;

        
        filteredRecords.forEach((record: AirtableRecord) => {
            if ((record.seroprevalence !== null) && (record.denominator !== null) && (record.seroprevalence !== 0) && (record.denominator !== 0)) {
                prevalence = transformPrevalence(record.seroprevalence, record.denominator, method)!;
                variance = transformVariance(record.seroprevalence, record.denominator, method)!;
                var_sum = var_sum + variance;
                inv_var_sum = inv_var_sum + (1 / variance);
                p_over_var_sum = p_over_var_sum + (prevalence / variance);
                total_tested = total_tested + record.denominator;
                inv_n_sum = inv_n_sum + 1 / record.denominator;
            }
        });

        pooled_p = p_over_var_sum / inv_var_sum;
        const conf_inter = [pooled_p - Z_SCORE * Math.sqrt(var_sum), pooled_p + Z_SCORE * Math.sqrt(var_sum)]

        const overall_n = 1 / (inv_n_sum / n_studies)

        pooled_p = backTransform(pooled_p, overall_n, method)!; 
        error = [pooled_p - backTransform(conf_inter[0], overall_n, method)!, backTransform(conf_inter[1], overall_n, method)! - pooled_p];
    }

    if (pooled_p - error[0] < 0) {error[0] = pooled_p}
    if (pooled_p + error[1] > 1) {error[1] = 1 - pooled_p}
    
    const aggregatedRecord: AggregatedRecord = {
        seroprevalence: pooled_p * 100,
        error: [error[0] * 100, error[1] * 100],
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
        const recordStrings = record[aggregationString as FilterType];
        if ((record.seroprevalence !== null) && (record.denominator !== null) && (recordStrings != null)) {
            const strings = recordStrings instanceof Array ? recordStrings : [recordStrings];
            strings.forEach( group => groupRecords(grouped_records, record, group) )
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
