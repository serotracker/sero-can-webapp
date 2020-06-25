import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import { getColor } from "../../utils/mapUtils";
import Translate from "../../utils/translate/translateService";
import "./Legend.css";

interface LegendProps {
  buckets: number[]
}

export default function Legend(props: LegendProps) {
  const { buckets } = props;
  const isMobileDeviceOrTablet = useMediaQuery({ maxWidth: mobileDeviceOrTabletWidth })

  const labels = buckets.map((value, index) => {
    if (index !== buckets.length) {
      const from = value;
      const to = buckets[index + 1]
      // TODO: Check into passing in an array of colours instead of the getColor function
      return (
        <div className="bin flex" key={Math.random()}>
          <div className={isMobileDeviceOrTablet ? "col-12 mobile-text p-0" : "col-12 p-0"}>
            {isMobileDeviceOrTablet ? `${from}%${to ? '' : "+"}` : `${from}%${to ? `- ${to}%` : "+"}`}</div>
          <i className="col-12 p-0" style={{ background: getColor(from, buckets) }}></i>
        </div>
      )
    }
    return null;
  })
  
  return (
    <div className={isMobileDeviceOrTablet ? "info flex legend-mobile center-item" : "info flex legend center-item"}>
      {labels}
      <h4 className="legend-title p-0 middle">{Translate('Seroprevalence')}
        <span className="popup">
          <div className="popup-header">{Translate("SeroprevalenceScale")}</div>
          <div className="popup-content">{Translate("SeroprevalenceScaleTooltip")}</div>
        </span>
      </h4>
    </div>
  )
}
