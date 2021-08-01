import React, { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, useHistory, useLocation } from 'react-router-dom'
import MultiColorIcon from '../../assets/images/colored-icon.svg'
import { mobileDeviceOrTabletWidth } from '../../constants'
import { AppContext } from '../../context'
import { LanguageType } from '../../types'
import Translate from '../../utils/translate/translateService'
import { withLocaleUrl } from '../../utils/utils'
import PartnershipsDropDown from './PartnershipsDropDown'
import { Dropdown } from "semantic-ui-react";

export const NavBar = () => {
  const [tab, setTab] = useState("");
  const [state, dispatch] = useContext(AppContext);

  const getTabClass = (tabName: string) => {
    return tab.includes(tabName) ? 'nav__item--active col-auto h-100 flex center-item' : 'nav__item col-auto h-100 flex center-item';
  }

  const usePageViews = () => {
    let location = useLocation();
    useEffect(() => {
      setTab(location.pathname)
    }, [location]);
  }

  const history = useHistory();

  const changeLanguages = () => {
    let url = history.location.pathname;
    if (state.language === LanguageType.english) {
      url = url.replace("/en/", "/fr/")
    }
    else {
      url = url.replace("/fr/", "/en/")
    }
    dispatch(
      {
        type: "SELECT_LANGUAGE",
        payload: state.language === LanguageType.english ? LanguageType.french : LanguageType.english
      })

    history.push(url)
  }

  usePageViews()
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
  return (
    <header className="App-header col-12 px-sm-2">
      <div className="App-title col-auto py-3 px-0 flex left">
        <Link to={withLocaleUrl("Explore")} className="flex">
          <img src={MultiColorIcon} width={23} height={23} alt="" />
          <div className="col-auto px-2" >SeroTracker</div>
        </Link>
      </div>
      { isMobileDeviceOrTablet ? mobileNav() : desktopNav(isMobileDeviceOrTablet,getTabClass, changeLanguages, state.language) }
    </header >
  )
}

const mobileNav = () => {
  return (<Dropdown icon='bars' direction='left'>
  <Dropdown.Menu>
    <Dropdown.Item>
      <Link to={withLocaleUrl("Explore")}>
          {Translate('Explore')}
      </Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to={withLocaleUrl("Analyze")}>
        {Translate('Analyze')}
      </Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to={withLocaleUrl("Data")}>
        {Translate('Data')}
      </Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to={withLocaleUrl("Publications")}>
        {Translate('Publications')}
      </Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to={withLocaleUrl("About")}>
        {Translate('About')}
      </Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <PartnershipsDropDown />
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>)
}

const desktopNav = (isMobileDeviceOrTablet: boolean, getTabClass: any, changeLanguages:any, language: any) => {
  return (<div className={`App-tabs col-auto space-evenly p-0 ${isMobileDeviceOrTablet ? 'fill' : ''}`}>
  <div className={getTabClass('/Explore')}>
    <Link to={withLocaleUrl("Explore")}>
      {Translate('Explore')}
    </Link>
  </div>
  <div className={getTabClass('/Analyze')}>
    <Link to={withLocaleUrl("Analyze")}>
      {Translate('Analyze')}
    </Link>
  </div>
  <div className={getTabClass('/Data')}>
    <Link to={withLocaleUrl("Data")}>
      {Translate('Data')}
    </Link>
  </div>
  <div className={getTabClass('/Publications')}>
    <Link to={withLocaleUrl("Publications")}>
      {Translate('Publications')}
    </Link>
  </div>
  <div className={getTabClass('/About')}>
    <Link to={withLocaleUrl("About")}>
      {Translate('About')}
    </Link>
  </div>
  <div className={getTabClass('/Partnerships')}>
    <PartnershipsDropDown />
  </div>
  <div className={getTabClass('/Language') + " cursor"} onClick={() => changeLanguages()}>
    <div>
      {language === LanguageType.english ?
        (isMobileDeviceOrTablet ? "Fr" : "Français") :
        (isMobileDeviceOrTablet ? "En" : "English")}
    </div>
  </div>
</div>)
}