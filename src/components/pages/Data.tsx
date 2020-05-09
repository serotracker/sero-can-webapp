import React, { useState } from "react";
import CentralPiece from "../CenterComponent";
import LeftSidebar from "../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../sidebar/right-sidebar/RightSidebar";

export default function Data() {
  return (
    <div className="col-12 p-0 flex">
      <div className="col-2 p-0">
        <LeftSidebar />
      </div>
      <div className="col-8 p-0">
        <CentralPiece />
      </div>
      <div className="col-2 p-0">
        <RightSidebar />
      </div>
    </div>
  )
}