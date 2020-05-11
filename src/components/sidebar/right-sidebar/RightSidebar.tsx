import React from "react";
import Filters from "./Filters";
import LastUpdated from "./LastUpdated";
import "../sidebar.css"

export default function RightSidebar() {
  return (
    <div className="col-12 p-0 d-flex flex-column justify-content-between sidebar-container">
      <div>
        <Filters/>
      </div>
      <div>
        <LastUpdated/>
      </div>
    </div>
  )
}