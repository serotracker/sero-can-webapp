import React , { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Loader } from "semantic-ui-react";
import { isMaintenanceMode, mobileDeviceOrTabletWidth, PAGE_HASHES } from "../../../constants";
import { AppContext } from "../../../context";
import { PageStateEnum, FiltersConfig } from "../../../types";
import MapboxMap from '../../map/MapboxMap';
import MobileComponents from '../../mobile/ExploreMobile';
import MaintenanceModal from "../../shared/MaintenanceModal";
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import Filters from "../../sidebar/right-sidebar/Filters";
import Legend from "components/map/Legend";
import { initializeData } from "../../../utils/stateUpdateUtils";

interface ExploreProps {
  initialFilters?: FiltersConfig;
}

export default function Explore(props: ExploreProps) {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });
  const [state, dispatch] = useContext(AppContext);

  // Apply initial input filters and get records
  useEffect(() => {
    if(props.initialFilters){
      dispatch({
        type: 'UPDATE_ALL_FILTERS',
        payload: {
          newFilters: props.initialFilters,
          pageStateEnum: PageStateEnum.explore
        }
      });
    }
    initializeData(dispatch, state.explore.filters, PageStateEnum.explore)
    // We only want this to run once so we pass no dependencies. Do not remove this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="fill flex dashboard">
        {!isMobileDeviceOrTablet ?
          (<div className="fill flex">
            <div className="col-2 p-0 flex">
              <LeftSidebar page={PageStateEnum.explore} />
            </div>
            <div className="col-8 p-0 flex" id={PAGE_HASHES.Explore.Map}>
              <Loader indeterminate active={state.explore.isLoading}></Loader>
              <div className="info flex legend center-item">
                <Legend/>
              </div>
              <MapboxMap 
              countriesConfig={{
                estimateGradePrevalences: state.explore.estimateGradePrevalences
              }} 
              studyPinsConfig={{
                records: state.explore.records
              }}
              />
            </div>
            <div className="col-2 p-0 flex sidebar-container">
              <Filters page={PageStateEnum.explore} />
            </div>
          </div>) :
          (
            <div className="fill flex">
              <MobileComponents />
            </div>
          )}
      </div >
      <MaintenanceModal isOpen={isMaintenanceMode} headerText={"Explore"} />
    </>
  )
}
