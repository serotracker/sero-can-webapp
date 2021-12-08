import * as React from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { Handle, Track, TooltipRail } from "./components"; // example render components - source below
import { useState } from "react";

const sliderStyle: React.CSSProperties = {
  position: "relative",
  width: "80%",
  margin: "20% 10%"
};

interface DateSliderProps {
  minPossibleValue: number; //minimum possible value for slider
  maxPossibleValue: number; //maximum possible value for slider
  values: Date[];
  minDate: Date;
  onMouseUp: Function;
}

export default function NewDateSlider({minPossibleValue, maxPossibleValue, minDate, values, onMouseUp}: DateSliderProps) {
  const milliSecondsPerDay = 86400000;
  const [updatedValues, setUpdatedValues] = useState([minPossibleValue, maxPossibleValue])
  const [chosenValues, setChosenValues] = useState([minPossibleValue, maxPossibleValue])
  // min date and max date
  const domain = [minPossibleValue, maxPossibleValue]

  const onUpdate = (update: ReadonlyArray<number>) => {
    setUpdatedValues(update.concat());
  };

  const onChange = (values: ReadonlyArray<number>) => {
    setChosenValues(values.concat());
  };

  const toDateSinceMinDate = (val: number) => {
    return new Date(minDate.getTime() + (val*milliSecondsPerDay));
  }

  const toDateString = (date: Date) => {
    return "" + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + (date.getDate());
  }

  return(
      <div style={{ height: 120, width: "100%" }}>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={onUpdate}
          onChange={onChange}
          values={chosenValues}
        >
          <Rail>{railProps => <TooltipRail {...railProps} />}</Rail>
          <Handles>
            {({ handles, activeHandleID, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    isActive={handle.id === activeHandleID}
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
        </Slider>
        <div className={"pt-4 d-flex justify-content-between"}>
          <div>
            {toDateString(toDateSinceMinDate(updatedValues[0]))}
          </div>
          <div>
            {toDateString(toDateSinceMinDate(updatedValues[1]))}
          </div>
      </div>
      <div className={"pt-4 d-flex justify-content-between"}>
          <div>
            {toDateString(toDateSinceMinDate(updatedValues[0]))}
          </div>
          <div>
            {toDateString(toDateSinceMinDate(updatedValues[1]))}
          </div>
      </div>
    </div>
  )
}


