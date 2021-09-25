import React, {useContext, useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import {Loader, Icon} from "semantic-ui-react";
import {isMaintenanceMode, mobileDeviceOrTabletWidth, PAGE_HASHES} from "../../../constants";
import {AppContext} from "../../../context";
import {PageStateEnum, FiltersConfig} from "../../../types";
import MapboxMap from '../../map/MapboxMap';
import MobileComponents from '../../mobile/ExploreMobile';
import MaintenanceModal from "../../shared/MaintenanceModal";
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import Filters from "../../sidebar/right-sidebar/Filters";
import Legend from "components/map/Legend";
import {initializeData} from "../../../utils/stateUpdateUtils";
import {sendFiltersAnalyticsEvent, sendUnityAnalyticsEvent} from "../../../utils/analyticsUtils";
import closeIcon from "../../../assets/images/close-round.png"
import Translate from "../../../utils/translate/translateService";

interface ExploreProps {
    initialFilters?: FiltersConfig;
}

export default function Explore({initialFilters}: ExploreProps) {
    const isMobileDeviceOrTablet = useMediaQuery({maxDeviceWidth: mobileDeviceOrTabletWidth});
    const [state, dispatch] = useContext(AppContext);
    const [showUnityBanner, setShowUnityBanner] = useState(false);
    const [pulsateUnityCheckbox, setPulsateUnityCheckbox] = useState(false);

    // Apply initial input filters and get records
    useEffect(() => {
        if (initialFilters) {
            setShowUnityBanner(true);
            dispatch({
                type: 'UPDATE_ALL_FILTERS',
                payload: {
                    newFilters: initialFilters,
                    pageStateEnum: PageStateEnum.explore
                }
            });
            sendFiltersAnalyticsEvent(initialFilters);
            if (initialFilters.unity_aligned_only) {
                sendUnityAnalyticsEvent();
            }
        }
        initializeData(dispatch, state.explore.filters, PageStateEnum.explore)
        // We only want this to run once so we pass no dependencies. Do not remove this
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                //I know we prefer classes to inline styles, I will upgrade the same once utility classes from my punlication
                //PR are available
            }
            <div className="fill flex dashboard">
                {!isMobileDeviceOrTablet ?
                    (<>
                        <div className={showUnityBanner ? "px-4 flex center-item space-between w-100 visible" : "invisible"} style={{backgroundColor: "#E8EBEF", height: showUnityBanner ? "50px" : "0"}}>
                            <div style={{width: "80%"}}>
                                {Translate("UnityBanner", ["Currently"])}
                              <a href={"https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance/early-investigations"}
                                 target="_blank" rel="noopener noreferrer">
                                {Translate("UnityBanner", ["ProtocolLink"])}
                              </a> {Translate("UnityBanner",["ViewDatabase"])} <span className={"a"} onClick={() => {setPulsateUnityCheckbox(true)}}> {Translate("UnityBanner", ["WHOUnityFilter"])} </span>
                                {Translate("UnityBanner", ["Filter"])}
                            </div>
                            <Icon link onClick={() => {setShowUnityBanner(false)}} name='close'/>
                        </div>
                        <div className="flex w-100">
                            <div className="col-2 p-0 flex">
                                <LeftSidebar page={PageStateEnum.explore}/>
                            </div>
                            <div className="col-8 p-0 flex" id={PAGE_HASHES.Explore.Map}>
                                <Loader indeterminate active={state.explore.isLoading}/>
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
                                <Filters page={PageStateEnum.explore}  pulsateUnityFilter={pulsateUnityCheckbox} setPulsateUnityFilter={setPulsateUnityCheckbox}/>
                            </div>
                        </div>
                    </>) :
                    (

                          <div className="flex w-100">
                              <div className={showUnityBanner ? "px-4 flex center-item space-between w-100 visible" : "invisible"} style={{backgroundColor: "#E8EBEF", height: showUnityBanner ? "150px" : "0px", width: showUnityBanner ? "100%" : "0"}}>
                                  <div style={{width: "80%"}}>
                                      {Translate("UnityBanner", ["Currently"])}
                                      <a href={"https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance/early-investigations"}
                                         target="_blank" rel="noopener noreferrer">
                                          {Translate("UnityBanner", ["ProtocolLink"])}
                                      </a> {Translate("UnityBanner",["ViewDatabase"])} <span className={"a"} onClick={() => {setPulsateUnityCheckbox(true)}}> {Translate("UnityBanner", ["WHOUnityFilter"])} </span>
                                      {Translate("UnityBanner", ["Filter"])}
                                  </div>
                                  <Icon link onClick={() => {setShowUnityBanner(false)}} name='close'/>
                              </div>
                            <MobileComponents pulsateUnityFilter={pulsateUnityCheckbox} setPulsateUnityFilter={setPulsateUnityCheckbox}/>
                          </div>
                    )}
            </div>
            <MaintenanceModal isOpen={isMaintenanceMode} headerText={"Explore"}/>
        </>
    )
}
