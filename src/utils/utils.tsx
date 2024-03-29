import { formatISO, add } from "date-fns";
import Translate from 'utils/translate/translateService';
import { LanguageType } from "../types";
import { compareAsc } from "date-fns";
import mapboxgl from "mapbox-gl";

let language = LanguageType.english;

export const setLanguage = (newLanguage: LanguageType) => {
  language = newLanguage;
}

export const formatDates = (dates: Array<Date> | null) => {
  let endDate = formatISO(new Date());
  let startDate = formatISO(add(new Date(endDate), { years: -2 }));
  if (dates) {
    const dateList = Array.from(dates);
    if (compareAsc(dateList[0], dateList[1]) === 1) {
      dateList.reverse();
    }
    endDate = dateList[1] ? formatISO(dateList[1] as Date) : endDate;
    startDate = dateList[0] ? formatISO(dateList[0] as Date) : startDate;

  }
  return [startDate, endDate]
}

export const getGeography = (city: string[] | null | undefined, state: string[] | null | undefined, country: string | null) => {
  if (!country) {
    return Translate("Not Reported");
  }

  function renderOutGeography(geo: string[] | string | null | undefined) {
    if (!geo || geo.length === 0) {
      return ""
    }
    if (typeof geo === "string"){
      return geo.trim() + ", "
    }
    else {
      const geoTrimmed = geo.map((g) => g.trim())
      return geoTrimmed.join(", ") + ", ";
    }
  }

  return "" + renderOutGeography(city) + renderOutGeography(state)  + country
}

export const getMapboxLatitudeOffset = (map: mapboxgl.Map | undefined) => {
  // Map seems to zoom in in powers of 2, so reducing offset by powers of 2 keeps the modal apprximately
  // in the same center everytime
  if(map){
    // offset needs to reduce exponentially with zoom -- higher zoom x smaller offset
    let mapZoom = map.getZoom();

    return 80/(Math.pow(2, mapZoom))
  }
  return 0
}

export const withLocaleUrl = (path: string) => {
  return `/${language}/${path}`;
}

export const translateAntibodyTargets = (antibodyTarget: string | string[]) => {
  if (typeof antibodyTarget == "string") {
    return Translate("AntibodyTargetOptions", [antibodyTarget.replace(/\s/g, "")])
  }
  else {
    const initialValue = ""
    let returnString = antibodyTarget.reduce((previousValue, currentValue) => previousValue
        + Translate("AntibodyTargetOptions", [currentValue.replace(/\s/g, "")]) + ", ", initialValue)
    return returnString.slice(0, -2)
  }
}