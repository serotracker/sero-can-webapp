import React from "react";
import CountryList from "./CountryList";
import TotalStats from "./TotalStats";
import AnalysisMethods from "./AnalysisMethods";
import "../sidebar.css"

export default function LeftSidebar() {
  return (
    <div className="sidebar-container flex">
      <TotalStats/>
      <AnalysisMethods/>
      <CountryList/>
    </div>
  )
}