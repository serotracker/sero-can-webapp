import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Loader } from "semantic-ui-react";
import { isMaintenanceMode, mobileDeviceOrTabletWidth } from "../../../constants";
import { AppContext } from "../../../context";
import { PageStateEnum } from "../../../types";
import Charts from "../../charts/Charts";
import AnalyzeMobile from '../../mobile/AnalyzeMobile';
import MaintenanceModal from "../../shared/MaintenanceModal";
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../../sidebar/right-sidebar/RightSidebar";


export default function Analyze() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });
  const [state] = useContext(AppContext)

  return (
    <>
      <div className="fill flex dashboard">
        {!isMobileDeviceOrTablet ?
          (<div className="fill flex">
            <div className="col-2 p-0 flex">
              <LeftSidebar page={PageStateEnum.analyze} />
            </div>
            <div className="col-8 p-0 flex">
              <Loader indeterminate active={state.analyze.isLoading}></Loader>
              <Charts />
            </div>
            <div className="col-2 p-0 flex">
              <RightSidebar page={PageStateEnum.analyze} />
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
