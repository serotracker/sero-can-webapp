import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context";
import { RegionalPrevalenceEstimate } from "types";
import { LanguageType } from "types";
import Translate, { getCountryName } from 'utils/translate/translateService';

const createPopupGeographySection = (regionalEstimate: RegionalPrevalenceEstimate, title: string, isLastSection?: boolean) => {
  const minString = `${(regionalEstimate.minEstimate * 100).toFixed(2)}%`
  const maxString = `${(regionalEstimate.maxEstimate * 100).toFixed(2)}%`
  const regionString = minString === maxString ? minString : `${minString} - ${maxString}`;

  return (
    <div key={Math.random()} className={"flex fit column " + (!isLastSection ? 'popup-heading ' : '')}>
      <div key={Math.random()} className="popup-heading pt-1">{title}</div>
      <div key={Math.random()} className="col-12 p-0 popup-text">{Translate('EstimateRange')}: <b>{regionString}</b></div>
      <div key={Math.random()} className="col-12 p-0 popup-text">{Translate('NumberEstimates')}: <b>{regionalEstimate.numEstimates}</b></div>
    </div>
  )
}

interface CountryPopupProps {
  country: any
}

const CountryPopup = (country : any, language : LanguageType) => {

  const properties = country?.state

  if (properties.testsAdministered) {
    var regions: Array<any> = []
    let addRegion = (r: RegionalPrevalenceEstimate, name: string) => { return (r !== undefined && r.numEstimates !== 0 ? regions.push([r, name]) : null) }
    addRegion(properties.nationalEstimate, Translate('NationalEstimates'));
    addRegion(properties.regionalEstimate, Translate('RegionalEstimates'));
    addRegion(properties.localEstimate, Translate('LocalEstimates'));
    addRegion(properties.sublocalEstimate, Translate('SublocalEstimates'));
    var lastIndex = regions.length - 1;

    return (
      <div className="col-12 p-0 flex column">
        <div className="fit popup-title">{getCountryName(properties.geographicalName, language, "CountryOptions")}</div>
        <div className="flex column fit popup-heading">
          <div className="fit popup-text">{Translate("TestsAdministered")}: <b>{properties?.testsAdministered}</b></div>
          <div className="fit popup-text">{Translate('NumSeroprevalenceEstimates')}: <b>{properties?.numberOfStudies}</b></div>
        </div>
        {regions.map((o, i) => createPopupGeographySection(o[0], o[1], i === lastIndex))}
      </div>)
  };

  return (
    <div className="col-12 p-0 flex">
      <div className="fit popup-title">{getCountryName(properties.geographicalName, language, "CountryOptions")}</div>
      <div className="col-12 p-0 flex popup-text">{Translate('NoData')}</div>
    </div>)
}

export default CountryPopup;