import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context";
import Translate from "../../../utils/translate/translateService";
import "../sidebar.css";
import Datepicker from "./datepicker/Datepicker";
import Filters from "./Filters";
import LastUpdated from "./LastUpdated";
import "./RightSidebar.css";

export default function RightSidebar() {
  const [{filters}, ] = useContext(AppContext)

  return (
    <div className="justify-content-between fill sidebar-container">
      <div className="filters-container mb-3">
        <Filters filters={filters}/>
        <Datepicker/>
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