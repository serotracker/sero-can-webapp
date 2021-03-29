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
  const handleLegendToggle = (e: React.MouseEvent<HTMLElement>) => {
    const layerName: string = e.currentTarget.id;
    switch (layerName) {
      case "National": {
        return dispatch({ type: "TOGGLE_NATIONAL_PIN_LAYER" });
      }
      case "Regional": {
        return dispatch({ type: "TOGGLE_REGIONAL_PIN_LAYER" });
      }
      case "Local": {
        return dispatch({ type: "TOGGLE_LOCAL_PIN_LAYER" });
      }
    }
  };

  return (
    <div className={isMobileDeviceOrTablet ? "info flex legend-mobile center-item" : "info flex legend center-item"}>
      <div className="flex legend-container" key={Math.random()}>
        <div className="legend-item" id="National" onClick={handleLegendToggle}>
          <i className="circleBase" style={{ background: MapSymbology.StudyFeature.National.Color }}></i>
          <p>{Translate("NationalStudies")}</p>
          <input className="checkbox" type="checkbox" checked={state.explore.legendLayers.National} readOnly/>
        </div>
        <div className="legend-item" id="Regional" onClick={handleLegendToggle}>
          <i className="circleBase" style={{ background: MapSymbology.StudyFeature.Regional.Color }}></i>
          <p>{Translate("RegionalStudies")}</p>
          <input className="checkbox" type="checkbox" checked={state.explore.legendLayers.Regional} readOnly/>
        </div>
        <div className="legend-item" id="Local" onClick={handleLegendToggle}>
          <i className="circleBase" style={{ background: MapSymbology.StudyFeature.Local.Color }}></i>
          <p>{Translate("LocalStudies")}</p>
          <input className="checkbox" type="checkbox" checked={state.explore.legendLayers.Local} readOnly/>
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: MapSymbology.CountryFeature.HasData.Color, outlineWidth: 1, outlineStyle: "solid" }}></i>
          <p>{Translate("CountryEstimatesExist")}</p>
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: MapSymbology.CountryFeature.Default.Color, outlineWidth: 1, outlineStyle: "solid" }}></i>
          <p>{Translate("CountryEstimatesNotExist")}</p>
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: MapSymbology.CountryFeature.Disputed.Color, outlineWidth: 1, outlineStyle: "solid" }}></i>
          <p>{Translate("NotApplicable")}</p>
        </div>
      </div>
    </div>
  )
}
