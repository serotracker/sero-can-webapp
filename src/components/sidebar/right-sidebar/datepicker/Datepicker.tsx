import React, { useContext, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "semantic-ui-react";
import { AppContext } from "../../../../context";
import { FilterType, PageState, State } from '../../../../types';
import { updateFilters } from "../../../../utils/stateUpdateUtils";
import Translate from "../../../../utils/translate/translateService";
import SectionHeader from "../SectionHeader";
import {enUS, fr, de} from 'date-fns/locale'
import DateSlider from './DateSlider';
import '../datepicker/DateSlider.css'

interface DatepickerProps {
  page: string
}

export default function Datepicker({ page }: DatepickerProps) {

  const [state, dispatch] = useContext(AppContext);
  const filters = (state[page as keyof State] as PageState).filters;
  const earliestPublicationDate = state.calendarStartDates.minDate;
  const latestPublicationDate = state.calendarStartDates.maxDate;
  const millisecondsPerDay = 86400000;
  const [sliderRange, setSliderRange] = useState<number>((latestPublicationDate.getTime()-earliestPublicationDate.getTime())/millisecondsPerDay); //in days
  const [filterStartDate, filterEndDate]: Date[] = Array.from(filters.publish_date);

  const fromDateToNumber = (date: Date) => {
    return (date.getTime()-earliestPublicationDate.getTime())/millisecondsPerDay
  }
  const toDateSinceMinDate = (val: number) => {
    return new Date(earliestPublicationDate.getTime() + (val*millisecondsPerDay));
  }

  //dates as number of days since mindate
  const [chosenDates, setChosenDates] = useState<number[]>([fromDateToNumber(filterStartDate), fromDateToNumber(filterEndDate)])

  useEffect(() => {
    registerLocale("en", enUS)
    registerLocale("fr", fr)
    registerLocale("de", de)
  }, [])

  useEffect(() => {
    const [filterStartDate, filterEndDate]: Date[] = Array.from(filters.publish_date);
    setChosenDates([fromDateToNumber(filterStartDate), fromDateToNumber(filterEndDate)]);
  }, [filters.publish_date])

  useEffect(() => {
    setSliderRange(fromDateToNumber(latestPublicationDate));
    }, [latestPublicationDate, earliestPublicationDate])

  const onChange = (dates: number[]) => {
      setChosenDates(dates)
  }

  const onUpdate = (isStart: Boolean, date: Date) => {
    let newDates: Date[];

    if (isStart) {
      newDates = [date, toDateSinceMinDate(chosenDates[1])];
      setChosenDates([fromDateToNumber(date), chosenDates[1]])
    }
    else {
      newDates = [toDateSinceMinDate(chosenDates[0]), date];
      setChosenDates([chosenDates[0], fromDateToNumber(date)])
    }

    updateFilters(dispatch,
        filters,
        "publish_date" as FilterType,
        newDates,
        page)
  }

  const CustomInput = ({ value, onClick, text }: any) => (
      <div className="col-12 p-0 flex input-seperate">
        <Input className="col-12 p-0 cursor"
               value={value}
               fluid={true}
               type="text"
   
               placeholder={Translate('SelectDate')}
               onClick={onClick} />
      </div>
  )

  return (
      <div className="row justify-content-center">
        <div className="col-10 col align-items-center p-0">
          <div className="pb-1">
            <div>
              <SectionHeader header_text={Translate('DateRange')} tooltip_text={Translate('DateRangeTooltip')} />
            </div>
            <DateSlider maxPossibleValue={sliderRange} minPossibleValue={0} onMouseUp={onUpdate} onSliderMove={onChange} values={chosenDates} minDate={earliestPublicationDate}/>
            <div className="space-between mt-3 mb-3">
              <DatePicker
                  selected={toDateSinceMinDate(chosenDates[0])}
                  onChange={() => { }}
                  onSelect={(date: Date) => onUpdate(true, date)}
                  dateFormatCalendar={"MMMM yyyy "}
                  dateFormat="yyyy/MM/dd"
                  minDate={earliestPublicationDate}
                  maxDate={toDateSinceMinDate(chosenDates[1])}
                  showYearDropdown
                  yearDropdownItemNumber={5}
                  scrollableYearDropdown
                  showMonthDropdown
                  locale={state.language}
                  customInput={<CustomInput value={toDateSinceMinDate(chosenDates[0])} onClick={onclick} />}
                  withPortal
                  closeOnScroll={true}
                  shouldCloseOnSelect={false}
                  dropdownMode="select"
                  // TODO: also add translation in german.json
                  todayButton={Translate("Today")}
              />
               <DatePicker
                  selected={toDateSinceMinDate(chosenDates[1])}
                  onChange={() => { }}
                  onSelect={(date: Date) => onUpdate(false, date)}
                  dateFormat="yyyy/MM/dd"
                  dateFormatCalendar={"MMM yyyy"}
                  minDate={toDateSinceMinDate(chosenDates[0])}
                  maxDate={latestPublicationDate}
                  showYearDropdown
                  yearDropdownItemNumber={5}
                  scrollableYearDropdown
                  showMonthDropdown
                  locale={state.language}
                  customInput={<CustomInput value={toDateSinceMinDate(chosenDates[1])} onClick={onclick} />}
                  withPortal
                  closeOnScroll={true}
                  shouldCloseOnSelect={false}
                  dropdownMode="select"
                  todayButton="Today"
              />
            </div>
          </div>
        </div>
      </div>
  )
}