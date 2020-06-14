import React, { Fragment } from "react"

interface HandleProps {
  domain: number[];
  handle: {
    id: string;
    value: number;
    percent: number;
  },
  disabled: boolean;
  getHandleProps: Function
}


export function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}: HandleProps) {
  return (
    <Fragment>
      <div
        className="handle"
        style={{
          left: `${percent}%`,
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        className="handle-slider"
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
        }}
      />
    </Fragment>
  )
}

export function KeyboardHandle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}: HandleProps) {
  return (
    <button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        left: `${percent}%`,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        width: 24,
        height: 24,
        borderRadius: '50%',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
        backgroundColor: disabled ? '#666' : '#ffc400',
      }}
      {...getHandleProps(id)}
    />
  )
}