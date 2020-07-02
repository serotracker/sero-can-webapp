import React from "react";
import Filters from "./Filters";
import LastUpdated from "./LastUpdated";
import Slider from './date-slider/Slider';
import "../sidebar.css"
import "./RightSidebar.css"
import Translate from "../../../utils/translate/translateService";
import { Link } from "react-router-dom";

export default function RightSidebar() {
  return (
    <div className="justify-content-between sidebar-container">
      <div className="filters-container mb-3">
        <Filters />
        <Slider />
      </div>
      <div className="fill">
        <LastUpdated />
        <div className="fill center-item flex">
          <Link className="p-1" to="/PrivacyPolicy">{Translate('PrivacyPolicy')}</Link>
          <Link className="p-1" to="/CookiePolicy">{Translate('CookiePolicy')}</Link>
          <Link className="p-1" to="/TermsOfUse">{Translate('TermsOfUse')}</Link>
        </div>
      </div>
    </div>
  )
}