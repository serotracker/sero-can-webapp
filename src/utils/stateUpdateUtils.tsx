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
  
  const api = new httpClient();
  const { records, estimateGradePrevalences } = await api.getExploreData(filters, true);
 
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
  
  const { records, estimateGradePrevalences } = await api.getExploreData(filters, true);

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