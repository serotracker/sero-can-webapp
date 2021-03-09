import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import { AppContext } from "../../context";
import "./Legend.css";
import Translate from "../../utils/translate/translateService";
import { MapSymbology } from "components/map/MapConfig"

export default function Legend() {
  const [state, dispatch] = useContext(AppContext);
  const isMobileDeviceOrTablet = useMediaQuery({ maxWidth: mobileDeviceOrTabletWidth })
  const clickEstimatePinsCheckbox = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({ type: 'TOGGLE_ESTIMATE_PINS' })
  }

  return (
    <div className={isMobileDeviceOrTablet ? "info flex legend-mobile center-item" : "info flex legend center-item"}>
      <div className="flex legend-container" key={Math.random()}>
        <div className="legend-item cursor" onClick={clickEstimatePinsCheckbox}>
          <i className="block"><input className="checkbox" type="checkbox" checked={state.showEstimatePins} /></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("StudyPins")}</p>
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: MapSymbology.StudyFeature.National.Color }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("NationalStudies")}</p>
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: MapSymbology.StudyFeature.Regional.Color }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("RegionalStudies")}</p>
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: MapSymbology.StudyFeature.Local.Color }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("LocalStudies")}</p>
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: MapSymbology.CountryFeature.HasData.Color }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-2"}>{Translate("CountryEstimatesExist")}</p>
        </div>
      </div>
    </div>
  )
}
