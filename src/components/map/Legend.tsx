import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import { colors } from "../../utils/mapUtils";
import "./Legend.css";
import Translate from "../../utils/translate/translateService";

import NationalPinIcon from "../../assets/icons/national_pin.png";
import RegionalPinIcon from "../../assets/icons/regional_pin.png";
import LocalPinIcon from "../../assets/icons/local_pin.png";

interface LegendProps {
  buckets: number[]
}

export default function Legend(props: LegendProps) {
  const isMobileDeviceOrTablet = useMediaQuery({ maxWidth: mobileDeviceOrTabletWidth })

  // const labels = buckets.map((value, index) => {
  //   if (index !== buckets.length) {
  //     const from = value;
  //     const to = buckets[index + 1]
  //     // TODO: Check into passing in an array of colours instead of the getColor function
  //     return (
  //       <div className="bin flex" key={Math.random()}>
  //         <div className={isMobileDeviceOrTablet ? "col-12 mobile-text p-0" : "col-12 p-0"}>
  //           {isMobileDeviceOrTablet ? `${from}%${to ? '' : "+"}` : `${from}%${to ? `- ${to}%` : "+"}`}</div>
  //         <i className="col-12 p-0" style={{ background: getColor(from, buckets) }}></i>
  //       </div>
  //     )
  //   }
  //   return null;
  // })

  return (
    <div className={isMobileDeviceOrTablet ? "info flex legend-mobile center-item" : "info flex legend center-item"}>
      <div className="flex center-item legend-container" key={Math.random()}>
        <i className="block"><img src={NationalPinIcon} style={{ width: "14px", height: "20px"}}/></i>
        <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("NationalEstimates")}</p>
        <i className="block"><img src={RegionalPinIcon} style={{ width: "14px", height: "20px"}}/></i>
        <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("RegionalEstimates")}</p>
        <i className="block"><img src={LocalPinIcon} style={{ width: "14px", height: "20px"}}/></i>
        <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("LocalEstimates")}</p>
        <i className="block" style={{ background: colors[6] }}></i>
        <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("CountryEstimatesExist")}</p>
      </div>
      {/* {labels} */}
      {/* <h4 className="legend-title p-0 middle">{Translate('Seroprevalence')}
        <span className="popup">
          <div className="popup-header">{Translate("SeroprevalenceScale")}</div>
          <div className="popup-content">{Translate("SeroprevalenceScaleTooltip")}</div>
        </span>
      </h4> */}
    </div>
  )
}
