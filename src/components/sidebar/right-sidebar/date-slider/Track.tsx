import React from "react"
import { SliderItem } from "react-compound-slider"

interface TrackProps {
  source: SliderItem,
  target: SliderItem,
  disabled: boolean,
  getTrackProps: Function
}

export function Track({ source, target, getTrackProps, disabled }: TrackProps) {

  const getPosition = () => {
    const left = `${source.percent}%`;
    const width = `${target.percent - source.percent}%`

    return {
      left, width
    }
  }

  return (
    <div className="track"
      style={getPosition()}
      {...getTrackProps()}
    />
  )
}

Track.defaultProps = {
  disabled: false,
}