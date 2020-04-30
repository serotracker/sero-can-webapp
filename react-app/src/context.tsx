import React, { useReducer, createContext, Dispatch } from "react";
import { AirtableRecord, Filters, State } from "./types"

export const AppContext = createContext({} as [State, Dispatch<Record<string, any>>]);

const initialState: State = {
    healthcheck: '',
    airtable_records: [{
      name: "test 1",
      countries: "United Kingdom",
      numerator: 878,
      denominator: 10000,
      seroprevalence: 8.78,
      test_type: null,
      populations: null,
      study_status: null,
      url: null
    },
    {
      name: "test 2",
      countries: "Canada",
      numerator: 678,
      denominator: 10000,
      seroprevalence: 6.78,
      test_type: null,
      populations: null,
      study_status: null,
      url: null
    },
    {
      name: "test 3",
      countries: "United States",
      numerator: 678,
      denominator: 10000,
      seroprevalence: 3.78,
      test_type: null,
      populations: null,
      study_status: null,
      url: null
    }],
    filtered_records: [],
    filters: {
      source_type: null,
      study_status: null,
      test_type: null,
      populations: new Set(),
      countries: new Set()
    }
};

function buildFilterFunction(filters: Record<string, any>) {
  // Returns a function that can be used to filter an array of airtable records
  return (record: Record<string, any>) => {
    for (const filter_key in filters) {
      // Handle filters that accept multiple values
      if (filters[filter_key] instanceof Set) {
        if(filters[filter_key].size > 0){
          if (record[filter_key] === null) {
            return false;
          }
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
      }
      // Handle filters that accept a single value
      else if (filters[filter_key] !== null) {
        if ((record[filter_key] === null) || (record[filter_key] !== filters[filter_key])) {
          return false;
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