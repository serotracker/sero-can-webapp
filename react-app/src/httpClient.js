export default class httpClient {
    async httpGet(url){
        const res = await fetch(url);
        if(res.status != 200) {
            console.error(res.status);
            return;
        }
        else {
            const response_json = await res.json()
            return response_json
        }
    }

    async getHealthcheck() {
        const healthcheck = await this.httpGet('http://localhost:5000/healthcheck');
        return healthcheck;
    }

    async getAirtableRecords() {
        const response = await this.httpGet('http://localhost:5000/airtable_scraper/records');
        const airtable_records = response.map((item)=>{ 
            const field_name_map = {
                "Source Type": "source_type",
                "Study Status": "study_status",
                "Test type": "test_type",
                "Country": "countries",
                "Population of Interest": "populations",
                "Numerator value / expected value": "numerator",
                "Denominator value / expected value": "denominator",
                "Serum + prevalence": "seroprevalence",
                "URL": "url" 
            }

            // Convert response to AirtableRecord type
            const record = { name: item.fields.Name }
            for (const field in field_name_map) {
                if (field in item.fields) {
                    record[field_name_map[field]] = item.fields[field]
                }
            }
            return record; 
        }) 
        return airtable_records;
    }
}