import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import './static.css';

export default function TermsOfUse() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  return (
    <div className="col-12 page fill terms pb-2">
      <div className={isMobileDeviceOrTablet ? "static-mobile" : "static-content"}>
        <h1 className="col-12 p-0">
          {Translate('TermsOfUse')}
        </h1>
        <div className="col-12 p-0">
          <p>{Translate('WhoSerotrackAndPartnersDisclaimer1')}</p>
          <p>{Translate('WhoSerotrackAndPartnersDisclaimer2')}</p>
          <p>{Translate('WhoSerotrackAndPartnersDisclaimer3')}</p>
        </div>

        <h3 className="col-12 p-0">
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
