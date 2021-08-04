import React, { useContext, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "semantic-ui-react";
import { AppContext } from "../../../../context";
import { FilterType, PageState, State } from '../../../../types';
import { updateFilters } from "../../../../utils/stateUpdateUtils";
import Translate from "../../../../utils/translate/translateService";
import SectionHeader from "../SectionHeader";
import {enUS, fr} from 'date-fns/locale'
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import DateSlider from "./DateSlider";




interface DatepickerProps {
  page: string
}

export default function Datepicker({ page }: DatepickerProps) {
  const [state, dispatch] = useContext(AppContext);
  const pageState = state[page as keyof State] as PageState;
  const [filterStartDate, filterEndDate]: Date[] = Array.from(pageState.filters.publish_date);
  const [chosenStartDate, setChosenStartDate] = useState<Date>(filterStartDate);
  const [chosenEndDate, setChosenEndDate] = useState<Date>(filterEndDate);
  const earliestPublicationDate = state.calendarStartDates.minDate;
  const latestPublicationDate = state.calendarStartDates.maxDate;
  const millisecondsPerDay = 86400000;
  const [sliderRange, setSliderRange] = useState<number>((latestPublicationDate.getTime()-earliestPublicationDate.getTime())/millisecondsPerDay); //in days
  const [sliderThumbValues, setSliderThumbValues] = useState<Date[]>([chosenStartDate, chosenEndDate]);

  useEffect(() => {
    setSliderRange((latestPublicationDate.getTime()-earliestPublicationDate.getTime())/millisecondsPerDay);
  }, [latestPublicationDate, earliestPublicationDate])

  useEffect(() => {
    registerLocale("en", enUS)
    registerLocale("fr", fr)
  }, [])

  useEffect(() => {
    setSliderThumbValues([chosenStartDate, chosenEndDate]);
  }, [chosenStartDate, chosenEndDate])

  const datePickerChanged = async (isStart: Boolean, date: Date) => {
    const newDates = [chosenStartDate, chosenEndDate];
    newDates[0] = isStart ? date : chosenStartDate;
    newDates[1] = !isStart ? date : chosenEndDate;

    if (isStart) {
      setChosenStartDate(date);
    }
    else {
      setChosenEndDate(date);
    }
    await updateFilters(dispatch,
      pageState.filters,
      "publish_date" as FilterType,
      newDates,
      page)
  }

  const CustomInput = ({ value, onClick, text }: any) => (
    <div className="col-12 p-0 flex column">
      <div>
        {text}
      </div>
      <Input className="col-12 p-0 cursor"
        value={value}
        iconPosition="left"
        icon="calendar"
        fluid={true}
        type="text"
        placeholder='Select date..'
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
          <DateSlider max={sliderRange} min={0} onChange={datePickerChanged} values={sliderThumbValues} minDate={earliestPublicationDate}/>
          <div>
            <DatePicker
                className="col-12 p-0 date-picker"
                selected={chosenStartDate}
                onChange={() => { }}
                onSelect={(date: Date) => datePickerChanged(true, date)}
                dateFormatCalendar={"MMM yyyy"}
                dateFormat="yyyy/MM/dd"
                minDate={earliestPublicationDate}
                maxDate={chosenEndDate}
                showYearDropdown
                yearDropdownItemNumber={5}
                scrollableYearDropdown
                showMonthDropdown
                locale={state.language}
                customInput={<CustomInput value={chosenStartDate} text={Translate("StartDate")} onClick={onclick} />}
                withPortal
                closeOnScroll={true}
                shouldCloseOnSelect={false}
                dropdownMode="select"
                todayButton="Today"

            />
          </div>
          <div>
            <DatePicker
                className="col-12 p-0 date-picker"
                selected={chosenEndDate}
                onChange={() => { }}
                onSelect={(date: Date) => datePickerChanged(false, date)}
                dateFormat="yyyy/MM/dd"
                dateFormatCalendar={"MMM yyyy"}
                minDate={chosenStartDate}
                maxDate={latestPublicationDate}
                showYearDropdown
                yearDropdownItemNumber={5}
                scrollableYearDropdown
                showMonthDropdown
                locale={state.language}
                customInput={<CustomInput value={chosenEndDate} text={Translate("EndDate")} onClick={onclick} />}
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