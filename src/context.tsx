import React, { createContext, Dispatch, useReducer } from "react";
import { Filters, LanguageType, State } from "./types";
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
  filters: getEmptyFilters(),
  records: [],
  estimate_grade_prevalences: [],
  allFilterOptions: getEmptyFilters(),
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
    case "SAVE_PAGE_STATE": {
      const isExplorePageState = action.payload;
      if (isExplorePageState) {
        return {
          ...state,
          explore: {
            filters: Object.assign({}, state.filters),
            records: Object.assign([], state.records)
          },
        }
      }
      return {
        ...state,
        analyze: {
          filters: Object.assign({}, state.filters),
          records: Object.assign([], state.records)
        },
      };
    };
    case "SET_PAGE_STATE": {
      const { isExplorePageState, records, filters } = action.payload;
      if (isExplorePageState) {
        return {
          ...state,
          explore: {
            filters: filters ? filters : state.explore.filters,
            records: records ? records : state.explore.records
          },
        }
      }
      return {
        ...state,
        analyze: {
          filters: filters ? filters : state.analyze.filters,
          records: records ? records : state.analyze.records
        },
      };
    }
    case "LOAD_PAGE_STATE": {
      const exploreIsOpen = action.payload;
      if (exploreIsOpen) {
        return {
          ...state,
          filters: Object.assign({}, state.explore.filters),
          records: Object.assign([], state.explore.records),
          dataPageState: { ...state.dataPageState, exploreIsOpen: action.payload, routingOccurred: true }
        };
      };
      return {
        ...state,
        filters: Object.assign({}, state.analyze.filters),
        records: Object.assign([], state.analyze.records),
        dataPageState: { ...state.dataPageState, exploreIsOpen: action.payload, routingOccurred: true }
      };
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
        records: action.payload,
        updatedAt: action.payload.updated_at,
      };
    case "UPDATE_FILTER":
      const new_filters: any = Object.assign({}, state.filters);
      new_filters[action.payload.filter_type] = new Set(action.payload.filter_value);
      return {
        ...state,
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