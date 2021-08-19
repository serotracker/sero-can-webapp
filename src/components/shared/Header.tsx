import React, { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Img from 'assets/images/SerotrackerLogo.svg'
import { mobileDeviceOrTabletWidth } from '../../constants'
import { AppContext } from '../../context'
import { LanguageType } from '../../types'
import Translate from '../../utils/translate/translateService'
import { withLocaleUrl } from '../../utils/utils'
import PartnershipsConfig from "PartnershipsConfig";
import { Dropdown, Accordion, Icon } from "semantic-ui-react";

export const Header = () => {
  const [tab, setTab] = useState("");
  const [state, dispatch] = useContext(AppContext);
  const [ partnershipDrownDownActive, setPartnershipDrownDownActive ] = useState(false);

  const getTabClass = (tabName: string) => {
    return tab.includes(tabName) ? 'nav__item--active col-auto h-100 flex center-item' : 'nav__item col-auto h-100 flex center-item';
  }

  const handleClick = () => setPartnershipDrownDownActive(!partnershipDrownDownActive)

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
    <header className="App-header col-12 px-3">
      <AppTitle />
      { isMobileDeviceOrTablet ? mobileNav(partnershipDrownDownActive, handleClick, changeLanguages, state.language) : desktopNav( getTabClass, changeLanguages, state.language) }
    </header >
  )
}

const AppTitle = () => {
  return (
  <div className="App-title col-auto py-3 px-0">
    <Link to={withLocaleUrl("Explore")} className="flex align-items-center">
      <img src={Img} width={23} height={23} alt="" />
      <div className="col-auto px-2 align-middle" >SeroTracker</div>
    </Link>
  </div>)
}

const mobileNav = (partnershipDrownDownActive: boolean, handleClick: any, changeLanguages:any, language: any) => {
  return (
  <Dropdown icon='bars' direction='left' simple>
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
      <Accordion fluid>
          <Accordion.Title
            active={partnershipDrownDownActive}
            index={0}
            onClick={handleClick}
            className={'flex center-item py-0'}
          >
            {Translate("Partnerships")}
            <Icon name='dropdown' className={`ml-5 ${partnershipDrownDownActive ? 'dropdown__icon' : 'dropdown__icon--active'} `}/>
          </Accordion.Title>
          {renderPartnershipsAccordianContent(partnershipDrownDownActive)}
        </Accordion>
    </Dropdown.Item>
    <Dropdown.Item>
      <div onClick={() => changeLanguages()}>
          {language === LanguageType.english ? "FR" : "EN" }
      </div>
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>)
}

const desktopNav = ( getTabClass: any, changeLanguages:any, language: any) => {
  return (<div className={`App-tabs col-auto space-evenly p-0`}>
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
  <div className={'nav__item col-auto h-100 flex center-item'}>
    <Dropdown text={Translate("Partnerships")}>
      {renderPartnershipsDropDownMenu()}
    </Dropdown>
  </div>
  <div className={'col-auto h-100 pl-4 pr-0'}>
    |
  </div>
  <div className={"nav__item col-auto h-100 flex center-item cursor"} onClick={() => changeLanguages()}>
    {language === LanguageType.english ? "FR" : "EN" }
  </div>
</div>)
}

const renderPartnershipsDropDownMenu = () => (
  <Dropdown.Menu>{
    PartnershipsConfig.map( p => (
      <Dropdown.Item>
        <Link to={withLocaleUrl(`Partnerships/${p.routeName}`)}>{Translate("PartnershipsList", [p.routeName])}</Link>
      </Dropdown.Item>
    ))}
  </Dropdown.Menu>)

const renderPartnershipsAccordianContent = (partnershipDrownDownActive: boolean) => (
    <Accordion.Content active={partnershipDrownDownActive} className="ml-2">
      {PartnershipsConfig.map( p => (
        <p>
          <Link to={withLocaleUrl(`Partnerships/${p.routeName}`)}>{Translate("PartnershipsList", [p.routeName])}</Link>
        </p>
      ))}
    </Accordion.Content>)