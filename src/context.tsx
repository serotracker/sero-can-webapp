import React, { useReducer, createContext, Dispatch } from "react";
import { AirtableRecord, Filters, State } from "./types"

export const AppContext = createContext({} as [State, Dispatch<Record<string, any>>]);

const initialState: State = {
  healthcheck: '',
  airtable_records: [],
  filtered_records: [],
  filters: {
    source_type: new Set(),
    study_status: new Set(),
    test_type: new Set(),
    populations: new Set(),
    country: new Set()
  }
};

function buildFilterFunction(filters: Record<string, any>) {
  // Returns a function that can be used to filter an array of airtable records
  return (record: Record<string, any>) => {
    for (const filter_key in filters) {
      if ((filters[filter_key] instanceof Set) && (filters[filter_key].size > 0)) {
        if (record[filter_key] === null) {
          return false;
        }
        // Handle case where field to be filtered is an array
        if (Array.isArray(record[filter_key])) {
          let in_filter = false;
          // Iterate through the record's values and check if any of them
          // match the values accepted by the filter
          for (let i = 0; i < record[filter_key].length; i++) {
            if (filters[filter_key].has(record[filter_key][i])) {
              in_filter = true;
              break;
            }
          }
          if (!in_filter) {
            return false;
          }
        }
        else {
          if (!(filters[filter_key].has(record[filter_key]))) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

function filterRecords(filters: Filters, records: AirtableRecord[]) {
  const filter_function = buildFilterFunction(filters);
  const filtered_records = records.filter(filter_function);
  return filtered_records;
}

const reducer = (state: State, action: Record<string, any>) => {
  switch (action.type) {
    case "HEALTHCHECK":
      return {
        ...state,
        healthcheck: action.payload
      };
    case "GET_AIRTABLE_RECORDS":
      return {
        ...state,
        airtable_records: action.payload,
        filtered_records: filterRecords(state.filters, action.payload),
      }
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: action.payload,
        filtered_records: filterRecords(action.payload, state.airtable_records)
      }
    default:
      return state
  }
};

export const AppContextProvider = (props: Record<string, any>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};