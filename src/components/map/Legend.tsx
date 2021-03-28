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
    const layerName: string = e.currentTarget.id
    
    if (state.explore.legendLayers[layerName] === true)
    {

    }
    dispatch({
      type: 'SHOW_LEGEND_LAYER',
      payload: countriesJson
    });
  }

  return (
    <div className={isMobileDeviceOrTablet ? "info flex legend-mobile center-item" : "info flex legend center-item"}>
      <div className="flex legend-container" key={Math.random()}>
        <div className="legend-item" id="National" onClick={handleLegendToggle}>
          <i className="circleBase" style={{ background: MapSymbology.StudyFeature.National.Color }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-1"}>{Translate("NationalStudies")}</p>
          <input className="checkbox" type="checkbox" checked={state.explore.legendLayers.National} />
        </div>
        <div className="legend-item" id="Regional" onClick={handleLegendToggle}>
          <i className="circleBase" style={{ background: MapSymbology.StudyFeature.Regional.Color }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-1"}>{Translate("RegionalStudies")}</p>
          <input className="checkbox" type="checkbox" checked={state.explore.legendLayers.Regional} />
        </div>
        <div className="legend-item" id="Local" onClick={handleLegendToggle}>
          <i className="circleBase" style={{ background: MapSymbology.StudyFeature.Local.Color }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-1"}>{Translate("LocalStudies")}</p>
          <input className="checkbox" type="checkbox" checked={state.explore.legendLayers.Local} />
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: MapSymbology.CountryFeature.HasData.Color, outlineWidth: 1, outlineStyle: "solid" }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-1"}>{Translate("CountryEstimatesExist")}</p>
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: MapSymbology.CountryFeature.Default.Color, outlineWidth: 1, outlineStyle: "solid" }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-1"}>{Translate("CountryEstimatesNotExist")}</p>
        </div>
        <div className="legend-item">
          <i className="block" style={{ background: MapSymbology.CountryFeature.Disputed.Color, outlineWidth: 1, outlineStyle: "solid" }}></i>
          <p className={isMobileDeviceOrTablet ? "mobile-text px-2" : "px-1"}>{Translate("NotApplicable")}</p>
        </div>
      </div>
    </div>
  )
}
