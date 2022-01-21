import { formatISO, add } from "date-fns";
import Translate from 'utils/translate/translateService';
import { LanguageType } from "../types";
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
      return geo.join(", ") + ", ";
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

export const getformattedDate = (day: any, month: any, year: any, language: LanguageType) => {
  switch(language) {   
    case 'en': return `${month } ${day ? day + "," : ""} ${year}`;
    case 'fr': return `${day} ${Translate("Months", [month])} ${year}`;
    case 'de': return `${day ? day + "." : ""} ${Translate("Months", [month])} ${year}`;
    default: return `${month } ${day ? day + "," : ""} ${year}`;      
  }
}



