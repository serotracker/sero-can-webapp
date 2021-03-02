import React from "react";
import AnalysisMethods from "./AnalysisMethods";
import Translate from "utils/translate/translateService";
import TotalStats from "./TotalStats";
import HealthAgencyLogo from 'assets/images/public-health-agency.png';
import UcalgaryLogo from 'assets/images/University-Of-Calgary-Logo.png';
import WhoLogo from "components/shared/WhoLogo"
import "../sidebar.css";

interface SideBarProps {
  page: string
}

export default function LeftSidebar({ page }: SideBarProps) {

  const ExploreText = () => (
    <div className="analysis-methods">
      <div className="section-title py-2 center">
        {Translate('Welcome').toUpperCase()}
      </div>
      <p>
        {Translate('ExploreBlurb', ['FirstParagraph'])}
      </p>
      <p>
        {Translate('ExploreBlurb', ['SecondParagraph'])}
      </p>
    </div>
  )

  return (
    <div className="sidebar-container flex">
      <TotalStats page={page} />
      {page === "explore" ? (
        <ExploreText />
      ) : (
          <AnalysisMethods />
        )
      }
      <div className="m-3">
        <a href="https://www.covid19immunitytaskforce.ca/" className="d-block mt-3 mx-auto" target="__blank" rel="noopener noreferrer">
          <img src="https://www.covid19immunitytaskforce.ca/wp-content/themes/pena-lite-child/CITF_logo_ENG.svg" className="d-block mx-auto" alt="COVID-19 Immunity Task Force Logo" height="25"></img>
        </a>
        <a href="https://www.canada.ca/en/public-health.html/" className="d-block mt-3 mx-auto" target="__blank" rel="noopener noreferrer">
          <img src={HealthAgencyLogo} className="d-block mx-auto" alt="Public Health Agency Logo" height="25"></img>
        </a>
        <a href="https://cumming.ucalgary.ca/centres/centre-health-informatics" className="d-block mt-3 mx-auto" target="__blank" rel="noopener noreferrer">
          <img src={UcalgaryLogo} className="d-block mx-auto" alt="Centre for Health Informatics" height="22"></img>
        </a>
        <a href="https://www.who.int/" className="d-block mt-3 mx-auto" target="__blank" rel="noopener noreferrer">
          <WhoLogo className="d-block mx-auto" height="50"/>
        </a>
        <p className="d-block mx-3 mt-3">
          <small>
          {Translate('WhoSerotrackAndPartnersDisclaimerSmall')}
          </small>
        </p>
      </div>
    </div>
  )
}
