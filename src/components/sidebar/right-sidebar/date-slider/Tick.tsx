import React from "react"
import { SliderItem } from "react-compound-slider"

interface TickProps {
  tick: SliderItem,
  count: number,
  label: string
}

export function Tick({ tick, count, label }: TickProps) {
  return (
    <div>
      <div className="tick-container" style={{ left: `${tick.percent}%` }} />
      <div className="tick"
        style={{
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {label}
      </div>
    </div>
  )
}