import React, { createContext, Dispatch, useReducer } from "react";
import { Filters, LanguageType, State } from "./types";
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
  explore: {
    filters: getEmptyFilters(),
    records: [],
  },
  analyze: {
    filters: getDefaultFilters(),
    records: [],
  },
  estimate_grade_prevalences: [],
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
  showAnalyzePopup: true
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
    case "UPDATE_ESTIMATE_PREVALENCES":
      return {
        ...state,
        estimate_grade_prevalences: action.payload
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
    case "GET_AIRTABLE_RECORDS":
      return {
        ...state,
        records: action.payload
      };
    case "UPDATED_AT":
      return {
        ...state,
        updatedAt: action.payload
      };
    case "UPDATE_FILTER":
      const new_filters: any = Object.assign({}, state.filters);
      new_filters[action.payload.filter_type] = new Set(action.payload.filter_value);
      return {
        ...state,
        filters: new_filters
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