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
        <div className="col-12 p-0 fit">
          {Translate('DisclaimerBody')}
        </div>

        <h3 className="col-12 p-0 fit">
          {Translate('DisclaimerListHeader')}
        </h3>
        <ol>
          <li>
            {Translate('DisclaimerList1')}
          </li>
          <li>
            {Translate('DisclaimerList2')}
          </li>
          <li>
            {Translate('DisclaimerList3')}
          </li>
          <li>
            {Translate('DisclaimerList4')}
          </li>
          <li>
            {Translate('DisclaimerList5')}
          </li>
          <li>
            {Translate('DisclaimerList6')}
          </li>
        </ol>
        <div>
          {Translate('DisclaimerFooter')}
        </div>
      </div>
    </div>
  )
}
