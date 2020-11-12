import React, { useContext, useEffect, useState } from "react";
import { AppContext } from '../../../context'
import "./CalendarPicker.css"
import Translate from "../../../utils/translate/translateService";

import * as moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default function CalendarPicker() {
  const [state, dispatch] = useContext(AppContext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");

  useEffect(() => {
    if(state.airtable_records) {
      const orderedDates = state.airtable_records
      .filter(o => o.publish_date !== null && o.publish_date !== undefined)
      .map(o => o.publish_date instanceof Array ? Date.parse(o.publish_date[0] as string) : Date.parse(o.publish_date as string))
      .sort((a, b) => a - b);

      const startDate = orderedDates[0];
      setStartDate(moment(startDate));
      setEndDate(moment());
    }
  }, [state.airtable_records])

  const onDatesChange = (range: object) => {
    const start = range.startDate;
    const end = range.endDate;
    if (moment.isMoment(start)) {
      setStartDate(start);
    }

    if (moment.isMoment(end)) {
      setEndDate(end);
    }

    if (start != null && end != null) {
      const values = [start.valueOf(), end.valueOf()]
      dispatch({
        type: 'UPDATE_FILTER',
        payload: {
          filter_type: 'publish_date',
          filter_value: values
        }
      })
    }
  }

  const onFocusChange = (focus: object) => {
    setFocusedInput(focus);
  }

  function isAfterDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
    return !isBeforeDay(a, b) && !isSameDay(a, b);
  }

  function isBeforeDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

    const aYear = a.year();
    const aMonth = a.month();

    const bYear = b.year();
    const bMonth = b.month();

    const isSameYear = aYear === bYear;
    const isSameMonth = aMonth === bMonth;

    if (isSameYear && isSameMonth) return a.date() < b.date();
    if (isSameYear) return aMonth < bMonth;
    return aYear < bYear;
  }

  function isSameDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
    // Compare least significant, most likely to change units first
    // Moment's isSame clones moment inputs and is a tad slow
    return a.date() === b.date()
      && a.month() === b.month()
      && a.year() === b.year();
  }
  
  return (
    <div className="date-range-container">
      <div className="section-title space-between flex">
        {Translate('DateRange')}
      </div>
      <DateRangePicker
          endDate={endDate}
          endDateId="endDateId"
          focusedInput={ focusedInput }
          onDatesChange={onDatesChange}
          onFocusChange={onFocusChange}
          startDate={startDate}
          startDateId="startDateId"
          isOutsideRange={day => isAfterDay(day, moment())}
          numberOfMonths={1}
          openDirection="up"
          hideKeyboardShortcutsPanel={true}
          small={true}
      />
    </div>
  )
}
