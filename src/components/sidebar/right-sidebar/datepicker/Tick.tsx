import * as React from "react";
import { SliderItem } from "react-compound-slider";

interface TickProps {
    tick: SliderItem;
    count: number;
    format: (val: number) => string;
}
  
const defaultFormat = (d: number) => `d`;
  
export default function Tick({ tick, count, format = defaultFormat }: TickProps) {
    return (
      <div>
        <div
            className={"tick-style"}
          style={{
            left: `${tick.percent}%`,
          }}
        />
        <div
            className={"tick-center-style"}
          style={{
            marginLeft: `${-(100 / count) / 2}%`,
            width: `${100 / count}%`,
            left: `${tick.percent}%`,
          }}
        >
          {format(tick.value)}
        </div>
      </div>
    );
  }