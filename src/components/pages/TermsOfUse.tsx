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
        <h1 className="col-12 pb-2">
          {Translate('TermsOfUse')}
        </h1>
        <div className="col-12 pb-3">
          <p className={"p-2"}>{Translate('WhoSerotrackAndPartnersDisclaimer1')}</p>
          <p className={"p-2"}>{Translate('WhoSerotrackAndPartnersDisclaimer2')}</p>
          <p className={"p-2"}>{Translate('WhoSerotrackAndPartnersDisclaimer3')}</p>
        </div>

        <h3 className="col-12 p-2">
          {Translate('DisclaimerListHeader')}
        </h3>
        <ol>
          <li className={"p-2"}>
            {Translate('DisclaimerList1')}
          </li>
          <li className={"p-2"}>
            {Translate('DisclaimerList2')}
          </li>
          <li className={"p-2"}>
            {Translate('DisclaimerList3')}
          </li>
          <li className={"p-2"}>
            {Translate('DisclaimerList4')}
          </li>
          <li className={"p-2"}>
            {Translate('DisclaimerList5')}
          </li>
          <li className={"p-2"}>
            {Translate('DisclaimerList6')}
          </li>
        </ol>
        <div className={"pb-2"}>
          {Translate('DisclaimerFooter')}
        </div>
      </div>
    </div>
  )
}
