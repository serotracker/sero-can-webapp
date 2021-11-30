import React from "react";
import { format, parseISO, formatISO, add } from "date-fns";
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


export const getPossibleNullString = (nullString: string | number | null | undefined) => {
  if (nullString === null || nullString === undefined) {
    return Translate("Not Reported")
  }
  return nullString
}

export const getPossibleNullDateString = (nullString: string | null | undefined) => {
  if (nullString === null || nullString === undefined) {
    return Translate("Not Reported")
  }

  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return dateTimeFormat.format(new Date(nullString))
}

export const getPossibleNullStringArray = (nullString: string[] | null | undefined) => {
  if (nullString === null || nullString === undefined) {
    return Translate("Not Reported")
  }
  return nullString.join(", ")
}

export const getGeography = (city: string[] | null | undefined, state: string[] | null | undefined, country: string | null) => {
  if (!country) {
    return Translate("Not Reported");
  }

  function renderOutGeography(geo: string[] | string | null | undefined) {
    if (!geo || geo.length === 0) {
      return undefined
    }
    if (typeof geo === "string"){
      return geo.trim() + ", "
    }
    else if (geo.length > 1) {

      return geo.join(", ") + ", ";
    }
    return geo[0].trim() + ", "

  }

  //return  [renderOutGeography(city), renderOutGeography(state), country].filter(Boolean).map((str)=>{return (<React.Fragment>{str}</React.Fragment>)})
  return "" + (renderOutGeography(city) ? renderOutGeography(city) : "") + (renderOutGeography(state) ? renderOutGeography(state) : "")  + country
}

export const getMapboxLatitudeOffset = (map: mapboxgl.Map | undefined) => {
  // This gets the zoom level of the map, and changes the latitude offset respectively to make sure the modal
  // is as centered as possible no matter how much the map is zoomed in
  if(map){
    var mapZoom = map.getZoom();
    if(mapZoom <= 4){
      return 30/mapZoom;
    }
    else if(mapZoom > 4 && mapZoom < 6) {
      return 30/(2*mapZoom);
    }
    else if(mapZoom > 5 && mapZoom < 7) {
      return 30/(mapZoom*4);
    }
    else if(mapZoom >= 7 && mapZoom < 9) {
      return 30/(mapZoom*8);
    }
    else if(mapZoom >= 9) {
      return 30/(mapZoom*64);
    }
  }
  return 0
}

export const withLocaleUrl = (path: string) => {
  return `/${language}/${path}`;
}

export const NumberDateToWordDate = (date_str: string) => {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [year, month, day] = date_str.split("/");
  const monthStr = months[Number(month) - 1];
  return `${Translate("Months", [monthStr])} ${day}, ${year}`
}
