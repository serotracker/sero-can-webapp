import React, { createContext, Dispatch, useReducer } from "react";
import { AirtableRecord, Filters, FilterType, LanguageType, State } from "./types";
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
    risk_of_bias: new Set(),
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
    risk_of_bias: new Set(),
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
  airtable_records: [],
  filtered_records: [],
  estimate_grade_prevalences: [],
  filters: initial_filters,
  filter_options: getEmptyFilters(),
  all_filter_options: getEmptyFilters(),
  data_page_state: {
    mapOpen: true
  },
  language: LanguageType.english,
  updated_at: '',
  country_prevalences: [],
  showCookieBanner: false
};

export function filterRecords(filters: Filters, records: AirtableRecord[]) {
  const return_records: AirtableRecord[] = []
  if (records) {
    records.forEach((record: AirtableRecord) => {
      if(filter_function(record, filters)){
        return_records.push(record);
      }
    })
  }
  return return_records;
}

function filter_function(record: Record<string, any>, filters: Filters){
  const array = Object.keys(filters).map((filter_key) => {  
    if ((filters[filter_key as FilterType] instanceof Set) && (filters[filter_key as FilterType].size > 0)) {
      if (record[filter_key] === null) {
        return false;
      }
      // Handle case where field to be filtered is an array
      if (Array.isArray(record[filter_key])) {
        // Note: isotypes filter works on an 'and' basis
        // Unlike other filters, which work on an 'or' basis
        // TODO: make logic flow here more generalized in case we need other filters in the future with similar behaviour
        if (filter_key === 'isotypes_reported') {
          let match = true;
          filters[filter_key].forEach((item: string) => {
            if (!(record[filter_key].includes(item))) {
              match = false;
            }
          });
          return match;
        }

        if (filter_key === 'publish_date') {
          const publishDate = record[filter_key];
          const dateInMillis = publishDate instanceof Array ? Date.parse(publishDate[0] as string) : Date.parse(publishDate as string)
          const dates: number[] = Array.from(filters[filter_key].values())
          return dateInMillis >= dates[0] && dateInMillis <= dates[1]
        }
        // Iterate through the record's values and check if any of them
        // match the values accepted by the filter
        let in_filter = false;
        for (let i = 0; i < record[filter_key].length; i++) {
          if (filters[filter_key as FilterType].has(record[filter_key][i])) {
            in_filter = true;
            break;
          }
        }
        if (!in_filter) {
          return false;
        }
      }
      else {
        if (!(filters[filter_key as FilterType].has(record[filter_key]))) {
          return false;
        }
      }
    }
  }) 
  return !array.some(o => o === false);
}

// export function filterRecords(filters: Filters, records: AirtableRecord[]) {
//   const filter_function = buildFilterFunction(filters);
//   if (records) {
//     const filtered_records = records.filter(filter_function);
//     return filtered_records
//   }
//   return [];
// }

function recomputeFilterOptions(records: AirtableRecord[], all_filter_options: Filters, filters: Filters) {
  const options = getFilterOptions(records);
  for (const filter in filters) {
    // If the filter is already in use, show all filter options
    // Since options within the same filter work on an "or basis"
    // (e.g. risk_of_bias: ["Low", "Medium"] means include records with Low or Medium bias)
    // the user will never get 0 records back if they choose more filter options for a filter
    // that they've already selected an option for
    if (filters[filter as FilterType].size > 0) {
      options[filter as FilterType] = all_filter_options[filter as FilterType];
    }
  }
  return options;
}

function getFilterOptions(records: AirtableRecord[]) {
  const filter_options: Filters = getEmptyFilters();

  if (!records) {
    return filter_options;
  }
  records.forEach((record: AirtableRecord) => {
    // TODO: Refactor to be more DRY
    if ((record.seroprevalence !== null) && (record.denominator !== null)) {
      if (record.country) {
        filter_options.country.add(record.country);
      }
      if (record.study_status) {
        filter_options.study_status.add(record.study_status);
      }
      if (record.source_type) {
        filter_options.source_type.add(record.source_type);
      }
      if (record.sex) {
        filter_options.sex.add(record.sex);
      }
      if (record.risk_of_bias) {
        filter_options.risk_of_bias.add(record.risk_of_bias);
      }
      if (record.estimate_grade) {
        filter_options.estimate_grade.add(record.estimate_grade);
      }
      if (record.test_type) {
        record.test_type.forEach((test_type) => {
          filter_options.test_type.add(test_type);
        })
      }
      if (record.population_group) {
        record.population_group.forEach((population_group) => {
          filter_options.population_group.add(population_group);
        });
      }
      if (record.age) {
        record.age.forEach((age) => {
          filter_options.age.add(age);
        });
      }
      if (record.isotypes_reported) {
        record.isotypes_reported.forEach((isotype_reported) => {
          if (isotype_reported !== 'Not reported') {
            filter_options.isotypes_reported.add(isotype_reported);
          }
        });
      }
      if (record.specimen_type && record.specimen_type !== 'Not reported') {
        filter_options.specimen_type.add(record.specimen_type);
      }
    }
  });

  return filter_options;
}

const reducer = (state: State, action: Record<string, any>): State => {
  const new_filters: any = state.filters;
  let filtered_records: AirtableRecord[] = state.filtered_records;
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
    case "UPDATE_ESTIMATE_PREVALENCES":
      return {
        ...state,
        estimate_grade_prevalences: action.payload
      }
    case "SELECT_DATA_TAB":
      return {
        ...state,
        data_page_state: { ...state.data_page_state, mapOpen: action.payload }
      }
    case "SELECT_LANGUAGE":
      return {
        ...state,
        language: action.payload
      }
    case "GET_AIRTABLE_RECORDS":
      const all_filter_options = getFilterOptions(action.payload.airtable_records);
      filtered_records = filterRecords(new_filters, action.payload.airtable_records);
      const filter_options = getFilterOptions(filtered_records);
      return {
        ...state,
        airtable_records: action.payload.airtable_records,
        filtered_records,
        updated_at: action.payload.updated_at,
        filter_options,
        all_filter_options
      }
    case "UPDATE_FILTER":
      new_filters[action.payload.filter_type] = new Set(action.payload.filter_value);
      filtered_records = filterRecords(new_filters, state.airtable_records);
      return {
        ...state,
        filters: new_filters,
        filtered_records,
        filter_options: recomputeFilterOptions(filtered_records, state.all_filter_options, new_filters)
      }
    case "UPDATE_COUNTRY_PREVALENCES":
      return {
        ...state,
        country_prevalences: action.payload
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