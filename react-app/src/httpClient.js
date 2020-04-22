import { AppContext } from "./context";
import { useContext } from "react";

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
        return healthcheck
    }
}