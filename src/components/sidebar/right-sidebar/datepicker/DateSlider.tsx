import React, {useCallback, useEffect, useRef, useState} from 'react';
import './DateSlider.css';

interface DSprops {
    min: number; //minimum possible value for slider
    max: number; //maximum possible value for slider
    values: Date[];
    minDate: Date;
    onChange: Function;
}

export default function DateSlider(props: DSprops){

    const milliSecondsPerDay = 86400000;
    const {min, max, minDate} = props;
    const [sliderThumbValues, setSliderThumbValues] = useState<number[]>([(props.values[0].getTime() - minDate.getTime())/milliSecondsPerDay,
        (props.values[1].getTime() - minDate.getTime())/milliSecondsPerDay])
    const [leftThumbVal, setLeftThumbVal] = useState(sliderThumbValues[0]);
    const [rightThumbVal, setRightThumbVal] = useState(sliderThumbValues[1]);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);
    /*const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );*/

    const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100)

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
        setSliderThumbValues([(props.values[0].getTime() - minDate.getTime())/milliSecondsPerDay,
            (props.values[1].getTime() - minDate.getTime())/milliSecondsPerDay]);
    }, [props.values[0], props.values[1]])

    const toDateSinceMinDate = (val: number) => {
        return new Date(minDate.getTime() + (val*milliSecondsPerDay));
    }

    const toDateString = (date: Date) => {
        return "" + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + (date.getDate());
    }

    return(
        <div className={"slider-container"}>
            <input className={"thumb thumb-left"} type={"range"} value={leftThumbVal} min={min} max={max}
                   onChange={event => {
                       const value = Math.min(Number(event.target.value), rightThumbVal - 1);
                       setLeftThumbVal(value);
                       minValRef.current = value;
                   }}
                   onMouseUp={() => {
                       props.onChange(true, toDateSinceMinDate(leftThumbVal));
                   }}

                   style={{ zIndex: (leftThumbVal > max - 100 ? 5 : 3)}}
            />
            <input className={"thumb thumb-right"} type={"range"} value={rightThumbVal} min={min} max={max}
                   onChange={event => {
                       const value = Math.max(Number(event.target.value), leftThumbVal + 1);
                       setRightThumbVal(value);
                       maxValRef.current = value;
                   }}
                   onMouseUp={() => {
                       props.onChange(false, toDateSinceMinDate(rightThumbVal))
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