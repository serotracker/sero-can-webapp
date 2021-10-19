import React, { useContext, } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { mobileDeviceOrTabletWidth } from '../../constants'
import Translate from '../../utils/translate/translateService'
import { AppContext } from "../../context"
import { withLocaleUrl } from "../../utils/utils";
import { NumberDateToWordDate } from '../../utils/utils'
import { PAGE_HASHES } from '../../constants'
import WhoLogo from "components/shared/WhoLogo";
import HealthAgencyLogo from 'assets/images/public-health-agency.svg';
import UcalgaryLogo from 'assets/images/University-Of-Calgary-Logo.png';
import AmcJoule from 'assets/images/amc-joule.png';

const lancetId = "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20"

type UpdatedAtProps = {
  updatedAt: string;
}

export const Footer = () => {
  const [{updatedAt}] = useContext(AppContext);

  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });

  return isMobileDeviceOrTablet ? renderMobileFooter(updatedAt) : renderDesktopFooter(updatedAt)
}

const renderDesktopFooter = (updatedAt: string) => (
  <footer className={'container-fluid mx-0'}>
      <div className="footer-visible-section row justify-content-between d-flex align-items-center text-center">
        <div className="col-2">
          <UpdatedAt updatedAt={updatedAt}/>
        </div>
        <div className="col-2">
            <Citation/>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-8">
          <div className="row">
            <PageLinks/>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-8">
          <div className="sponsers-pill my-2">
            <Sponsers/>
          </div>
          <WhoDisclaimer/>
        </div>
      </div>
      <div className="row justify-content-center py-5 text-center">
          <Link className="px-1" to={withLocaleUrl("PrivacyPolicy")}>{Translate('PrivacyPolicy')}</Link>
        |
          <Link className="px-1" to={withLocaleUrl("CookiePolicy")}>{Translate('CookiePolicy')}</Link>
        |
          <Link className="px-1" to={withLocaleUrl("TermsOfUse")}>{Translate('TermsOfUse')}</Link>
      </div>
    </footer>
)

const renderMobileFooter = (updatedAt: string) => (
  <footer className={'container-fluid mx-0'}>
      <div className="footer-visible-section row justify-content-around d-flex align-items-center text-center">
          <UpdatedAt updatedAt={updatedAt}/>
          <Citation/>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-8">
          <div className="row sponsers-pill">
            <Sponsers/>
          </div>
          <WhoDisclaimer/>
        </div>
      </div>
      <div className="row justify-content-center mt-5 pb-5 text-center">
        <div>
          <Link className="px-1" to={withLocaleUrl("PrivacyPolicy")}>{Translate('PrivacyPolicy')}</Link>
        </div>
        |
        <div>
          <Link className="px-1" to={withLocaleUrl("CookiePolicy")}>{Translate('CookiePolicy')}</Link>
        </div>
        |
        <div>
          <Link className="px-1" to={withLocaleUrl("TermsOfUse")}>{Translate('TermsOfUse')}</Link>
        </div>
      </div>
    </footer>
)

const renderUpdateDate = (updatedAt: string) => {
  return NumberDateToWordDate(updatedAt)
}

const UpdatedAt = ({updatedAt}: UpdatedAtProps) => {
  // only renders 'last updated' when we have a valid date
  return updatedAt ? (
  <span>
    {Translate("Footer", ["LastUpdated"])}: <b className='updated-at-bold'>{renderUpdateDate(updatedAt)}</b>
  </span>
  ): null
}

const Citation = () => (
  <span className="text-right">
    {Translate("Footer", ["CiteAs"])}
    <a href={lancetId} target="__blank" rel="noopener noreferrer" className="cite-link">
      <i>{Translate("Footer", ["LancetInfDis"])}</i> {Translate("Footer", ["Article"])}
    </a> 
  </span>
)

const WhoDisclaimer = () => (
  <small className="whoDisclaimer">
    {Translate('WhoSerotrackAndPartnersDisclaimerSmall')}
  </small>
)
// to={withLocaleUrl(`${page}`)}
export const Sponsers = () => (
  <div className="d-flex justify-content-around">
    <a href="https://www.covid19immunitytaskforce.ca/" target="__blank" rel="noopener noreferrer" className="footer-link">
      <img src="https://www.covid19immunitytaskforce.ca/wp-content/themes/pena-lite-child/CITF_logo_ENG.svg" className="footer-image" alt="COVID-19 Immunity Task Force Logo"></img>
    </a>
    <a href="https://cumming.ucalgary.ca/centres/centre-health-informatics" target="__blank" rel="noopener noreferrer" className="footer-link">
      <img src={UcalgaryLogo} className="footer-image" alt="Centre for Health Informatics"></img>
    </a>
    <a href="https://www.canada.ca/en/public-health.html/" target="__blank" rel="noopener noreferrer" className="footer-link">
      <img src={HealthAgencyLogo} className="footer-image" alt="Public Health Agency Logo"></img>
    </a>
    <a href="https://www.who.int/" target="__blank" rel="noopener noreferrer" className="footer-link">
      <WhoLogo className="footer-image" />
    </a>
    <a href="https://joulecma.ca/" target="__blank" rel="noopener noreferrer" className="footer-link">
      <img src={AmcJoule} className="footer-image" alt="CMA Joule"></img>
    </a>
  </div>
)

const PageLinks = () => (
  <React.Fragment>
    {
      Object.keys(PAGE_HASHES).map((page) => {
        return(
        <div className="col mx-2">
          <h3 className="row">{Translate(page)}</h3>
          {
          Object.keys(PAGE_HASHES[page]).map(h => (
          <HashLink to={`${withLocaleUrl(page)}#${h}`} className="row mt-3">
            {Translate(h)}
          </HashLink>))
          }
        </div>)})
    }
  </React.Fragment>)