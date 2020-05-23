import _ from "lodash";
import React, { useContext } from "react";
import { AppContext } from "../../../context";
import { getAggregateData } from "../../../metaAnalysis";
import { AggregationFactor } from "../../../types";
import './CountryList.css';

export default function CountryList() {
  const [state] = useContext(AppContext);

  const aggregatedData = _.sortBy(getAggregateData(state.filtered_records, AggregationFactor.country), ['seroprevalence']).reverse();

  return (
    <div className="col-12 px-0 country-list-container">
      <div className="section-title py-2 center">
        SEROPREVALENCE BY COUNTRY
      </div>
      <div className="item-list-container">
        {aggregatedData.map(o => {
          return (
            <div className="col-12 p-0 flex item-container" key={Math.random()}>
              <div className="p-2 country-name">
                {o.name}
              </div>
              <div className="p-2 country-stat">
                {(o.seroprevalence as Number).toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}