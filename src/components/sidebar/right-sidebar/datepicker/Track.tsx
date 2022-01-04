import * as React from "react";
import { SliderItem } from "react-compound-slider";

interface TrackProps {
    source: SliderItem;
    target: SliderItem;
    disabled?: Boolean;
    getTrackProps: () => object;
}
  
const trackStyle: React.CSSProperties = {
  position: "absolute",
  height: 5,
  zIndex: 1,
  borderRadius: 7,
  cursor: "pointer",
};

export default function Track({
    source,
    target,
    getTrackProps,
    disabled = false
  }: TrackProps) {
    return (
      <div
        style={{
          backgroundColor: disabled ? "#999" : "#455a6a",
          left: `${source.percent}%`,
          width: `${target.percent - source.percent}%`,
          ...trackStyle
        }}
        {...getTrackProps()}
      />
    );
  }