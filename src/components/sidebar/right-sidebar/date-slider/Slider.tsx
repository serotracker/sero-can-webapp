import React from 'react'
import { Handles, Rail, Slider, Ticks, Tracks } from 'react-compound-slider'
import { Handle, SliderRail, Tick, Track } from './components' // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const domain = [100, 500]
const defaultValues = [150, 300, 400, 450]

export default function Example() {
  const state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
  }

  const onUpdate = (update: readonly number[]) => {
    this.setState({ update })
  }

  const onChange = (values: readonly number[]) => {
    this.setState({ values })
  }


  return (
    <div style={{ height: 120, width: '100%' }}>
      <Slider
        mode={2}
        step={5}
        domain={domain}
        rootStyle={sliderStyle}
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