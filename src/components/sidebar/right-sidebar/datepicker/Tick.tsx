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
          style={{
            position: "absolute",
            marginTop: 17,
            width: 1,
            height: 5,
            backgroundColor: "rgb(200,200,200)",
            left: `${tick.percent}%`
          }}
        />
        <div
          style={{
            position: "absolute",
            marginTop: 25,
            fontSize: 10,
            textAlign: "center",
            marginLeft: `${-(100 / count) / 2}%`,
            width: `${100 / count}%`,
            left: `${tick.percent}%`
          }}
        >
          {format(tick.value)}
        </div>
      </div>
    );
  }