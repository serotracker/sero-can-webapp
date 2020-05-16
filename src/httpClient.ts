import { AirtableRecord } from "./types"

export default class httpClient {
    async httpGet(url: string){
        let url_full = url;
        if(process.env.REACT_APP_ROUTE){
            url_full = process.env.REACT_APP_ROUTE + url_full;
        }
        const res = await fetch(url_full);
        if(res.status !== 200) {
            console.error(res.status);
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
        if(!response) {
            return [];
        }
        const airtable_records = response.records!.map((item: Record<string, any>)=>{ 
            // Convert response to AirtableRecord type
            const record: AirtableRecord = { 
                article_name: item.ARTICLE_NAME![0],
                authors: item.AUTHORS ? item.AUTHORS[0]: null,
                institution: item.INSTITUTION ? item.INSTITUTION[0] : null,
                approving_regulator: item.APPROVING_REGULATOR ? item.APPROVING_REGULATOR[0]: null,
                source_type: item.SOURCE_TYPE ? item.SOURCE_TYPE[0]: null,
                study_status: item.STUDY_STATUS ? item.STUDY_STATUS[0]: null,
                test_type: item.TEST_TYPE ? item.TEST_TYPE[0]: null,
                isotopes_reported: item.ISOTOPED_REPORTED,
                country: item.COUNTRY ? item.COUNTRY[0] : null,
                populations: item.POPULATIONS_STUDIED,
                numerator: item.NUMERATOR_VALUE,
                denominator: item.DENOMINATOR_VALUE,
                seroprevalence: item.SERUM_POSITIVE_PREVALENCE,
                url: item.URL ? item.URL[0] : null
            };

            return record; 
        });

        return {
            airtable_records,
            updated_at: response.updated_at!
        };
    }
}