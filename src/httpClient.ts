import { AirtableRecord } from "./types"

export default class httpClient {
    async httpGet(url: string){
        const res = await fetch(url);
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
        const healthcheck: string = await this.httpGet('http://localhost:5000/healthcheck');
        return healthcheck;
    }

    async getAirtableRecords() {
        const response = await this.httpGet('http://localhost:5000/airtable_scraper/records');
        const airtable_records = response.map((item: Record<string, any>)=>{ 
            // Convert response to AirtableRecord type
            const record: AirtableRecord = { 
                name: item.fields.Name,
                source_type: ("Source Type" in item.fields) ? item.fields["Source Type"] : null,
                study_status: ("Study Status" in item.fields) ? item.fields["Study Status"] : null,
                test_type: ("Test type" in item.fields) ? item.fields["Test type"] : null,
                countries: ("Country" in item.fields) ? item.fields["Country"] : null,
                populations: ("Population of Interest" in item.fields) ? item.fields["Population of Interest"] : null,
                numerator: ("Numerator value / expected value" in item.fields) ? item.fields["Numerator value / expected value"] : null,
                denominator: ("Denominator value / expected value" in item.fields) ? item.fields["Denominator value / expected value"] : null,
                seroprevalence: ("Serum + prevalence" in item.fields) ? item.fields["Serum + prevalence"] : null,
                url: ("URL" in item.fields) ? item.fields["URL"] : null
            };

            return record; 
        }) 
        return airtable_records;
    }
}