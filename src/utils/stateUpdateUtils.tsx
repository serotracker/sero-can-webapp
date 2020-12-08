import _ from 'lodash';
import httpClient from '../httpClient'
import { AggregationFactor, Filters, FilterType } from '../types'

export const updateFilters = async (
  dispatch: any,
  filters: Filters,
  filterType: FilterType,
  filterValue: any[],
  exploreIsOpen: Boolean,
  page: string,
  aggregationFactor: AggregationFactor) => {

  dispatch({
    type: "CHANGE_LOADING",
    payload: {
      pageStateEnum: page,
      isLoading: true
    }
  })

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
  const [records,
    estimateGradePrevalences, reAggregatedRecords] = await
      Promise.all([
        api.getAirtableRecords(filters, exploreIsOpen),
        api.getEstimateGrades(filters),
        page === "analyze" ? api.postMetaAnalysis(filters, aggregationFactor) : Promise.resolve()
      ]);
  const metaAnalyzedRecords = _.sortBy(reAggregatedRecords, 'seroprevalence').reverse();
  dispatch({
    type: 'GET_AIRTABLE_RECORDS',
    payload: { pageStateEnum: page, records }
  });
  dispatch({
    type: 'UPDATE_ESTIMATE_PREVALENCES',
    payload: { pageStateEnum: page, estimateGradePrevalences }
  });

  if (page === "analyze") {
    dispatch({
      type: "UPDATE_META_ANALYSIS",
      payload: {
        pageStateEnum: page,
        metaAnalyzedRecords
      }
    })
  }

  dispatch({
    type: "CHANGE_LOADING",
    payload: {
      pageStateEnum: page,
      isLoading: false
    }
  })
}

export const initializeData = async (dispatch: any, filters: Filters, exploreIsOpen: Boolean, page: string) => {

  const api = new httpClient()

  dispatch({
    type: "CHANGE_LOADING",
    payload: {
      pageStateEnum: page,
      isLoading: true
    }
  })
  // const records = await api.getAirtableRecords(filters, exploreIsOpen)
  // const reAggregatedRecords = await api.postMetaAnalysis(filters, AggregationFactor.country);
  // const estimateGradePrevalences = await api.getEstimateGrades(filters);

  const [records,
    reAggregatedRecords,
    estimateGradePrevalences] = await Promise
      .all([api.getAirtableRecords(filters, exploreIsOpen),
      api.postMetaAnalysis(filters, AggregationFactor.country),
      api.getEstimateGrades(filters)]);


  const metaAnalyzedRecords = _.sortBy(reAggregatedRecords, 'seroprevalence').reverse();
  dispatch({
    type: 'GET_AIRTABLE_RECORDS',
    payload: { pageStateEnum: page, records }
  });
  dispatch({
    type: 'UPDATE_ESTIMATE_PREVALENCES',
    payload: { pageStateEnum: page, estimateGradePrevalences }
  });

  dispatch({
    type: "UPDATE_META_ANALYSIS",
    payload: {
      pageStateEnum: page,
      metaAnalyzedRecords
    }
  })

  dispatch({
    type: "CHANGE_LOADING",
    payload: {
      pageStateEnum: page,
      isLoading: false
    }
  })
}