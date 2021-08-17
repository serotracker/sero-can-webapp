import React, {useCallback, useEffect, useRef, useState} from 'react';
import './DateSlider.css';

interface DSprops {
    minPossibleValue: number; //minimum possible value for slider
    maxPossibleValue: number; //maximum possible value for slider
    values: Date[];
    minDate: Date;
    onMouseUp: Function;
}

export default function DateSlider({minPossibleValue, maxPossibleValue, minDate, values, onMouseUp}: DSprops){

    const milliSecondsPerDay = 86400000;

    const [sliderThumbValues, setSliderThumbValues] = useState<number[]>([(values[0].getTime() - minDate.getTime())/milliSecondsPerDay,
        (values[1].getTime() - minDate.getTime())/milliSecondsPerDay])
    const [leftThumbVal, setLeftThumbVal] = useState(sliderThumbValues[0]);
    const [rightThumbVal, setRightThumbVal] = useState(sliderThumbValues[1]);
    const minValRef = useRef(minPossibleValue);
    const maxValRef = useRef(maxPossibleValue);
    const range = useRef<HTMLDivElement>(null);

    const getPercent = (value: number) => Math.round(((value - minPossibleValue) / (maxPossibleValue - minPossibleValue)) * 100)

    useEffect(() => {
      setLeftThumbVal(sliderThumbValues[0]);
      setRightThumbVal(sliderThumbValues[1]);
    }, [sliderThumbValues])

    useEffect(() => {
        const minPercent = getPercent(leftThumbVal);
        const maxPercent = getPercent(rightThumbVal);
        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = maxPercent - minPercent < 100 ? `${maxPercent - minPercent}%` : "100%";
        }
    }, [leftThumbVal, getPercent]);

    useEffect(() => {
        const minPercent = getPercent(leftThumbVal);
        const maxPercent = getPercent(rightThumbVal);
        if (range.current) {
            range.current.style.width = maxPercent - minPercent < 100 ? `${maxPercent - minPercent}%` : "100%";
        }
    }, [rightThumbVal, getPercent]);

    useEffect(() => {
        setSliderThumbValues([(values[0].getTime() - minDate.getTime())/milliSecondsPerDay,
            (values[1].getTime() - minDate.getTime())/milliSecondsPerDay]);
    }, [values[0], values[1]])

    const toDateSinceMinDate = (val: number) => {
        return new Date(minDate.getTime() + (val*milliSecondsPerDay));
    }

    const toDateString = (date: Date) => {
        return "" + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + (date.getDate());
    }

    return(
        <div className={"slider-container"}>
            <input className={"thumb thumb-left"} type={"range"} value={leftThumbVal} min={minPossibleValue} max={maxPossibleValue}
                   onChange={event => {
                       const value = Math.min(Number(event.target.value), rightThumbVal - 1);
                       setLeftThumbVal(value);
                       minValRef.current = value;
                   }}
                   onMouseUp={() => {
                       onMouseUp(true, toDateSinceMinDate(leftThumbVal));
                   }}

                   style={{ zIndex: (leftThumbVal > maxPossibleValue - 100 ? 5 : 3)}}
            />
            <input className={"thumb thumb-right"} type={"range"} value={rightThumbVal} min={minPossibleValue} max={maxPossibleValue}
                   onChange={event => {
                       const value = Math.max(Number(event.target.value), leftThumbVal + 1);
                       setRightThumbVal(value);
                       maxValRef.current = value;
                   }}
                   onMouseUp={() => {
                       onMouseUp(false, toDateSinceMinDate(rightThumbVal))
                   }}
            />
            <div className="slider">
                <div className="slider-track" />
                <div className="slider-range" ref={range} />
                <div className={"slider-left-value"}>{toDateString(toDateSinceMinDate(leftThumbVal))}</div>
                <div className={"slider-right-value"}>{toDateString(toDateSinceMinDate(rightThumbVal))}</div>
            </div>
        </div>
    )
}