import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import { getCarouselOfMedia, getCarouselOfResearchArticles, getCarouselOfReports } from "./InsightsCard";
import './styles.scss';
import Translate from "../../../utils/translate/translateService";

export default function Insights() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  return (
    <div className="col-12 page pb-6">
      <div className={isMobileDeviceOrTablet ? "pb-2 policy-container" : "policy-container static-content"}>
        <h1 className="col-12 p-0 fit">
          {Translate('Insights')}
        </h1>
        <h3 className="normal">
          {Translate('Research Articles')}
        </h3>
        { getCarouselOfResearchArticles() }
        <h3 className="normal">
          {Translate('Reports')}
        </h3>
        { getCarouselOfReports() }
        <h3 className="normal">
          {Translate('Media')}
        </h3>
        { getCarouselOfMedia() }
      </div>
    </div>
  )
}
