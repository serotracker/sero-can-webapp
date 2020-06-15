import _ from 'lodash'
import React, { useContext, useState, useEffect } from 'react'
import { Handles, Rail, Slider, Ticks, Tracks, SliderItem } from 'react-compound-slider'
import { AppContext } from '../../../../context'
import Translate from '../../../../utils/translate/translateService'
import { Handle } from './Handle'
import { SliderRail } from './SliderRail'
import './Styles.scss'
import { Tick } from './Tick'
import { Track } from './Track'

interface TickItem {
  tick: SliderItem,
  label: string,
  count: number
}

export default function DateRangeSlider() {
  const [state, dispatch] = useContext(AppContext);
  const endMoment = new Date().getTime();

  const [displayStartDate, setStartDate] = useState(endMoment);
  const [displayEndDate, setEndDate] = useState(endMoment);
  const [startBound, setStartBound] = useState(endMoment);
  const [endBound, setEndBound] = useState(endMoment);
  const [loaded, setLoaded] = useState(false);



  useEffect(() => {

    const orderedDates = state.airtable_records
      .filter(o => o.publish_date !== null && o.publish_date !== undefined)
      .map(o => o.publish_date instanceof Array ? Date.parse(o.publish_date[0] as string) : Date.parse(o.publish_date as string))
      .sort((a, b) => a - b);

    const startDate = orderedDates[0];
    setStartBound(startDate);
    setStartDate(startDate);

  }, [state.airtable_records])

  const getTimeRange = (start: Date, end: number) => {
    const startTime = start.getTime();
    const timeElapsed = end - startTime;
    const yearsElapsed = timeElapsed / (1000 * 3600 * 24 * 365)
    const monthsElapsed = yearsElapsed * 12;
    const startMonth = start.getMonth();
    const months = _.range(startMonth, startMonth + monthsElapsed);
    return months.map(month => {
      const year = start.getFullYear() + Math.floor(month / 12)
      const date = new Date(year, month);
      const percentage = (date.getTime() - startTime) / timeElapsed * 100;
      return { percentage, date }
    }).filter(o => o.percentage > 0)
  }

  const createTicks = (startDate: number, endDate: number) => {
    const start = new Date(startDate);
    const monthRange = getTimeRange(start, endDate);
    const totalCount = monthRange.length + 1;
    const formatOptions = {
      month: 'short'
    }
    const todayTick: TickItem = {
      tick: {
        id: endDate.toString(),
        value: endDate,
        percent: 100
      },
      count: totalCount,
      label: Translate("Today")
    }
    const monthTicks: TickItem[] = monthRange.map(o => ({
      tick: {
        id: o.date.toString(),
        value: o.date.getTime(),
        percent: o.percentage
      },
      label: o.date.toLocaleDateString("en-US", formatOptions),
      count: totalCount
    }))

    return [...monthTicks, todayTick]
  }

  const onChange = (values: readonly number[]) => {
    // So because the step is set up to be every day, the time of day is set for all steps at the time of the first step
    // We need to set all the hours and minutes to 0 for us to compare the dates. 
    // We do not have to do this for the startdate
    const isInitialEndDate = new Date(endBound).setHours(0, 0, 0, 0) === new Date(values[1]).setHours(0, 0, 0, 0);
    const isInitialStartDate = new Date(startBound).setHours(0, 0, 0, 0) === new Date(values[0]).setHours(0, 0, 0, 0);
    if ((!loaded && isInitialStartDate && isInitialEndDate) ||
      (loaded && (!isInitialStartDate || !isInitialEndDate))) {
      setStartDate(values[0]);
      setEndDate(values[1]);
      setLoaded(true);
      dispatch({
        type: 'UPDATE_FILTER',
        payload: {
          filter_type: 'date_range',
          filter_value: values
        }
      })
    }
  }

  // if (startDate === undefined || endDate === undefined) {
  //   return null;
  // }

  const customTicks = createTicks(startBound, endBound);
  return (
    <div className="slider-container">
      <div className="section-title space-between flex">
        {Translate('DateRange')}
        <div className="dates">
          {new Date(displayStartDate).toLocaleDateString("en-US")} - {new Date(displayEndDate).toLocaleDateString("en-US")}
        </div>

      </div>
      <Slider
        mode={2}
        step={1000 * 3600 * 24}
        domain={[startBound, endBound]}
        className="slider"
        onChange={onChange}
        values={[displayStartDate, displayEndDate]}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={[displayStartDate, displayEndDate]}
                  disabled={false}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks>
          {({ ticks }) => (
            <div className="slider-ticks">
              {customTicks.map(tickItem => (
                <Tick key={tickItem.tick.id}
                  tick={tickItem.tick}
                  count={tickItem.count}
                  label={tickItem.label} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  )
}