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

    const updateFilters = () => {
        const filters = {
            "Source Type": "Media Report & News Release",
            "Study Status": null,
            "Test type": null,
            "Population of Interest": new Set(),
            Country: new Set(['United States'])
        }
        dispatch({
            type: 'UPDATE_FILTERS',
            payload: filters
        })
    }

    return (
        <div>
            <button onClick={healthcheck}>Healthcheck</button>
            <div>{state.healthcheck}</div>
            <button onClick={getAirtableRecords}>Get Airtable Records</button>
            <button onClick={updateFilters}>Update Filters</button>
            {state.filtered_records.map((record) => {
                return <div>{record.Name}</div>
            })}
            <br></br>
            <div>Airtable records length: {state.airtable_records.length}</div>
            <div>Filtered records length: {state.filtered_records.length}</div>
            <div>Filters: {JSON.stringify(state.filters)}</div>
        </div>
    );
}