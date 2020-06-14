import React, { useState } from 'react'
import { Handles, Rail, Slider, Ticks, Tracks } from 'react-compound-slider'
import { SliderRail } from './SliderRail'
import { Handle } from './Handle'
import { Tick } from './Tick'
import { Track } from './Track'
import './Styles.scss';

const domain = [100, 500]
const defaultValues: readonly number[] = [150, 300, 400, 450]

export default function Example() {
  const [values, setValues] = useState(defaultValues);
  const [update, setUpdate] = useState(defaultValues);

  const onUpdate = (update: readonly number[]) => {
   setUpdate(update);
  }

  const onChange = (values: readonly number[]) => {
    setValues(values);
  }

  return (
    <div className="slider-container">
      <Slider
        mode={2}
        step={5}
        domain={domain}
        className="slider"
        onUpdate={onUpdate}
        onChange={onChange}
        values={values}
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
                  domain={domain}
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
        <Ticks count={5}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map(tick => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  )
}