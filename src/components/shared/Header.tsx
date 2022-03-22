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
  const [ languageDropdownActive, setLanguageDropdownActive ] = useState(false); 

  const getTabClass = (tabName: string) => {
    return tab.includes(tabName) ? 'nav__item--active col-auto h-100 flex center-item link' : 'nav__item col-auto h-100 flex center-item';
  }

  const handlePartnershipClick = () => setPartnershipDrownDownActive(!partnershipDrownDownActive)

  const handleLanguageClick = () => setLanguageDropdownActive(!languageDropdownActive)

  const usePageViews = () => {
    let location = useLocation();
    useEffect(() => {
      setTab(location.pathname)
    }, [location]);
  }

  const history = useHistory();

  const changeLanguages = (newLanguage: LanguageType) => {
    let url = history.location.pathname;
    url = url.replace(`/${state.language}/`, `/${newLanguage}/`)
    dispatch(
      {
        type: "SELECT_LANGUAGE",
        payload: newLanguage
      })

    history.push(url)
  }

  usePageViews()

  const AppTitle = () => {
    return (
    <div className="App-title col-auto py-3 px-0">
      <Link to={withLocaleUrl("Explore")} className="flex align-items-center">
        <img src={Img} width={23} height={23} alt="" />
        <div className="col-auto px-2 align-middle" >SeroTracker</div>
      </Link>
    </div>)
  }
  
  const mobileNav = (partnershipDrownDownActive: boolean, languageDropdownActive: boolean, handlePartnershipClick: any, handleLanguageClick: any, changeLanguages:any, language: any) => {
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
              onClick={handlePartnershipClick}
              className={'flex center-item py-0'}
            >
              {Translate("Partnerships")}
              <Icon name='dropdown' className={`ml-5 ${partnershipDrownDownActive ? 'dropdown__icon' : 'dropdown__icon--active'} `}/>
            </Accordion.Title>
            {renderPartnershipsAccordianContent(partnershipDrownDownActive)}
          </Accordion>
      </Dropdown.Item>
      <Dropdown.Item>
        <Accordion fluid>
        <Accordion.Title
              active={languageDropdownActive}
              index={0}
              onClick={handleLanguageClick}
              className={'flex py-0'}
            >
              {state.language.toUpperCase()}
              <Icon name='dropdown' style={{marginLeft: "107px"}}className={`${languageDropdownActive ? 'dropdown__icon' : 'dropdown__icon--active'} `}/>
              </Accordion.Title>
              { state.language !== LanguageType.english ?    
                 <Accordion.Content active={languageDropdownActive} onClick={() => {changeLanguages(LanguageType.english)}} className="ml-2">
                  { LanguageType.english.toUpperCase() }
                </Accordion.Content> : "" }
              {state.language !== LanguageType.french ?         
                <Accordion.Content active={languageDropdownActive}  onClick={() => {changeLanguages(LanguageType.french)}} className="ml-2">
                { LanguageType.french.toUpperCase() }
                </Accordion.Content> : ""}
              {state.language !== LanguageType.german ?       
                <Accordion.Content active={languageDropdownActive} onClick={() => {changeLanguages(LanguageType.german)}} className="ml-2">
                { LanguageType.german.toUpperCase() }
                </Accordion.Content> : ""}
        </Accordion>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>)
  }
  
  const desktopNav = ( getTabClass: any, changeLanguages:any, language: any) => {
    return (<div className={`App-tabs col-auto space-evenly p-0 subheading`}>
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
        {Translate('PublicationsHeader')}
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
    <div className={'col-auto h-100 px-0'}>
      |
    </div>
    <div className={"nav__item col-auto h-100 flex center-item cursor"} >
    <Dropdown text={language.toUpperCase()}>
        {renderLanguageDropDownMenu()}
      </Dropdown>
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
        <Dropdown.Item>
          <Link to={withLocaleUrl('Unity')}>{Translate("WhoUnity")}</Link>
        </Dropdown.Item>
    </Dropdown.Menu>)
  
  const renderLanguageDropDownMenu = () => (
    <Dropdown.Menu >
      {state.language !== LanguageType.english ?   
        <Dropdown.Item onClick={() => {changeLanguages(LanguageType.english)}}>
          { LanguageType.english.toUpperCase() }
        </Dropdown.Item> : ""}
     {state.language !== LanguageType.french ?        
        <Dropdown.Item onClick={() => {changeLanguages(LanguageType.french)}}>
        { LanguageType.french.toUpperCase() }
        </Dropdown.Item> : ""}
     {state.language !== LanguageType.german ?      
         <Dropdown.Item onClick={() => {changeLanguages(LanguageType.german)}}  >
        { LanguageType.german.toUpperCase() }
        </Dropdown.Item> : ""}
    </Dropdown.Menu>)
  
  const renderPartnershipsAccordianContent = (partnershipDrownDownActive: boolean) => (
      <Accordion.Content active={partnershipDrownDownActive} className="ml-2">
        {PartnershipsConfig.map( p => (
          <p>
            <Link to={withLocaleUrl(`Partnerships/${p.routeName}`)}>{Translate("PartnershipsList", [p.routeName])}</Link>
          </p>
        ))}
        <p>
          <Link to={withLocaleUrl('Unity')}>{Translate("WhoUnity")}</Link>
        </p>
      </Accordion.Content>)

  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
  return (
    <header className="App-header col-12 px-3">
      <AppTitle />
      { isMobileDeviceOrTablet ? mobileNav(partnershipDrownDownActive, languageDropdownActive, handlePartnershipClick, handleLanguageClick, changeLanguages, state.language) : desktopNav( getTabClass, changeLanguages, state.language) }
    </header >
  )
}
