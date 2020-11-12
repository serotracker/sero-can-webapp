import React, { createContext, Dispatch, useReducer } from "react";
import { AirtableRecord, Filters, LanguageType, State } from "./types";
import Translate from "./utils/translate/translateService";

export const AppContext = createContext({} as [State, Dispatch<Record<string, any>>]);

export function getEmptyFilters(): Filters {
  return {
    source_type: new Set(),
    study_status: new Set(),
    test_type: new Set(),
    country: new Set(),
    population_group: new Set(),
    sex: new Set(),
    age: new Set(),
    overall_risk_of_bias: new Set(),
    isotypes_reported: new Set(),
    specimen_type: new Set(),
    publish_date: new Set(),
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
    study_status: new Set(),
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
    publish_date: new Set(),
    estimate_grade: new Set([
      Translate('EstimateGradeOptions', ['National']),
      Translate('EstimateGradeOptions', ['Regional']),
    ])
  }
}

// Note: filters = elements that user has chosen to filter by
// filter_options = all the elements that users could filter by
const initial_filters: Filters = getDefaultFilters();

const initialState: State = {
  healthcheck: '',
  filteredRecords: [],
  estimate_grade_prevalences: [],
  exploreFilters: getEmptyFilters(),
  analyzeFilters: initial_filters,
  allFilterOptions: getEmptyFilters(),
  filters: getEmptyFilters(),
  dataPageState: {
    exploreIsOpen: true,
    showStudiesModal: false,
    routingOccurred: false
  },
  language: LanguageType.english,
  updatedAt: '',
  showCookieBanner: false,
  showAnalyzePopup: true
};


const reducer = (state: State, action: Record<string, any>): State => {
  switch (action.type) {
    case "HEALTHCHECK":
      return {
        ...state,
        healthcheck: action.payload
      };
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
    case "SELECT_EXPLORE_OR_ANALYZE":
      return {
        ...state,
        filters: action.payload ? Object.assign({}, state.exploreFilters) : Object.assign({}, state.analyzeFilters),
        dataPageState: { ...state.dataPageState, exploreIsOpen: action.payload, routingOccurred: true}
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
        filteredRecords: action.payload,
        updatedAt: action.payload.updated_at,
      };
    case "UPDATE_FILTER":      
      const new_filters: any = state.dataPageState.exploreIsOpen ? Object.assign({}, state.exploreFilters): Object.assign({}, state.analyzeFilters);
      new_filters[action.payload.filter_type] = new Set(action.payload.filter_value);
      return {
        ...state,
        exploreFilters: state.dataPageState.exploreIsOpen ? new_filters : state.exploreFilters,
        analyzeFilters: state.dataPageState.exploreIsOpen ? state.analyzeFilters : new_filters,
        filters: new_filters
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