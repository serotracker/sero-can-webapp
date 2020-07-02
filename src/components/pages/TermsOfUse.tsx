import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import './static.css';

export default function TermsOfUse() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  return (
    <div className="col-12 page">
      <div className={isMobileDeviceOrTablet ? "pb-2 policy-container flex fill" : "policy-container static-content pb-2 flex fill"}>
        <h1 className="col-12 p-0 fit">
          {Translate('TermsOfUse')}
        </h1>
          <iframe className="fill policy-iframe" src="https://app.termly.io/embed/terms-of-use/db4ccd70-751b-4003-a1a3-cb6eac7b76e1" title="TermsAndConditions"></iframe>
      </div>
    </div>
  )
}
