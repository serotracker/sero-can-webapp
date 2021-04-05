import React, { useContext, } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { mobileDeviceOrTabletWidth } from '../../constants'
import Translate from '../../utils/translate/translateService'
import { AppContext } from "../../context"
import { withLocaleUrl } from "../../utils/utils";

export const Footer = () => {
  const [{updatedAt}] = useContext(AppContext);

  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });

  const lancetId = "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20"

  return (
    <header className={isMobileDeviceOrTablet ? "App-footer-mob col-12 px-2" : "App-footer col-12 px-2"}>
        <div className={isMobileDeviceOrTablet ? "App-footer-item middle-item px-2 py-1" : "App-footer-item left-item px-2"}>
            <div>
              <span>{Translate("Footer", ["LastUpdated"])}: </span>
              <span className="updated-date-string">{updatedAt}</span>
            </div>
        </div>
        <div className={isMobileDeviceOrTablet ? "App-footer-item middle-item px-2 py-1" : "App-footer-item left-item px-2"}>
            <Link className="p-1 footer-link" to={withLocaleUrl("PrivacyPolicy")}>{Translate('PrivacyPolicy')}</Link>  |
            <Link className="p-1 footer-link" to={withLocaleUrl("CookiePolicy")}>{Translate('CookiePolicy')}</Link>  |
            <Link className="p-1 footer-link" to={withLocaleUrl("TermsOfUse")}>{Translate('TermsOfUse')}</Link>
        </div>
        <div className={isMobileDeviceOrTablet ? "App-footer-item middle-item px-2 py-1" : "App-footer-item right-item px-2"}>
            <div>
              <span>{Translate("Footer", ["CiteAs"])}</span> 
              <a href={lancetId} target="__blank" rel="noopener noreferrer" className="cite-link">
                <span className="italics">{Translate("Footer", ["LancetInfDis"])}</span> {Translate("Footer", ["Article"])}
              </a> 
            </div>
        </div>
    </header>
  )
}