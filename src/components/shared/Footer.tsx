import React, { useContext, } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { Divider } from 'semantic-ui-react'
import { mobileDeviceOrTabletWidth } from '../../constants'
import Translate from '../../utils/translate/translateService'
import { AppContext } from "../../context"
import { withLocaleUrl } from "../../utils/utils";
import { NumberDateToWordDate } from '../../utils/utils'
import { PAGE_HASHES } from '../../constants'
import WhoLogo from "components/shared/WhoLogo";
import HealthAgencyLogo from 'assets/images/public-health-agency.png';
import UcalgaryLogo from 'assets/images/University-Of-Calgary-Logo.png';

const lancetId = "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20"

export const Footer = () => {
  const [{updatedAt}] = useContext(AppContext);

  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });

  return (
    <footer className={'container-fluid mx-0'}>
      <div className="row justify-content-between a-f__visible d-flex align-items-center text-center">
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
          <div className="row sponsers-pill d-flex align-items-center">
            <Sponsers/>
          </div>
          <WhoDisclaimer/>
        </div>
      </div>
      <div className="row justify-content-center mt-5 pb-5 text-center">
        <div className="col-1">
          <Link className="px-1" to={withLocaleUrl("PrivacyPolicy")}>{Translate('PrivacyPolicy')}</Link>
        </div>
        |
        <div className="col-1">
          <Link className="px-1" to={withLocaleUrl("CookiePolicy")}>{Translate('CookiePolicy')}</Link>
        </div>
        |
        <div className="col-1">
          <Link className="px-1" to={withLocaleUrl("TermsOfUse")}>{Translate('TermsOfUse')}</Link>
        </div>
      </div>
    </footer>
  )
}

const renderUpdateDate = (updatedAt: string) => {
  return NumberDateToWordDate(updatedAt)
}

type UpdatedAtProps = {
  updatedAt: string;
}

const UpdatedAt = ({updatedAt}: UpdatedAtProps) => {
  // only renders 'last updated' when we have a valid date
  return updatedAt ? (
  <span className='footer-small-text'>
    {Translate("Footer", ["LastUpdated"])}: <b>{renderUpdateDate(updatedAt)}</b>
  </span>
  ): null
}

const Citation = () => (
  <span className='footer-small-text'>
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
const Sponsers = () => (
  <React.Fragment>
    <div className="col">
      <a href="https://www.covid19immunitytaskforce.ca/" target="__blank" rel="noopener noreferrer">
        <img src="https://www.covid19immunitytaskforce.ca/wp-content/themes/pena-lite-child/CITF_logo_ENG.svg" className="d-block mx-auto" alt="COVID-19 Immunity Task Force Logo" height="30"></img>
      </a>
    </div>
    <div className="col">
      <a href="https://cumming.ucalgary.ca/centres/centre-health-informatics" target="__blank" rel="noopener noreferrer">
        <img src={UcalgaryLogo} className="d-block mx-auto" alt="Centre for Health Informatics" height="30"></img>
      </a>
    </div>
    <div className="col">
      <a href="https://www.canada.ca/en/public-health.html/" target="__blank" rel="noopener noreferrer">
        <img src={HealthAgencyLogo} className="d-block mx-auto" alt="Public Health Agency Logo" height="30"></img>
      </a>
    </div>
    <div className="col">
      <a href="https://www.who.int/" target="__blank" rel="noopener noreferrer">
        <WhoLogo className="d-block mx-auto" height="40"/>
      </a>
    </div>
  </React.Fragment>
)

const PageLinks = () => (
  <React.Fragment>
    {
      Object.keys(PAGE_HASHES).map((page) => {
        return(
        <div className="col">
          <h3 className="row">{Translate(page)}</h3>
          {
          Object.keys(PAGE_HASHES[page]).map(h => (
          <HashLink to={`${withLocaleUrl(page)}#${h}`} className="row mt-2">
            {Translate(h)}
          </HashLink>))
          }
        </div>)})
    }
  </React.Fragment>)