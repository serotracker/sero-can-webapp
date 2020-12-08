import _ from 'lodash';
import httpClient from '../httpClient'
import { AggregationFactor, Filters, FilterType } from '../types'

export const updateFilters = async (
  dispatch: any,
  filters: Filters,
  filterType: FilterType,
  filterValue: any[],
  exploreIsOpen: Boolean,
  page: string) => {
    
  dispatch({
    type: 'UPDATE_FILTER',
    payload: {
      filterType,
      filterValue,
      pageStateEnum: page
    }
  });

  const updatedFilters: Filters = Object.assign({}, filters);
  updatedFilters[filterType] = new Set(filterValue);

  const api = new httpClient()
  // Update current records when called
  const records = await api.getAirtableRecords(updatedFilters, exploreIsOpen)
  dispatch({
    type: 'GET_AIRTABLE_RECORDS',
    payload: { pageStateEnum: page, records }
  });
  const estimateGradePrevalences = await api.getEstimateGrades(updatedFilters);
  dispatch({
    type: 'UPDATE_ESTIMATE_PREVALENCES',
    payload: {pageStateEnum: page, estimateGradePrevalences}
  });
}

export const initializeData = async (dispatch: any, filters: Filters, exploreIsOpen: Boolean, page: string) => {

  const api = new httpClient()
  const records = await api.getAirtableRecords(filters, exploreIsOpen)
  dispatch({
    type: 'GET_AIRTABLE_RECORDS',
    payload: { pageStateEnum: page, records }
  });
  const estimateGradePrevalences = await api.getEstimateGrades(filters);
  dispatch({
    type: 'UPDATE_ESTIMATE_PREVALENCES',
    payload: {pageStateEnum: page, estimateGradePrevalences}
  });

  const reAggregatedRecords = await api.postMetaAnalysis(filters, AggregationFactor.country);
  const metaAnalyzedRecords = _.sortBy(reAggregatedRecords, 'seroprevalence').reverse();
  dispatch({
    type: "UPDATE_META_ANALYSIS",
    payload: {
      pageStateEnum: page, 
      metaAnalyzedRecords
    }
  })
}