import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import './static.css';

export default function PrivacyPolicy() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  return (
    <div className="col-12 page fill">
      <div className={isMobileDeviceOrTablet ? "static-mobile" : "static-content"}>
        <iframe title="PrivacyPolicy" className="fill policy-iframe" src="https://app.termly.io/embed/terms-of-use/796fdf5d-ba75-4a21-9e54-4360f4fc9ccc"></iframe>
      </div>
    </div>
  )
}
