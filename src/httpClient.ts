import { AirtableRecord, CaseCountRecord, AggregatedRecord, AggregationFactor } from "./types"

export default class httpClient {
    async httpGet(url: string){
        let url_full = url;
        if(process.env.REACT_APP_ROUTE){
            url_full = process.env.REACT_APP_ROUTE + url_full;
        }
        const res = await fetch(url_full);
        if(res.status !== 200) {
            const error_msg = res.json();
            console.error(error_msg);
            return;
        }
        else {
            const response_json = await res.json();
            return response_json;
        }
    }

    async httpPost(url: string, data: Record<string, any>){
        let url_full = url;
        if(process.env.REACT_APP_ROUTE){
            url_full = process.env.REACT_APP_ROUTE + url_full;
        }
        const res = await fetch(url_full, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        if(res.status !== 200) {
            const error_msg = res.json();
            console.error(error_msg);
            return;
        }
        else {
            const response_json = await res.json();
            return response_json;
        }
    }

    async getHealthcheck() {
        const healthcheck: string = await this.httpGet('/healthcheck');
        return healthcheck;
    }

    async getAirtableRecords() {
        const response = await this.httpGet('/airtable_scraper/records');
        if(!response || !("records" in response) || !("updated_at" in response)) {
            return [];
        }
        const airtable_records = response.records!.map((item: Record<string, any>)=>{ 
            // Convert response to AirtableRecord type
            const record: AirtableRecord = { 
                source_name: item.SOURCE_NAME ? item.SOURCE_NAME[0] : null,
                lead_org: item.LEAD_ORG ? item.LEAD_ORG[0] : null,
                first_author: item.FIRST_AUTHOR ? item.FIRST_AUTHOR[0]: null,
                source_type: item.SOURCE_TYPE ? item.SOURCE_TYPE[0]: null,
                study_status: item.STUDY_STATUS ? item.STUDY_STATUS[0]: null,
                study_type: item.STUDY_TYPE,
                test_type: item.TEST_TYPE,
                specimen_type: item.SPECIMEN_TYPE ? item.SPECIMEN_TYPE[0] : null,
                isotypes_reported: item.ISOTYPES,
                manufacturer: item.MANUFACTURER,
                approving_regulator: item.APPROVAL,
                sensitivity: item.SENSITIVITY,
                specificity: item.SPECIFICITY,
                publish_date: item.PUB_DATE,
                publisher: item.PUBLISHER,
                country: item.COUNTRY ? item.COUNTRY[0] : null,
                state: item.STATE,
                city: item.CITY,
                population_group: item.POPULATION_GROUP,
                sex: item.SEX,
                age: item.AGE,
                denominator: item.DENOMINATOR,
                summary: item.SUMMARY,
                seroprevalence: item.SERUM_POS_PREVALENCE,
                sample_size: item.SAMPLE_SIZE,
                sampling_method: item.SAMPLING,
                sampling_start_date: item.SAMPLING_START,
                sampling_end_date: item.SAMPLING_END,
                risk_of_bias: item.OVERALL_RISK_OF_BIAS ? item.OVERALL_RISK_OF_BIAS[0] : null,
                url: item.URL ? item.URL[0] : null,
                include_in_n: item.INCLUDE_IN_N ? true : false
            };

            return record; 
        });
        
        // Remove timestamp from updated at string
        const updated_at_words = response.updated_at!.split(" ", 4);
        const updated_at_string = updated_at_words.join(" ");

        return {
            airtable_records,
            updated_at: updated_at_string
        };
    }

    async getCaseCounts()
    {
        const response = await this.httpGet('/cases_count_scraper/records');
        const caseCountRecords = response.records.Countries.filter((o: { Country: string; }) =>o.Country).map((item: Record<string,any>)=>{
            const record: CaseCountRecord = {
                country: item.Country,
                countryCode: item.CountryCode,
                date: item.Date,
                newConfirmed: item.NewConfirmed,
                newDeaths: item.NewDeaths,
                newRecovered: item.NewRecovered,
                totalConfirmed: item.TotalConfirmed,
                totalDeaths: item.TotalDeaths,
                totalRecovered: item.TotalRecovered,
            }
            return record;
        }
        )
        return caseCountRecords;
    }

    async postMetaAnalysis(records: AirtableRecord[], aggregation_variable: AggregationFactor, meta_analysis_technique: string = 'fixed', meta_analysis_transformation: string = 'double_arcsin_precise'){
        // Note: while the rest of the aggregation variables can stay consistent with frontend nomenclature
        // the aggregation variable "country" must be changed to "COUNTRY"
        const formatted_agg_var = aggregation_variable === AggregationFactor.country ? "COUNTRY" : aggregation_variable;
        const formatted_records = records!.filter(item => item[aggregation_variable] != null).map((item: AirtableRecord)=>{ 
            // Note, all aggregation variable fields must be string arrays
            const record: Record<string, any> = { 
                SERUM_POS_PREVALENCE: item.seroprevalence,
                DENOMINATOR: item.denominator,
                COUNTRY: [item.country]
            };
            if(aggregation_variable !== AggregationFactor.country){
                record[aggregation_variable] = Array.isArray(item[aggregation_variable]) ? item[aggregation_variable] : [item[aggregation_variable]];
            }
            return record; 
        });

        const req_body = {
            records: formatted_records,
            aggregation_variable: formatted_agg_var,
            meta_analysis_technique,
            meta_analysis_transformation
        };

        const response = await this.httpPost('/meta_analysis/records', req_body);
        if(response){
            // Convert response to aggregatedRecord object
            const formatted_response: AggregatedRecord[] = Object.keys(response).filter((key: string) => response[key] !== null).map((key: string) => {
                return {
                    error: response[key].error_percent,
                    n: response[key].total_N,
                    name: key,
                    num_studies: response[key].n_studies,
                    seroprevalence: response[key].seroprevalence_percent,
                }
            });
            return formatted_response;
        }
        return response;
    }

    // Aggregation of all records, to support TotalStats view
    // TODO: Consolidate this function with postMetaAnalysis
    async postMetaAnalysisAll(records: AirtableRecord[], meta_analysis_technique: string = 'fixed', meta_analysis_transformation: string = 'double_arcsin_precise'){
        const formatted_records = records!.map((item: AirtableRecord)=>{ 
            const record = { 
                SERUM_POS_PREVALENCE: item.seroprevalence,
                DENOMINATOR: item.denominator,
                COUNTRY: [item.country]
            };
            return record; 
        });

        const req_body = {
            records: formatted_records,
            meta_analysis_technique,
            meta_analysis_transformation
        };

        const response = await this.httpPost('/meta_analysis/records', req_body);
        const formatted_response = {
            error: response.error_percent,
            n: response.total_N,
            countries: response.countries,
            num_studies: response.n_studies,
            seroprevalence: response.seroprevalence_percent
        }
        return formatted_response;
    }
}