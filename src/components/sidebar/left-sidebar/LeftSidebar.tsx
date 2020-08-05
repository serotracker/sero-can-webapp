import React from "react";
import CountryList from "./CountryList";
import TotalStats from "./TotalStats";
import AnalysisMethods from "./AnalysisMethods";
import "../sidebar.css"
import Translate from "../../../utils/translate/translateService";
import LancetArticleLink from "./LancetArticleLink";

export default function LeftSidebar() {
  return (
    <div className="sidebar-container flex">
      <TotalStats/>
      <AnalysisMethods/>
      <CountryList/>
      <LancetArticleLink/>
    </div>
  )
}