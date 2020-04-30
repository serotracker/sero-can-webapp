import { AirtableRecord } from "./types"

const Z_SCORE: number = 1.96;

function calcPooledPrevalence(records: AirtableRecord[]) {
    let var_sum = 0;
    let inv_var_sum = 0;
    let p_over_var_sum = 0;

    records.forEach((record: AirtableRecord) => {
        if ((record.seroprevalence !== null) && (record.denominator !== null)) {
            const variance: number = (record.seroprevalence*(1 - record.seroprevalence)) / record.denominator;
            var_sum = var_sum + variance;
            inv_var_sum = inv_var_sum + (1/variance);
            p_over_var_sum = p_over_var_sum + (record.seroprevalence/variance); 
        }
    });

    return {
        seroprevalence: p_over_var_sum / inv_var_sum,
        error: Z_SCORE*Math.sqrt(var_sum)
    } 
}