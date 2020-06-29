import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import MobileComponents from '../../mobile/MobileComponents';
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../../sidebar/right-sidebar/RightSidebar";
import CentralPiece from "./CenterComponent";

export default function Dashboard() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
  return (
    <div className="fill flex dashboard">
      {!isMobileDeviceOrTablet ?
        (<div className="fill flex">
          <div className="col-2 p-0 flex">
            <LeftSidebar />
          </div>
          <div className="col-8 p-0 flex">
            <CentralPiece />
          </div>
          <div className="col-2 p-0 flex">
            <RightSidebar />
          </div>
        </div>) :
        (
          <div className="fill flex">
            <MobileComponents />
          </div>
        )}
    </div >
  )
}