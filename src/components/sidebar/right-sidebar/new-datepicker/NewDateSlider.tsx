import * as React from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { Handle, Track, TooltipRail } from "./components"; // example render components - source below
import {useEffect, useState} from "react";

const sliderStyle: React.CSSProperties = {
  position: "relative",
  width: "80%",
  margin: "5% 10%"
};

interface DateSliderProps {
  minPossibleValue: number; //minimum possible value for slider in milliseconds - unix time
  maxPossibleValue: number; //maximum possible value for slider in milliseconds - unix time
  values: number[];
  minDate: Date;
  onMouseUp: (isStart: Boolean, date: Date) => void;
  onSliderMove: (dates: number[]) => void;
}

export default function NewDateSlider({minPossibleValue, maxPossibleValue, minDate, values, onMouseUp, onSliderMove}: DateSliderProps) {
  const milliSecondsPerDay = 86400000;
  const [updatedValues, setUpdatedValues] = useState([minPossibleValue, maxPossibleValue])
  // min date and max date
  const domain = [minPossibleValue, maxPossibleValue]
  //running update
  const onUpdate = (update: ReadonlyArray<number>) => {
    setUpdatedValues(update.concat());
    onSliderMove(updatedValues)
  };

  useEffect(() => {
      setUpdatedValues(values)
  }, [values])

  //set update
  const onChange = (newValues: ReadonlyArray<number>) => {
      if (newValues[0] === values[0]){
          onMouseUp(false, toDateSinceMinDate(newValues.concat()[1]))
      }
      else{
          onMouseUp(true, toDateSinceMinDate(newValues.concat()[0]))
      }
  };

  const toDateSinceMinDate = (val: number) => {
    return new Date(minDate.getTime() + (val*milliSecondsPerDay));
  }

  const toDateString = (date: Date) => {
    return "" + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + (date.getDate());
  }

  return(
      <div style={{ height: 10  , width: "100%" }}>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={onUpdate}
          onChange={onChange}
          values={values}
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
    </div>
  )
}


