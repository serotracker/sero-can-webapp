import React, { createContext, Dispatch, useReducer } from "react";
import { AggregationFactor, Filters, FilterType, LanguageType, PageState, State } from "./types";
import Translate from "./utils/translate/translateService";

export const AppContext = createContext({} as [State, Dispatch<Record<string, any>>]);

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
    publish_date: new Set([new Date(2019, 1, 1, 1), new Date()]),
    estimate_grade: new Set()
  }
}

export function getDefaultFilters(): Filters {
  return {
    source_type: new Set([
      Translate('SourceTypeOptions', ['Preprint']),
      Translate('SourceTypeOptions', ['Publication']),
      Translate('SourceTypeOptions', ['InstitutionalReport'])
    ]),
    test_type: new Set(),
    country: new Set(),
    population_group: new Set([
      Translate('PopulationGroupOptions', ['GeneralPopulation']),
      Translate('PopulationGroupOptions', ['BloodDonors']),
      Translate('PopulationGroupOptions', ['ResidualSera']),
    ]),
    sex: new Set(),
    age: new Set(),
    overall_risk_of_bias: new Set(),
    isotypes_reported: new Set(),
    specimen_type: new Set(),
    publish_date: new Set([new Date(2019, 1, 1, 1), new Date()]),
    estimate_grade: new Set([
      Translate('EstimateGradeOptions', ['National']),
      Translate('EstimateGradeOptions', ['Regional']),
    ])
  }
}

// Note: filters = elements that user has chosen to filter by
// filter_options = all the elements that users could filter by
const initialState: State = {
  healthcheck: '',
  chartAggregationFactor: AggregationFactor.country,
  explore: {
    filters: getEmptyFilters(),
    records: [],
    estimateGradePrevalences: [],
    metaAnalyzedRecords: [],
    isLoading: false
  },
  analyze: {
    filters: getDefaultFilters(),
    records: [],
    estimateGradePrevalences: [],
    metaAnalyzedRecords: [],
    isLoading: false
  },
  allFilterOptions: getEmptyFilters(),
  dataPageState: {
    exploreIsOpen: true,
    showStudiesModal: false,
    routingOccurred: false
  },
  calendarStartDates: {
    // Important, the fact that we use an hour here tells us that we are using a default value
    minDate: new Date(2019, 1, 1, 1),
    maxDate: new Date()
  },
  language: LanguageType.english,
  updatedAt: '',
  showCookieBanner: false,
  showAnalyzePopup: true,
  countries : []
};

const reducer = (state: State, action: Record<string, any>): State => {
  switch (action.type) {
    case "CLOSE_COOKIE_BANNER":
      return {
        ...state,
        showCookieBanner: false
      };
    case "OPEN_COOKIE_BANNER":
      return {
        ...state,
        showCookieBanner: true
      };
    case "OPEN_ANALYZE_POPUP":
      return {
        ...state,
        showAnalyzePopup: true
      };
    case "CLOSE_ANALYZE_POPUP":
      return {
        ...state,
        showAnalyzePopup: false
      };
    case "UPDATE_ESTIMATE_PREVALENCES": {
      const { pageStateEnum, estimateGradePrevalences } = action.payload;
      const newState = { ...state };
      const pageState = newState[pageStateEnum as keyof State] as PageState;
      pageState.estimateGradePrevalences = estimateGradePrevalences;
      return newState;
    };
    case "UPDATE_COUNTRIES_JSON":
      return {
        ...state,
        countries: action.payload
      };
    case "SELECT_LANGUAGE":
      return {
        ...state,
        language: action.payload
      };
    case "GET_ALL_FILTER_OPTIONS":
      return {
        ...state,
        allFilterOptions: action.payload
      };
    case "GET_AIRTABLE_RECORDS": {
      const { pageStateEnum, records } = action.payload;
      const newState = { ...state };
      const pageState = newState[pageStateEnum as keyof State] as PageState;
      pageState.records = records;
      return newState;
    };
    case "UPDATED_AT":
      return {
        ...state,
        updatedAt: action.payload
      };
    case "UPDATE_FILTER": {
      const { pageStateEnum, filterType, filterValue } = action.payload;
      const newState = { ...state };
      const pageState = newState[pageStateEnum as keyof State] as PageState;
      pageState.filters[filterType as FilterType] = new Set(filterValue);
      return newState;
    };
    case "UPDATE_META_ANALYSIS": {
      const { pageStateEnum, metaAnalyzedRecords } = action.payload;
      const newState = { ...state };
      const pageState = newState[pageStateEnum as keyof State] as PageState;
      pageState.metaAnalyzedRecords = metaAnalyzedRecords;
      return newState;
    };
    case "MAX_MIN_DATES":
      const { minDate, maxDate } = action.payload;
      return {
        ...state,
        calendarStartDates: {
          minDate,
          maxDate
        },
      };
    case "CHANGE_LOADING": {
      const { pageStateEnum, isLoading } = action.payload;
      const newState = { ...state };
      const pageState = newState[pageStateEnum as keyof State] as PageState;
      pageState.isLoading = isLoading;
      return newState;
    };
    case "UPDATE_AGGREGATION_FACTOR":
      return { ...state, chartAggregationFactor: action.payload }
    case "UPDATE_EXPLORE_IS_OPEN":
      return { ...state, dataPageState: { ...state.dataPageState, exploreIsOpen: action.payload } }
    default:
      return state
  };
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