import { faFileAlt, faGlobeAmericas, faUsers, faTable, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, useHistory, useLocation } from 'react-router-dom'
import MultiColorIcon from '../../assets/images/colored-icon.svg'
import { mobileDeviceOrTabletWidth } from '../../constants'
import Translate from '../../utils/translate/translateService'
import { AppContext } from "../../context"
import { withLocaleUrl } from "../../utils/utils";

export const Footer = () => {
  const [{updatedAt}] = useContext(AppContext);

  const getTabClass = (tabName: string) => {
    return 'regular col-auto h-100 flex center-item';
  }

  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  return (
    <header className="App-footer col-12 px-sm-2">
        <div className="App-footer-row">
            <div>{`${Translate("DatabaseUptoDateTo")}: ${updatedAt}`}</div>
        </div>
        <div className="App-footer-row">
            <Link className="p-1 footer-link" to={withLocaleUrl("PrivacyPolicy")}>{Translate('PrivacyPolicy')}</Link> |
            <Link className="p-1 footer-link" to={withLocaleUrl("CookiePolicy")}>{Translate('CookiePolicy')}</Link> |
            <Link className="p-1 footer-link" to={withLocaleUrl("TermsOfUse")}>{Translate('TermsOfUse')}</Link>
        </div>
    </header>
  )
}