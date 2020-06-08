import React from "react";
import CountryList from "./CountryList";
import TotalStats from "./TotalStats";
import "../sidebar.css"

export default function LeftSidebar() {
  return (
    <div className="sidebar-container">
      <TotalStats/>
      <CountryList/>
    </div>
  )
}