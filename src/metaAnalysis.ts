import { AirtableRecord, AggregationFactor, AggregatedRecord } from "./types"

const Z_SCORE: number = 1.96;

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
            return Math.asin(Math.sqrt(n / (N + 1))) + Math.asin(Math.sqrt((n + 1) / (N + 1)))
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
            return 1 / (4 * N + 2)
        }
    }
}

function backTransform(t: number, method: string){
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
    }
}

export function aggregateRecords(records: AirtableRecord[], method: string = "naive_pooling") {
    let total_positive = 0;
    let total_tested = 0;

    const filteredRecords = records.filter(record => ((record.seroprevalence !== null) && (record.denominator !== null && record.denominator > 0)));
    const n_studies = filteredRecords.length;

    let pooled_p: number = 0;
    let error: number[] = [0, 0];

    if (method == "naive_pooling"){
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
        let n = 0;
        let prevalence = 0;
        let variance = 0;

        
        filteredRecords.forEach((record: AirtableRecord) => {
            if ((record.seroprevalence !== null) && (record.denominator !== null) && (record.seroprevalence !== 0) && (record.denominator !== 0)) {
                prevalence = transformPrevalence(record.seroprevalence, record.denominator, method)!;
                variance = transformVariance(record.seroprevalence, record.denominator, method)!;
                var_sum = var_sum + variance;
                inv_var_sum = inv_var_sum + (1 / variance);
                p_over_var_sum = p_over_var_sum + (prevalence / variance);
                n = n + record.denominator;
            }
        });

        pooled_p = p_over_var_sum / inv_var_sum;
        const conf_inter = [pooled_p - Z_SCORE * Math.sqrt(var_sum), pooled_p + Z_SCORE * Math.sqrt(var_sum)]

        pooled_p = backTransform(pooled_p, method)!; 
        error = [pooled_p - backTransform(conf_inter[0], method)!, backTransform(conf_inter[1], method)! - pooled_p];
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
        if ((record.seroprevalence !== null) && (record.denominator !== null) && (record[aggregationString as "country" | "population_group"] != null)) {
            if (aggregationString === 'country') {
                groupRecords(grouped_records, record, record.country!)
            }
            else {
                record.population_group!.forEach((group) => {
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
