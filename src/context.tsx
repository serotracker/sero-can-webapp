import React, { createContext, Dispatch, useReducer } from "react";
import {
  AggregationFactor,
  Filters,
  FilterType,
  LanguageType,
  PageState,
  State,
} from "./types";

export const AppContext = createContext(
  {} as [State, Dispatch<Record<string, any>>]
);

const minDate = new Date(2019, 1, 1, 1);
const maxDate = new Date();

export function getEmptyFilters(): Filters {
  return {
    source_type: new Set(),
    test_type: new Set(),
    country: new Set(),
    population_group: new Set(),
    sex: new Set(),
    age: new Set(),
    overall_risk_of_bias: new Set(),
    isotypes_reported: new Set(),
    specimen_type: new Set(),
    publish_date: new Set([minDate, maxDate]),
    estimate_grade: new Set(),
  };
}

// Note: filters = elements that user has chosen to filter by
// filter_options = all the elements that users could filter by
const initialState: State = {
  chartAggregationFactor: AggregationFactor.country,
  explore: {
    filters: getEmptyFilters(),
    records: [],
    estimateGradePrevalences: [],
    isLoading: false,
  },
  // TODO: replace this with an obj
  // representing the data page once
  // we put filters there
  allFilterOptions: getEmptyFilters(),
  dataPageState: {
    exploreIsOpen: true,
  },
  calendarStartDates: {
    // Important, the fact that we use an hour here tells us that we are using a default value
    minDate,
    maxDate,
  },
  language: LanguageType.english,
  updatedAt: "",
  showCookieBanner: false,
  countries: [],
  showEstimatePins: true,
  showCountryHover: true,
};

const reducer = (state: State, action: Record<string, any>): State => {
  switch (action.type) {
    case "SHOW_COUNTRY_HOVER":
      return {
        ...state,
        showCountryHover: true,
      };
    case "HIDE_COUNTRY_HOVER":
      return {
        ...state,
        showCountryHover: false,
      };
    case "TOGGLE_ESTIMATE_PINS":
      return {
        ...state,
        showEstimatePins: !state.showEstimatePins,
      };
    case "CLOSE_COOKIE_BANNER":
      return {
        ...state,
        showCookieBanner: false,
      };
    case "OPEN_COOKIE_BANNER":
      return {
        ...state,
        showCookieBanner: true,
      };
    case "UPDATE_ESTIMATE_PREVALENCES": {
      const { pageStateEnum, estimateGradePrevalences } = action.payload;
      const newState = { ...state };
      const pageState = newState[pageStateEnum as keyof State] as PageState;
      pageState.estimateGradePrevalences = estimateGradePrevalences;
      return newState;
    }
    case "UPDATE_COUNTRIES_JSON":
      return {
        ...state,
        countries: action.payload,
      };
    case "SELECT_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    case "GET_ALL_FILTER_OPTIONS":
      return {
        ...state,
        allFilterOptions: action.payload,
      };
    case "GET_AIRTABLE_RECORDS": {
      const { pageStateEnum, records } = action.payload;
      const newState = { ...state };
      const pageState = newState[pageStateEnum as keyof State] as PageState;
      pageState.records = records;
      return newState;
    }
    case "UPDATED_AT":
      return {
        ...state,
        updatedAt: action.payload,
      };
    case "UPDATE_FILTER": {
      const { pageStateEnum, filterType, filterValue } = action.payload;
      const newState = { ...state };
      const pageState = newState[pageStateEnum as keyof State] as PageState;
      pageState.filters[filterType as FilterType] = new Set(filterValue);
      return newState;
    }

    case "MAX_MIN_DATES":
      const { minDate, maxDate } = action.payload;
      return {
        ...state,
        calendarStartDates: {
          minDate,
          maxDate,
        },
      };
    case "CHANGE_LOADING": {
      const { pageStateEnum, isLoading } = action.payload;
      const newState = { ...state };
      const pageState = newState[pageStateEnum as keyof State] as PageState;
      pageState.isLoading = isLoading;
      return newState;
    }
    case "UPDATE_AGGREGATION_FACTOR":
      return { ...state, chartAggregationFactor: action.payload };
    case "UPDATE_EXPLORE_IS_OPEN":
      return {
        ...state,
        dataPageState: {
          ...state.dataPageState,
          exploreIsOpen: action.payload,
        },
      };
    default:
      return state;
  }
};

export const AppContextProvider = (props: Record<string, any>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
