import { Fragment } from "react"
import React from 'react'

interface SliderRailProps {
  getRailProps: Function
}

export function SliderRail({ getRailProps }: SliderRailProps) {
  return (
    <Fragment>
      <div className="outer-rail" {...getRailProps()} />
      <div className="inner-slider-rail" />
    </Fragment>
  )
}