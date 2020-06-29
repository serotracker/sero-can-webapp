import { AirtableRecord, AggregatedRecord } from "./types"

export default class httpClient {
    async httpGet(url: string){
        let url_full = url;
        if(process.env.REACT_APP_ROUTE){
            url_full = process.env.REACT_APP_ROUTE + url_full;
        }
        const res = await fetch(url_full);
        if(res.status !== 200) {
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

    async postMetaAnalysis(records: AirtableRecord[], aggregation_variable: string, meta_analysis_technique: string = 'fixed', meta_analysis_transformation: string = 'double_arcsin_precise'){
        const formatted_records = records!.map((item: AirtableRecord)=>{ 
            // Note, all aggregation variable fields must be string arrays
            const record = { 
                SERUM_POS_PREVALENCE: item.seroprevalence,
                DENOMINATOR: item.denominator,
                country: [item.country],
                state: item.state,
                city: item.city,
                population_group: item.population_group ? item.population_group : [],
                sex: item.sex ? [item.sex] : [],
                age: item.age ? item.age : [],
                study_status: item.study_status ? [item.study_status] : [],
                source_type: item.source_type ? [item.source_type] : [],
                specimen_type: item.specimen_type ? [item.specimen_type] : [],
                isotypes_reported: item.isotypes_reported ? item.isotypes_reported : [],
                test_type: item.test_type ? item.test_type : [],
                risk_of_bias: item.risk_of_bias ? [item.risk_of_bias] : []
            };

            return record; 
        });

        const req_body = {
            records: formatted_records,
            aggregation_variable,
            meta_analysis_technique,
            meta_analysis_transformation
        }

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
}