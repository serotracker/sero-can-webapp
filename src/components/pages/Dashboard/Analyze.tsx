import React from "react";
import { useMediaQuery } from "react-responsive";
import { isMaintenanceMode, mobileDeviceOrTabletWidth } from "../../../constants";
import { PageStateEnum } from "../../../types";
import Charts from "../../charts/Charts";
import AnalyzeMobile from '../../mobile/AnalyzeMobile';
import MaintenanceModal from "../../shared/MaintenanceModal";
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../../sidebar/right-sidebar/RightSidebar";


export default function Analyze() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });
  
  return (
    <>
      <div className="fill flex dashboard">
        {!isMobileDeviceOrTablet ?
          (<div className="fill flex">
            <div className="col-2 p-0 flex">
              <LeftSidebar page={PageStateEnum.analyze}/>
            </div>
            <div className="col-8 p-0 flex">
              <Charts />
            </div>
            <div className="col-2 p-0 flex">
              <RightSidebar page={PageStateEnum.analyze}/>
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