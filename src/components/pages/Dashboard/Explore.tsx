import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import Map from '../../map/Map';
import MobileComponents from '../../mobile/ExploreMobile';
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../../sidebar/right-sidebar/RightSidebar";
import MaintenanceModal from "../../shared/MaintenanceModal";
import { isMaintenanceMode } from "../../../constants";
import { AppContext } from "../../../context";

export default function Explore() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });
  const [, dispatch] = useContext(AppContext)
  return (
    <React.Fragment>
      <div className="fill flex dashboard">
        {!isMobileDeviceOrTablet ?
          (<div className="fill flex">
            <div className="col-2 p-0 flex">
              <LeftSidebar page={}/>
            </div>
            <div className="col-8 p-0 flex">
              <Map />
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
      <MaintenanceModal isOpen={isMaintenanceMode} headerText={"Explore"} />
    </React.Fragment>
  )
}