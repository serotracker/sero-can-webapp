import * as React from "react";
import { SliderItem } from "react-compound-slider";

interface TrackProps {
    source: SliderItem;
    target: SliderItem;
    disabled?: Boolean;
    getTrackProps: () => object;
}

export default function Track({
    source,
    target,
    getTrackProps,
    disabled = false
  }: TrackProps) {
    return (
      <div
        className={"track-style"}
        style={{
          backgroundColor: disabled ? "#999" : "#455a6a",
          left: `${source.percent}%`,
          width: `${target.percent - source.percent}%`
        }}
        {...getTrackProps()}
      />
    );
  }