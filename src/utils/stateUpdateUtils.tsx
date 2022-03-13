import httpClient from '../httpClient'
import { FiltersConfig, FilterType } from '../types'
import { sendFiltersAnalyticsEvent } from "../utils/analyticsUtils";
import { getEmptyFilters} from "../context";

export const updateFilters = async (
  dispatch: any,
  filters: FiltersConfig,
  filterType: FilterType,
  filterValue: any,
  page: string) => {
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

  fetchExploreData(dispatch, updatedFilters, page);
}

export const clearFilters = async (
  dispatch: any,
  page: string) => {
  dispatch({
    type: 'CLEAR_ALL_FILTERS',
    payload: {
      pageStateEnum: page
    }
  });

  fetchExploreData(dispatch, getEmptyFilters(), page);
}

export const fetchExploreData = async (dispatch: any, filters: FiltersConfig, page: string) => {

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