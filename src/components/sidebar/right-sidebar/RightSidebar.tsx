import React from "react";
import { Link } from "react-router-dom";
import Translate from "../../../utils/translate/translateService";
import { withLocaleUrl } from "../../../utils/utils";
import "../sidebar.css";
import Datepicker from "./datepicker/Datepicker";
import Filters from "./Filters";
import LastUpdated from "./LastUpdated";
import "./RightSidebar.css";

interface SideBarProps {
  page: string
}

export default function RightSidebar({page}: SideBarProps) {
  return (
    <div className="justify-content-between fill sidebar-container">
      <div className="filters-container mb-3">
        <Filters page={page}/>
        <Datepicker page={page}/>
      </div>
      <div className="fill">
        <LastUpdated />
        <div className="fill center-item flex">
          <Link className="p-1" to={withLocaleUrl("PrivacyPolicy")}>{Translate('PrivacyPolicy')}</Link>
          <Link className="p-1" to={withLocaleUrl("CookiePolicy")}>{Translate('CookiePolicy')}</Link>
          <Link className="p-1" to={withLocaleUrl("TermsOfUse")}>{Translate('TermsOfUse')}</Link>
        </div>
      </div>
    </div>
  )
}