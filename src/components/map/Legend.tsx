import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import { colors } from "../../utils/mapUtils";
import { AppContext } from "../../context";
import "./Legend.css";
import Translate from "../../utils/translate/translateService";

interface LegendProps {
  buckets: number[]
}

export default function Legend(props: LegendProps) {
  const [state, dispatch] = useContext(AppContext);
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

  const clickEstimatePinsCheckbox = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({ type: 'TOGGLE_ESTIMATE_PINS' })
    console.log(state.showEstimatePins)
  }

  return (
    <div className={isMobileDeviceOrTablet ? "info flex legend-mobile center-item" : "info flex legend center-item"}>
      <div className="flex center-item legend-container" key={Math.random()}>
        <i className="block"><input type="checkbox" checked={state.showEstimatePins} onClick={clickEstimatePinsCheckbox} /></i>
        <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>Estimate pins</p>
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
