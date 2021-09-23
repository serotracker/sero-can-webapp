import React from "react";
import "../sidebar.scss";
import Filters from "./Filters";

interface SideBarProps {
  page: string
}

export default function RightSidebar({page}: SideBarProps) {
  return (
    <div className="justify-content-between fill sidebar-container right-sidebar">
      <div className="filters-container mb-3">
        <Filters page={page}/>
      </div>
    </div>
  )
}