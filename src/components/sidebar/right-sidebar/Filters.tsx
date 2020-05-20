import React, { useContext } from "react";
import { AppContext } from "../../../context";
import { Dropdown } from 'semantic-ui-react'
import {FilterType} from '../../../types';
import InformationIcon from "../../shared/InformationIcon";

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

  const buildFilterDropdown = (filter_type: FilterType, placeholder: string, tooltip_text?: string) => {
    return(
      <div className="pb-3">
        <div className="pb-2 flex">
          {placeholder}
          {tooltip_text && (
            <div className="tooltip-vert-adj">
              <InformationIcon
                  offset={10}
                  position="bottom right"
                  color="#455a64"
                  tooltipHeader={placeholder}
                  popupSize="small"
                  size="sm"
                  tooltip={tooltip_text}/>
            </div>
          )}
        </div>
        <Dropdown 
          placeholder={placeholder}
          fluid
          multiple
          search 
          selection 
          options={formatOptions(state.filter_options[filter_type])}
          onChange={(e: any, data: any) => {addFilter(data, filter_type)}} 
          defaultValue={Array.from(state.filters[filter_type])}
        />
      </div>
    )
  }

  return (
    <div className="col-12 p-0">
      <div className="py-3 center flex">
        <div className="section-title">
          FILTER
        </div>
        <div className="tooltip-vert-adj">
          <InformationIcon
              offset={10}
              position="bottom right"
              color="#455a64"
              tooltipHeader={"Filters"}
              popupSize="small"
              size="sm"
              tooltip={'Some content.'}/>
        </div>
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
            {buildFilterDropdown('population_group', 'Population Group')}
          </div> 
          <div>
            {buildFilterDropdown('sex', 'Sex')}
          </div> 
          <div>
            {buildFilterDropdown('age', 'Age')}
          </div> 
          <div>
            {buildFilterDropdown('risk_of_bias', 'Overall Risk of Bias (JBI)', 'Some content')}
          </div> 
        </div>
      </div>
    </div>
  )
}