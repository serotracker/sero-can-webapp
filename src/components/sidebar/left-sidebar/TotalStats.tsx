import React, { useContext } from "react";
import { AppContext } from "../../../context";
import { aggregateRecords } from "../../../metaAnalysis";
import InformationIcon from "../../shared/InformationIcon";
import './TotalStats.css';


export default function TotalStats() {
  const [state] = useContext(AppContext);

  const { seroprevalence, n } = aggregateRecords(state.filtered_records);
  function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index && value !== null;
  }
  const countryDict = state.filtered_records
    .map(o => {
      if (o.seroprevalence !== null && o.denominator !== null) {
        return o.country
      }
      return null;
    })
    .filter(onlyUnique);
  const countries = countryDict.length;

  const countriesOrCountry = () => {
    return countries > 1 && countries !== 0 ? "Countries" : "Country"
  }

  return (
    <div className="col-12 p-0">
      <div className="col-12 py-3 section-title center">SUMMARY STATISTICS</div>
      <div className="col-12 p-0 flex">
        <div className="main-statistic-title col-12 p-0 center-item flex">Seroprevalence
          <InformationIcon
            color="#468ac1"
            offset={-12}
            tooltip="Total number of positive individuals who test positive for antibodies against SARS-CoV-2 (the virus that causes COVID-19) divided by total tests administered, using filtered data"
            size="xs"
            tooltipHeader="Aggregated Prevalence" /></div>
        <div className="main-statistic col-12 p-0 center">{seroprevalence ? `${seroprevalence.toFixed(2)}%` : "No Data"}</div>
      </div>
      <div className="col-12 flex middle py-2">
        <div className="secondary-statistic-title center p-0 col-12">Tests Administered</div>
        <div className="secondary-statistic col-12 p-0 center">{n}</div>
      </div>
      <div className="col-12 flex middle py-2">
        <div className="secondary-statistic px-1 center">{countries}</div>
        <div className="secondary-statistic-title px-1 center">{countriesOrCountry()}</div>
      </div>
    </div>
  )
}