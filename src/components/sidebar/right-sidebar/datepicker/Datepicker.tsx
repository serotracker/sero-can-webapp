import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "semantic-ui-react";
import { AppContext } from "../../../../context";
import httpClient from "../../../../httpClient";
import { Filters, FilterType, PageState, State } from '../../../../types';
import { updateFilters } from "../../../../utils/stateUpdateUtils";
import Translate from "../../../../utils/translate/translateService";

interface DatepickerProps {
  page: string
}

export default function Datepicker({ page }: DatepickerProps) {
  const [state, dispatch] = useContext(AppContext);
  const pageState = state[page as keyof State] as PageState;
  const [filterStartDate, filterEndDate] = Array.from(pageState.filters.publish_date);
  const [startDate, setStartDate] = useState(filterStartDate);
  const [endDate, setEndDate] = useState(filterEndDate);

  const datePickerChanged = async (isStart: Boolean, date: Date) => {
    const newDates = [startDate, endDate];
    newDates[0] = isStart ? date : startDate;
    newDates[1] = !isStart ? date : endDate;

    if (isStart) {
      setStartDate(date);
    }
    else {
      setEndDate(date);
    }
    await updateFilters(dispatch,
      pageState.filters,
      "publish_date" as FilterType,
      newDates,
      state.dataPageState.exploreIsOpen,
      page,
      state.chartAggregationFactor)
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