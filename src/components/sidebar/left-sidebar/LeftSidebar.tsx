import React from "react";
import CountryList from "./CountryList";
import TotalStats from "./TotalStats";
import "../sidebar.css"

export default function LeftSidebar() {
  return (
    <div className="col-12 p-0 flex sidebar-container">
      <TotalStats/>
      <CountryList/>
    </div>
  )
}