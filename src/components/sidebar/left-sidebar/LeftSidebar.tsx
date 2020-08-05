import React from "react";
import "../sidebar.css";
import AnalysisMethods from "./AnalysisMethods";
import TotalStats from "./TotalStats";

export default function LeftSidebar() {
  return (
    <div className="sidebar-container flex">
      <TotalStats/>
      <AnalysisMethods/>
    </div>
  )
}