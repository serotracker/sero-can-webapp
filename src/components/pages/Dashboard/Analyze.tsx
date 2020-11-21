import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import { AppContext } from "../../../context";
import httpClient from "../../../httpClient";
import AnalyzeMobile from '../../mobile/AnalyzeMobile';
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../../sidebar/right-sidebar/RightSidebar";
import Charts from "../../charts/Charts";

export default function Analyze() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    const updateCountryPrevalence = async () => {
      const api = new httpClient();
      // TODO: Figure out a better place to put this so we don't keep updating this either 
      const estimateGradePrevalences = await api.getEstimateGrades(state.filters);
      dispatch({
        type: 'UPDATE_ESTIMATE_PREVALENCES',
        payload: estimateGradePrevalences
      });
    }
    updateCountryPrevalence();
  }, [state.filters, dispatch])

  return (
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
  )
}