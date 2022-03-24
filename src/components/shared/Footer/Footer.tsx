import React, { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { Accordion, Icon } from 'semantic-ui-react'
import { mobileDeviceOrTabletWidth } from '../../../constants'
import Translate, {TranslateDate} from '../../../utils/translate/translateService'
import { AppContext } from "../../../context"
import { withLocaleUrl } from "../../../utils/utils";
import { PAGE_HASHES } from '../../../constants'
import WhoLogo from "components/shared/WhoLogo";
import HealthAgencyLogo from 'assets/images/public-health-agency.svg';
import UcalgaryLogo from 'assets/images/University-Of-Calgary-Logo.png';
import AmcJoule from 'assets/images/amc-joule.png';
import './Footer.scss';

type UpdatedAtProps = {
  updatedAt: string;
}

export const Footer = () => {
  const [{updatedAt}] = useContext(AppContext);

  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });

  return isMobileDeviceOrTablet ? renderMobileFooter(updatedAt) : renderDesktopFooter(updatedAt)
}

const renderDesktopFooter = (updatedAt: string) => (
  <footer className={'container-fluid mx-0 footer'}>
      <div className="footer__visible-section row justify-content-between d-flex align-items-center text-center">
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
          <div className="footer__sponsers-pill my-2">
            <Sponsers/>
          </div>
          <WhoDisclaimer/>
        </div>
      </div>
      <div className="row justify-content-center py-5 text-center">
          <Link className="footer__link px-1" to={withLocaleUrl("PrivacyPolicy")}>{Translate('PrivacyPolicy')}</Link>
        |
          <Link className="footer__link px-1" to={withLocaleUrl("CookiePolicy")}>{Translate('CookiePolicy')}</Link>
        |
          <Link className="footer__link px-1" to={withLocaleUrl("TermsOfUse")}>{Translate('TermsOfUse')}</Link>
      </div>
    </footer>
)

const renderMobileFooter = (updatedAt: string) => (
  <footer className={'container-fluid mx-0 footer'}>
      <div className="row justify-content-center mt-5">
        <div className="col-10 ">
          <MobilePageLinks />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-8">
          <div className="footer__sponsers-pill row">
            <Sponsers/>
          </div>
          <WhoDisclaimer/>
        </div>
      </div>
      <div className="row justify-content-center mt-5 pb-5 text-center">
        <div>
          <Link className="footer__link px-1" to={withLocaleUrl("PrivacyPolicy")}>{Translate('PrivacyPolicy')}</Link>
        </div>
        |
        <div>
          <Link className="footer__link px-1" to={withLocaleUrl("CookiePolicy")}>{Translate('CookiePolicy')}</Link>
        </div>
        |
        <div>
          <Link className="footer__link px-1" to={withLocaleUrl("TermsOfUse")}>{Translate('TermsOfUse')}</Link>
        </div>
      </div>
    </footer>
)


const UpdatedAt = ({updatedAt}: UpdatedAtProps) => {
  // only renders 'last updated' when we have a valid date
  return updatedAt ? (
  <span className='pr-2'>
    {Translate("Footer", ["LastUpdated"])}: <b className='updated-at-bold'>{TranslateDate(updatedAt)}</b>
  </span>
  ): null
}

const WhoDisclaimer = () => (
  <small className="whoDisclaimer">
    {Translate('WhoSerotrackAndPartnersDisclaimerSmall')}
  </small>
)

export const Sponsers = () => (
  <div className="d-flex justify-content-around row">
    <a href="https://www.covid19immunitytaskforce.ca/" target="__blank" rel="noopener noreferrer" className="footer__image-wrapper col-lg-auto justify-content-center">
      <img src="https://www.covid19immunitytaskforce.ca/wp-content/themes/pena-lite-child/CITF_logo_ENG.svg" className="footer__image d-flex" alt="COVID-19 Immunity Task Force Logo"></img>
    </a>
    <a href="https://cumming.ucalgary.ca/centres/centre-health-informatics" target="__blank" rel="noopener noreferrer" className="footer__image-wrapper col-lg-auto justify-content-center">
      <img src={UcalgaryLogo} className="footer__image d-flex" alt="Centre for Health Informatics"></img>
    </a>
    <a href="https://www.canada.ca/en/public-health.html/" target="__blank" rel="noopener noreferrer" className="footer__image-wrapper col-lg-auto justify-content-center">
      <img src={HealthAgencyLogo} className="footer__image d-flex" alt="Public Health Agency Logo"></img>
    </a>
    <a href="https://www.who.int/" target="__blank" rel="noopener noreferrer" className="footer__image-wrapper col-lg-auto justify-content-center">
      <WhoLogo className="footer__image d-flex" />
    </a>
    <a href="https://joulecma.ca/" target="__blank" rel="noopener noreferrer" className="footer__image-wrapper col-lg-auto justify-content-center">
      <img src={AmcJoule} className="footer__image d-flex" alt="CMA Joule"></img>
    </a>
  </div>
)

const PageLinks = () => (
  <React.Fragment>
    {
      Object.keys(PAGE_HASHES).map((page) => {
        return(
        <div className="col mx-2">
          <p className="row subheading">{Translate(page)}</p>
          {
          Object.keys(PAGE_HASHES[page]).map(h => (
          <HashLink to={`${withLocaleUrl(page)}#${h}`} className="row mt-3 footer__link">
            {Translate(h)}
          </HashLink>))
          }
        </div>)})
    }
  </React.Fragment>)

const MobilePageLinks = () => {
  const [activeIndex, setIndex] = useState(0);

  return (<Accordion fluid styled className='footer-accordion'>
    {
      Object.keys(PAGE_HASHES).map((page, i) => {
        return(
          <>
          <Accordion.Title
            className='footer accordion__title footer__link'
            active={activeIndex === i}
            index={i}
            onClick={
              ()=>setIndex(i)
            }
          >
            <Icon name='dropdown' />
            {Translate(page)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === i}>
            {
            Object.keys(PAGE_HASHES[page]).map(h => (
              <HashLink to={`${withLocaleUrl(page)}#${h}`} className="row mt-3 footer__link">
                {Translate(h)}
              </HashLink>))
            }
          </Accordion.Content>
          </>)})
    }
  </Accordion>)
  }