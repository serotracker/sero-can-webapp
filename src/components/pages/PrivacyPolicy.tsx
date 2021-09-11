import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import './static.css';

export default function PrivacyPolicy() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  return (
    <div className={isMobileDeviceOrTablet ? "policy-div-mobile" : "policy-div-desktop"}>
        <iframe title="PrivacyPolicy" className={isMobileDeviceOrTablet ? "policy-frame-mobile" : "policy-frame-desktop"} src="https://app.termly.io/embed/terms-of-use/796fdf5d-ba75-4a21-9e54-4360f4fc9ccc"></iframe>
    </div>
  )
}
