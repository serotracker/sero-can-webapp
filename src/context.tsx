import React, { createContext, Dispatch, useReducer } from "react";
import { AirtableRecord, Filters, State } from "./types";

export const AppContext = createContext({} as [State, Dispatch<Record<string, any>>]);

// Note: filters = elements that user has chosen to filter by
// filter_options = all the elements that users could filter by
const initialState: State = {
  healthcheck: '',
  airtable_records: [],
  filtered_records: [],
  filters: {
    source_type: new Set(),
    study_status: new Set(),
    test_type: new Set(),
    population_group: new Set(),
    sex: new Set(),
    age: new Set(),
    country: new Set()
  },
  filter_options: {
    source_type: new Set(),
    study_status: new Set(),
    test_type: new Set(),
    population_group: new Set(),
    sex: new Set(),
    age: new Set(),
    country: new Set()
  },
  data_page_state: {
    mapOpen: true
  },
  updated_at: ''
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

export function filterRecords(filters: Filters, records: AirtableRecord[]) {
  const filter_function = buildFilterFunction(filters);
  if (records) {
    const filtered_records = records.filter(filter_function);
    return filtered_records;
  }
  return [];

}

function getFilterOptions(records: AirtableRecord[]) {
  const filter_options: Filters = {
    source_type: new Set(),
    study_status: new Set(),
    test_type: new Set(),
    population_group: new Set(),
    sex: new Set(),
    age: new Set(),
    country: new Set()
  };

  if (!records) {
    return filter_options;
  }
  records.forEach((record: AirtableRecord) => {
    if ((record.seroprevalence !== null) && (record.denominator !== null)) {
      if (record.country) {
        filter_options.country.add(record.country);
      }
      if (record.study_status) {
        filter_options.study_status.add(record.study_status);
      }
      if(record.source_type) {
        filter_options.source_type.add(record.source_type);
      }
      if(record.sex) {
        filter_options.sex.add(record.sex);
      }
      if(record.test_type) {
        record.test_type.forEach((test_type) => {
          filter_options.test_type.add(test_type);
        })
      }
      if(record.population_group){
        record.population_group.forEach((population_group) => {
          filter_options.population_group.add(population_group);
        });
      }
      if(record.age){
        record.age.forEach((age) => {
          filter_options.age.add(age);
        });
      }
    }
  });

  return filter_options;
}

const reducer = (state: State, action: Record<string, any>) => {
  const new_filters: any = state.filters;
  switch (action.type) {
    case "HEALTHCHECK":
      return {
        ...state,
        healthcheck: action.payload
      };
    case "SELECT_DATA_TAB":
      return {
        ...state,
        data_page_state: { ...state.data_page_state, mapOpen: action.payload }
      }
    case "GET_AIRTABLE_RECORDS":
      return {
        ...state,
        airtable_records: action.payload.airtable_records,
        filtered_records: filterRecords(state.filters, action.payload.airtable_records),
        updated_at: action.payload.updated_at,
        filter_options: getFilterOptions(action.payload.airtable_records)
      }
    case "UPDATE_FILTER":
      new_filters[action.payload.filter_type] = new Set(action.payload.filter_value)
      return {
        ...state,
        filters: new_filters,
        filtered_records: filterRecords(new_filters, state.airtable_records)
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