import React, { useContext } from "react";
import { AppContext } from "../../../context";
import { Dropdown } from 'semantic-ui-react'
import {FilterType} from '../../../types';

export default function Filters() {
  const [state, dispatch] = useContext(AppContext);

  const formatOptions = (options: any) => {
    const formatted_options: Record<string, string>[] = [];
    options.forEach((o: string) => {
      formatted_options.push({
        key: o,
        text: o,
        value: o
      })
    });
    return formatted_options;
  }

  const addFilter = (data: any, filter_type: string) => {
    dispatch({
      type: 'UPDATE_FILTER',
      payload: {
        filter_type,
        filter_value: data.value
      }
    });
  }

  const buildFilterDropdown = (filter_type: FilterType, placeholder: string) => {
    return(
      <div className="pb-3">
        <div className="pb-2">
          {placeholder}
        </div>
        <Dropdown 
          placeholder={placeholder}
          fluid
          multiple
          search 
          selection 
          options={formatOptions(state.filter_options[filter_type])}
          onChange={(e: any, data: any) => {addFilter(data, filter_type)}} 
        />
      </div>
    )
  }

  return (
    <div className="col-12 p-0">
      <div className="section-title py-3 center">
        FILTER
      </div>
      <div className="row justify-content-center">
        <div className="col-10 col align-items-center p-0">
          <div>
            {buildFilterDropdown('country', 'Country')}
          </div> 
          <div>
            {buildFilterDropdown('study_status', 'Study Status')}
          </div> 
          <div>
            {buildFilterDropdown('source_type', 'Source Type')}
          </div> 
          <div>
            {buildFilterDropdown('test_type', 'Test Type')}
          </div> 
          <div>
            {buildFilterDropdown('populations', 'Population')}
          </div> 
        </div>
      </div>
    </div>
  )
}