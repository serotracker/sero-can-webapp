import React from "react";
import { isMobileDeviceOrTablet } from "../../contants";
import CentralPiece from "../CenterComponent";
import MobileComponents from '../mobile/MobileComponents';
import LeftSidebar from "../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../sidebar/right-sidebar/RightSidebar";

export default function Dashboard() {

  return (
    <div className="col-12 p-0 flex">
      {!isMobileDeviceOrTablet ?
        (<div className="col-12 p-0 flex">
          <div className="col-2 p-0">
            <LeftSidebar />
          </div>
          <div className="col-8 p-0">
            <CentralPiece />
          </div>
          <div className="col-2 p-0">
            <RightSidebar />
          </div>
        </div>) :
        (
          <div className="col-12 p-0 flex">
            <MobileComponents />
          </div>
        )}
    </div >
  )
}