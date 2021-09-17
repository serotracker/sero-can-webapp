import React from "react";
import { format, parseISO, formatISO, add } from "date-fns";
import Translate from 'utils/translate/translateService';
import { LanguageType } from "../types";

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
  return format(parseISO(nullString), "yyyy/MM/dd")
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

  function renderOutGeography(geo: string[] | null | undefined) {
    if (!geo || geo.length === 0) {
      return undefined
    }
    else if (geo.length > 1 && typeof geo !== "string") {
      return geo?.join(", ");
    }
    return geo
  }

  return  [renderOutGeography(city), renderOutGeography(state), country].filter(Boolean).map((str)=>{return (<React.Fragment>{str}<br/></React.Fragment>)})
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
