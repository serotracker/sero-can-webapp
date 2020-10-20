import React from "react";
import "../sidebar.css";
import AnalysisMethods from "./AnalysisMethods";
import TotalStats from "./TotalStats";
import HealthAgencyLogo from '../../../assets/images/public-health-agency.png';
import UcalgaryLogo from '../../../assets/images/University-Of-Calgary-Logo.png';

export default function LeftSidebar() {
  return (
    <div className="sidebar-container flex">
      <TotalStats/>
      <AnalysisMethods/>
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
      </div>
    </div>
  )
}