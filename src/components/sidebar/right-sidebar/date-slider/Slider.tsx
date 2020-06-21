import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { Handles, Rail, Slider, SliderItem, Ticks, Tracks } from 'react-compound-slider'
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

  const [displayStartDate, setStartDate] = useState(endMoment - 2);
  const [displayEndDate, setEndDate] = useState(endMoment);
  // The end moment should technically be after the start moment
  const [startBound, setStartBound] = useState(endMoment - 1);
  const [endBound,] = useState(endMoment);
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


  const onChange = async (values: readonly number[]) => {

    if (values[0] === values[1]) {
      return null;
    }
    setStartDate(values[0]);
    setEndDate(values[1]);
    setLoaded(true);
    dispatch({
      type: 'UPDATE_FILTER',
      payload: {
        filter_type: 'publish_date',
        filter_value: values
      }
    })
  }

  if (startBound === undefined || endBound === undefined) {
    return null;
  }

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