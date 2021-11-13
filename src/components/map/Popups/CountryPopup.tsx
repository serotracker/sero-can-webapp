import React from "react";
import { RegionalPrevalenceEstimate } from "types";
import { LanguageType } from "types";
import { Button } from 'semantic-ui-react'
import Translate, { getCountryName } from 'utils/translate/translateService';

function row(title: string, content: JSX.Element | string | string[] | null | undefined) {
    return (
        <div className={"d-flex justify-content-between mb-2"}>
            <div className={"country-popup-heading"}>
                {title}
            </div>
            <div className={"country-popup-text"}>
                {content}
            </div>
        </div>
    )
}

const createPopupGeographySection = (regionalEstimate: RegionalPrevalenceEstimate, title: string) => {
  const minString = `${(regionalEstimate.minEstimate * 100).toFixed(2)}%`
  const maxString = `${(regionalEstimate.maxEstimate * 100).toFixed(2)}%`
  const regionString = minString === maxString ? minString : `${minString} - ${maxString}`;

  return (
    <div key={Math.random()} className={"flex column mt-2"}>
        <div key={Math.random()} className="country-popup-heading pt-1">
            {title}
        </div>
        {row(Translate('EstimateRange'), (<b>{regionString}</b>))}
        {row(Translate('NumberEstimates'), (<b>{regionalEstimate.numEstimates}</b>))}
    </div>
  )
}

const CountryPopup = (country : any, language : LanguageType, onDetailsClick?: any) => {

  const properties = country?.state

  if (properties.testsAdministered) {
    const regions: Array<any> = []
    let addRegion = (r: RegionalPrevalenceEstimate, name: string) => { 
      return (r !== undefined && r.numEstimates !== 0 ? regions.push({Region: r, Name: name}) : null) 
    }
    addRegion(properties.nationalEstimate, Translate('NationalEstimates'));
    addRegion(properties.regionalEstimate, Translate('RegionalEstimates'));
    addRegion(properties.localEstimate, Translate('LocalEstimates'));
    addRegion(properties.sublocalEstimate, Translate('SublocalEstimates'));

    return (
      <div className="col-12 p-0 flex column country-popup-content" >
        <div className="country-popup-title">
            {getCountryName(properties.geographicalName, language, "CountryOptions")}
        </div>
        {row(Translate("TestsAdministered"), <b>{properties?.testsAdministered}</b>)}
        {row(Translate('NumSeroprevalenceEstimates'), <b>{properties?.numberOfStudies}</b>)}
        {regions.map((o) => createPopupGeographySection(o.Region, o.Name))}
        {onDetailsClick ? 
            <Button className="not-found-button mt-2" onClick={()=>{ onDetailsClick()}}>
              {Translate("ViewPartnership")}
            </Button> : ""
        }
      </div>)
  }

  return (
    <div className="col-12 p-0 flex">
      <div className="country-popup-title">{getCountryName(properties.geographicalName, language, "CountryOptions")}</div>
      <div className="col-12 p-0 flex country-popup-text">{Translate('NoData')}</div>
    </div>)
}

export default CountryPopup;