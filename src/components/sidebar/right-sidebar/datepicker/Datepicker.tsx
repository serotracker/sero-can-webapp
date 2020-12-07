import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "semantic-ui-react";
import { AppContext } from "../../../../context";
import httpClient from "../../../../httpClient";
import { Filters } from '../../../../types';
import Translate from "../../../../utils/translate/translateService";

export default function Datepicker() {
  const [state, dispatch] = useContext(AppContext);
  const [startDate, setStartDate] = useState(state.calendarStartDates.minDate);
  const [endDate, setEndDate] = useState(state.calendarStartDates.maxDate);
  useEffect(() => {
    const dateFilters = Array.from(state.filters.publish_date);
    const [newStart, newEnd] = dateFilters as Date[];

    const datesExist = newStart && newEnd;
    const datesAreDifferent = newStart !== startDate || endDate !== newEnd;
    const minDateHasChanged = state.calendarStartDates.minDate.getHours() !== 1;

    if (minDateHasChanged && datesExist && datesAreDifferent) {
      setStartDate(newStart);
      setEndDate(newEnd);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filters.publish_date])

  const datePickerChanged = async (isStart: Boolean, date: Date) => {
    const newDates = [startDate, endDate];
    newDates[0] = isStart ? date : startDate;
    newDates[1] = !isStart ? date : endDate;

    dispatch({
      type: 'UPDATE_FILTER',
      payload: {
        filter_type: 'publish_date',
        filter_value: newDates
      }
    });

    const updated_filters: Filters = Object.assign({}, state.filters);
    updated_filters['publish_date'] = new Set(newDates);

    const api = new httpClient()
    // Update current records when called
    const records = await api.getAirtableRecords(updated_filters, state.dataPageState.exploreIsOpen)
    dispatch({
      type: 'GET_AIRTABLE_RECORDS',
      payload: records
    });

    if (isStart) {
      setStartDate(date);
    }
    else {
      setEndDate(date);
    }
  }

  const CustomInput = ({ value, onClick, text }: any) => (
    <div className="col-12 p-0 flex column">
      <div className="col-12 center-item">
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
    <div className="flex center-item">
      <div className="col-xl-6 col-xs-12 flex p-0">
        <DatePicker
          selected={startDate}
          minDate={state.calendarStartDates.minDate}
          maxDate={endDate}
          customInput={<CustomInput value={startDate} text={Translate("SamplingStartDate")} onClick={onclick} />}
          closeOnScroll={true}
          onChange={() => { }}
          withPortal
          showMonthDropdown
          showYearDropdown
          shouldCloseOnSelect={false}
          dropdownMode="select"
          onSelect={(date: Date) => datePickerChanged(true, date)} />
      </div>
      <div className="col-xl-6 col-xs-12 flex p-0">
        <DatePicker
          className="col-12 p-0 date-picker"
          selected={endDate}
          onSelect={(date: Date) => datePickerChanged(false, date)}
          customInput={<CustomInput value={startDate} text={Translate("SamplingEndDate")} onClick={onclick} />}
          minDate={startDate}
          maxDate={state.calendarStartDates.maxDate}
          onChange={() => { }}
          withPortal
          showMonthDropdown
          closeOnScroll={true}
          shouldCloseOnSelect={false}
          showYearDropdown
          todayButton="Today"
          dropdownMode="select"
        />
      </div>
    </div>
  )
}