import React, { useContext } from "react";
import { AppContext } from "../context";
import httpClient from "../httpClient"

export default function Component() {
    const [state, dispatch] = useContext(AppContext);

    const api = new httpClient()

    const healthcheck = async () => {
        const healthcheck = await api.getHealthcheck()
        dispatch({
            type: 'HEALTHCHECK',
            payload: healthcheck
        })
    }

    const getAirtableRecords = async () => {
        const airtable_records = await api.getAirtableRecords()
        dispatch({
            type: 'GET_AIRTABLE_RECORDS',
            payload: airtable_records
        })
    }

    return (
        <div>
            <button onClick={healthcheck}>Healthcheck</button>
            <div>{state.healthcheck}</div>
            <button onClick={getAirtableRecords}>Get Airtable Records</button>
            {state.airtable_records.map((record) => {
                return <div>{record.Name}</div>
            })}
        </div>
    );
}