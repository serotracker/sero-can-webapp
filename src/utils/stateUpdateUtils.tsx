import httpClient from '../httpClient'
import { FiltersConfig, FilterType } from '../types'
import { sendFiltersAnalyticsEvent } from "../utils/analyticsUtils";

export const updateFilters = async (
  dispatch: any,
  filters: FiltersConfig,
  filterType: FilterType,
  filterValue: any,
  page: string) => {

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

  const updatedFilters: FiltersConfig = Object.assign({}, filters);
  updatedFilters[filterType] = filterValue;
  sendFiltersAnalyticsEvent(updatedFilters);

  const api = new httpClient()
  // Update current records when called
  const [records,
    estimateGradePrevalences] = await
      Promise.all([
        api.getAirtableRecords(updatedFilters, true),
        api.getEstimateGrades(updatedFilters)
      ]);
 
  dispatch({
    type: 'GET_AIRTABLE_RECORDS',
    payload: { pageStateEnum: page, records }
  });
  dispatch({
    type: 'UPDATE_ESTIMATE_PREVALENCES',
    payload: { pageStateEnum: page, estimateGradePrevalences }
  });

  dispatch({
    type: "CHANGE_LOADING",
    payload: {
      pageStateEnum: page,
      isLoading: false
    }
  })
}

export const initializeData = async (dispatch: any, filters: FiltersConfig, page: string) => {

  const api = new httpClient()

  dispatch({
    type: "CHANGE_LOADING",
    payload: {
      pageStateEnum: page,
      isLoading: true
    }
  })
  
  const [records,
    estimateGradePrevalences] = await Promise
      .all([api.getAirtableRecords(filters, true),
      api.getEstimateGrades(filters)]);

  dispatch({
    type: 'GET_AIRTABLE_RECORDS',
    payload: { pageStateEnum: page, records }
  });
  dispatch({
    type: 'UPDATE_ESTIMATE_PREVALENCES',
    payload: { pageStateEnum: page, estimateGradePrevalences }
  });

  dispatch({
    type: "CHANGE_LOADING",
    payload: {
      pageStateEnum: page,
      isLoading: false
    }
  })
}