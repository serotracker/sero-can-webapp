import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import { colors } from "../../utils/mapUtils";
import { AppContext } from "../../context";
import "./Legend.css";
import Translate from "../../utils/translate/translateService";

import NationalPinIcon from "../../assets/icons/national_pin.png";
import RegionalPinIcon from "../../assets/icons/regional_pin.png";
import LocalPinIcon from "../../assets/icons/local_pin.png";

interface LegendProps {
  buckets: number[]
}

export default function Legend(props: LegendProps) {
  const [state, dispatch] = useContext(AppContext);
  const isMobileDeviceOrTablet = useMediaQuery({ maxWidth: mobileDeviceOrTabletWidth })
  const clickEstimatePinsCheckbox = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({ type: 'TOGGLE_ESTIMATE_PINS' })
  }

  return (
    <div className={isMobileDeviceOrTablet ? "info flex legend-mobile center-item" : "info flex legend center-item"}>
      <div className="flex legend-container" key={Math.random()}>
        <div className="legend-item cursor" onClick={clickEstimatePinsCheckbox}>
          <i className="block"><input type="checkbox" checked={state.showEstimatePins} /></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("StudyPins")}</p>
        </div>
        <div className="legend-item">
          <i className="block"><img src={NationalPinIcon} alt="national pin icon" style={{ width: "14px", height: "20px"}}/></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("NationalStudies")}</p>
        </div>
        <div className="legend-item">
          <i className="block"><img src={RegionalPinIcon} alt="regional pin icon" style={{ width: "14px", height: "20px"}}/></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("RegionalStudies")}</p>
        </div>
        <div className="legend-item">
          <i className="block"><img src={LocalPinIcon} alt="local pin icon" style={{ width: "14px", height: "20px"}}/></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("LocalStudies")}</p>
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: colors[6] }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("CountryEstimatesExist")}</p>
        </div>
      </div>
    </div>
  )
}
