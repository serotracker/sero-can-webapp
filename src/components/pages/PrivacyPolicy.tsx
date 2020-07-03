import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import './static.css';

export default function PrivacyPolicy() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  return (
    <div className="col-12 page ">
      <div className={isMobileDeviceOrTablet ? "pb-2 policy-container flex fill" : "policy-container static-content pb-2 flex fill"}>
        <h1 className="col-12 p-0 fit">
          {Translate('PrivacyPolicy')}
        </h1>
        <iframe title="PrivacyPolicy" className="fill policy-iframe" src="https://app.termly.io/embed/terms-of-use/796fdf5d-ba75-4a21-9e54-4360f4fc9ccc"></iframe>
      </div>
    </div>
  )
}
