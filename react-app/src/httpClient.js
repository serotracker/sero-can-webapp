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
            return item.fields; 
        }) 
        return airtable_records;
    }
}