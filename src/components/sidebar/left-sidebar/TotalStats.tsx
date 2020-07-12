import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import InformationIcon from "../../shared/InformationIcon";
import { MIN_DENOMINATOR } from "../../../metaAnalysis"
import './TotalStats.css';
import Translate from "../../../utils/translate/translateService";
import httpClient from "../../../httpClient";


export default function TotalStats() {
  const [state] = useContext(AppContext);
  const [countries, setNumCountries] = useState(0);
  const [seroprevalence, setSeroprevalence] = useState<any>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if(state.filtered_records.length > 0){
      const updateCountryPrevalence = async () => {
        const api = new httpClient();
        const results = await api.postMetaAnalysisAll(state.filtered_records);
        setNumCountries(results.countries);
        setSeroprevalence(results.seroprevalence);
        setN(results.n);
      } 
      updateCountryPrevalence();
    }
  }, [state.filtered_records])

  //TODO: Extract to utils
  const countriesOrCountry = () => {
    return Translate(countries > 1 && countries !== 0 ? "Countries" : "Country")
  }

  return (
    <div className="col-12 p-0 stats-container">
      <div className="col-12 py-3 section-title center">{Translate('SummaryStatistics').toUpperCase()}</div>
      <div className="col-12 p-0 flex">
        <div className="main-statistic-title col-12 p-0 center-item flex">
          {Translate('Seroprevalence')}
          <InformationIcon
            color="#468ac1"
            offset={-12}
            tooltip={
              <div>
                <p>
                  {Translate("SeroprevalenceTooltip", ['FirstParagraph'])}
                </p>
                <p>
                  {Translate("SeroprevalenceTooltip", ['SecondParagraph'])}
                </p>
                <p>
                  {Translate("SeroprevalenceTooltip", ['ThirdParagraph'], { "MIN_DENOMINATOR": MIN_DENOMINATOR })}
                </p>
              </div>
            }
            size="xs"
            tooltipHeader={Translate("AggregatedPrevalence")} /></div>
        <div className="main-statistic col-12 p-0 center">{seroprevalence ? `${seroprevalence!.toFixed(2)}%` : Translate("NoData")}</div>
      </div>
      <div className="col-12 flex middle py-2">
        <div className="secondary-statistic-title center p-0 col-12">{Translate("TestsAdministered")}</div>
        <div className="secondary-statistic col-12 p-0 center">{n}</div>
      </div>
      <div className="col-12 flex middle py-2">
        <div className="secondary-statistic px-1 center">{countries}</div>
        <div className="secondary-statistic-title px-1 center">{countriesOrCountry()}</div>
      </div>
    </div>
  )
}
