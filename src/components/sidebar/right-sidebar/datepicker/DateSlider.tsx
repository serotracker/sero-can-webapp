import React, {useCallback, useEffect, useRef, useState} from 'react';
import './DateSlider.css';

interface DSprops {
    min: number;
    max: number;
    values: Date[];
    minDate: Date;
    onChange: Function;
}

export default function DateSlider(props: DSprops){

    const {min, max, minDate} = props;
    const [values, setValues] = useState<number[]>([(props.values[0].getTime() - minDate.getTime())/86400000,
        (props.values[1].getTime() - minDate.getTime())/86400000])
    const [minVal, setMinVal] = useState(values[0]);
    const [maxVal, setMaxVal] = useState(values[1]);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
      setMinVal(values[0]);
      setMaxVal(values[1]);
    }, [values])

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxVal);
        console.log(minPercent, maxPercent);
        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxVal);
        console.log(minPercent, maxPercent);
        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        setValues([(props.values[0].getTime() - minDate.getTime())/86400000,
            (props.values[1].getTime() - minDate.getTime())/86400000]);
    }, [props.values[0], props.values[1]])

    const toDateSinceMinDate = (val: number) => {
        return new Date(minDate.getTime() + (val*86400000));
    }

    const toDateString = (date: Date) => {
        return "" + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + (date.getDate());
    }

    return(
        <div className={"slider-container"}>
            <input className={"thumb thumb-left"} type={"range"} value={minVal} min={min} max={max}
                   onChange={event => {
                       const value = Math.min(Number(event.target.value), maxVal - 1);
                       setMinVal(value);
                       minValRef.current = value;
                   }}
                   onMouseUp={() => {
                       props.onChange(true, toDateSinceMinDate(minVal));
                   }}

                   style={{ zIndex: (minVal > max - 100 ? 5 : 3)}}
            />
            <input className={"thumb thumb-right"} type={"range"} value={maxVal} min={min} max={max}
                   onChange={event => {
                       const value = Math.max(Number(event.target.value), minVal + 1);
                       setMaxVal(value);
                       maxValRef.current = value;
                   }}
                   onMouseUp={() => {
                       props.onChange(false, toDateSinceMinDate(maxVal))
                   }}
            />
            <div className="slider">
                <div className="slider-track" />
                <div className="slider-range" ref={range} />
                <div className={"slider-left-value"}>{toDateString(toDateSinceMinDate(minVal))}</div>
                <div className={"slider-right-value"}>{toDateString(toDateSinceMinDate(maxVal))}</div>
            </div>
        </div>
    )
}