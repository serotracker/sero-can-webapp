import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import { AppContext } from "../../../context";
import httpClient from "../../../httpClient";
import MobileComponents from '../../mobile/MobileComponents';
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../../sidebar/right-sidebar/RightSidebar";
import CentralPiece from "./CenterComponent";

export default function Dashboard() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });
  const [state, dispatch] = useContext(AppContext);
  
  useEffect(() => {
    if(state.filtered_records.length > 0){
      const updateCountryPrevalence = async () => {
        const api = new httpClient();
        const estimateGradePrevalences = await api.getEstimateGrades(state.filtered_records);
        dispatch({
          type: 'UPDATE_ESTIMATE_PREVALENCES',
          payload: estimateGradePrevalences
        });
      } 
      updateCountryPrevalence();
    }
  }, [state.filtered_records, dispatch])

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