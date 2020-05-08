import React, { useContext } from "react";
import { AppContext } from "../context";
import httpClient from "../httpClient"
import { getAggregateData } from '../metaAnalysis'

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

    const updateFilters = () => {
        const filters = {
            source_type: new Set(['Media Report & News Release', 'Preprint']),
            study_status: new Set(),
            test_type: new Set(),
            populations: new Set(['General population']),
            country: new Set(['United States', 'France'])
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
                return <div>{record.article_name}, {record.country}, {record.source_type}, {record.populations ? record.populations.toString() : ''}</div>
            })}
            <br></br>
            <div>Airtable records length: {state.airtable_records.length}</div>
            <div>Filtered records length: {state.filtered_records.length}</div>
            <div>Filters: {JSON.stringify(state.filters)}</div>
            <br></br>
            <div>Data aggregated by country</div>
            <div>{JSON.stringify(getAggregateData(state.filtered_records, "country"))}</div>
        </div>
    );
}