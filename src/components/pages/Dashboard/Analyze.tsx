import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import Charts from "../../charts/Charts";
import AnalyzeMobile from '../../mobile/AnalyzeMobile';
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../../sidebar/right-sidebar/RightSidebar";
import MaintenanceModal from "../../shared/MaintenanceModal";
import { isMaintenanceMode } from "../../../constants";
import { AppContext } from "../../../context";

export default function Analyze() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });
  const [, dispatch] = useContext(AppContext)
  
  return (
    <>
      <div className="fill flex dashboard">
        {!isMobileDeviceOrTablet ?
          (<div className="fill flex">
            <div className="col-2 p-0 flex">
              <LeftSidebar />
            </div>
            <div className="col-8 p-0 flex">
              <Charts />
            </div>
            <div className="col-2 p-0 flex">
              <RightSidebar />
            </div>
          </div>) :
          (
            <div className="fill flex">
              <AnalyzeMobile />
            </div>
          )}
      </div >
      <MaintenanceModal isOpen={isMaintenanceMode} headerText={"Analyze"} />
    </>
  )
}