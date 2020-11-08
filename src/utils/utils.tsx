import { formatISO, add } from "date-fns";

export const formatDates = (dates: Array<Date> | null) => {
  let endDate = formatISO(new Date());
  let startDate = formatISO(add(new Date(endDate), { years: -2 }));
  if (dates) {
    endDate = dates[1] ? formatISO(dates[1] as Date) : endDate;
    startDate = dates[0] ? formatISO(dates[0] as Date) : startDate;
  }
  return [startDate, endDate]
}