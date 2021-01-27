import { format, parseISO, formatISO, add } from "date-fns";
import { LanguageType, AirtableRecord } from "../types";

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
    return "Not Reported"
  }
  return nullString
}

export const getPossibleNullDateString = (nullString: string | null | undefined) => {
  if (nullString === null || nullString === undefined) {
    return "Not Reported"
  }
  return format(parseISO(nullString), "dd-MM-yyyy")
}

export const getPossibleNullStringArray = (nullString: string[] | null | undefined) => {
  if (nullString === null || nullString === undefined) {
    return "Not Reported"
  }
  return nullString.join(", ")
}

export const getGeography = (city: string[] | null | undefined, state: string[] | null | undefined, country: string | null) => {
  if (!country) {
    return "Not Reported";
  }
  return `${city && city.length > 0 ? `${city.join(", ")}, ` : ""}${state && state.length > 0 ? `${state.join(", ")}, ` : ""}${country}`;
}

export const withLocaleUrl = (path: string) => {
  return `/${language}/${path}`;
}

export const mapToAirtableRecord = (item: Record<string, any>) => {
  // Convert response to AirtableRecord type
  const record: AirtableRecord = {
    age: item.age,
    approving_regulator: item.approving_regulator,
    city: item.city,
    country: item.country,
    denominator: item.denominator_value,
    estimate_grade: item.estimate_grade,
    first_author: item.first_author,
    isotypes_reported: item.isotypes_reported,
    lead_org: item.lead_org,
    overall_risk_of_bias: item.overall_risk_of_bias,
    pin_latitude: item.pin_latitude,
    pin_longitude: item.pin_longitude,
    pin_region_type: item.pin_region_type,
    population_group: item.population_group,
    sampling_end_date: item.sampling_end_date,
    sampling_start_date: item.sampling_start_date,
    seroprevalence: item.serum_pos_prevalence,
    sex: item.sex,
    source_name: item.source_name,
    source_id: item.source_id,
    source_type: item.source_type,
    specimen_type: Array.isArray(item.specimen_type) ? item.specimen_type : [item.specimen_type],
    state: item.state,
    study_type: item.study_type,
    test_type: item.study_type,
    url: item.url
  };

  return record;
}