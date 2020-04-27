import React, { useReducer, createContext } from "react";

export const AppContext = createContext();

const initialState = {
    healthcheck: '',
    airtable_records: [],
    filtered_records: [],
    filters: {
      "Source Type": null,
      "Study Status": null,
      "Test type": null,
      "Population of Interest": new Set(),
      Country: new Set()
    }
};

function buildFilterFunction(filters) {
  return (record) => {
    for (const filter_key in filters) {
      if (filters[filter_key] instanceof Set) {
        if((filters[filter_key].size > 0)){
          if (!(filter_key in record)) {
            return false
          }
          let in_filter = false;
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
      else if (filters[filter_key] != null) {
        if (!(filter_key in record) || (record[filter_key] != filters[filter_key])) {
          return false;
        }
      }
    }
    return true;
  }
}

function filterRecords(filters, records) {
  const filter_function = buildFilterFunction(filters);
  const filtered_records = records.filter(filter_function);
  return filtered_records;
}

const reducer = (state, action) => {
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
        filtered_records: filterRecords(state.filters, action.payload)
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

export const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};