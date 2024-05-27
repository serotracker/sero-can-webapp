import React, {useContext, useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import {Loader, Icon, Modal, Button} from "semantic-ui-react";
import {isMaintenanceMode, mobileDeviceOrTabletWidth, PAGE_HASHES} from "../../../constants";
import {AppContext} from "../../../context";
import {PageStateEnum, FiltersConfig} from "../../../types";
import MapboxMap from '../../map/MapboxMap';
import MobileComponents from './ExploreMobile';
import MaintenanceModal from "../../shared/MaintenanceModal";
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import Filters from "../../sidebar/right-sidebar/Filters";
import Legend from "components/map/Legend";
import { fetchExploreData } from "../../../utils/stateUpdateUtils";
import { sendFiltersAnalyticsEvent, sendUnityAnalyticsEvent } from "../../../utils/analyticsUtils";
import Translate from "../../../utils/translate/translateService";
import { ArboTrackerBanner } from "components/map/ArbotrackerBanner";

interface ExploreProps {
    initialFilters?: FiltersConfig;
}

export default function Explore({initialFilters}: ExploreProps) {
    const isMobileDeviceOrTablet = useMediaQuery({maxDeviceWidth: mobileDeviceOrTabletWidth});
    const [state, dispatch] = useContext(AppContext);
    const [showUnityBanner, setShowUnityBanner] = useState(false);
    const [mobileModalOpen, setMobileModalOpen] = useState(isMobileDeviceOrTablet);

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

        fetchExploreData(dispatch, state.explore.filters, PageStateEnum.explore)
        // We only want this to run once so we pass no dependencies. Do not remove this
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Modal
                onClose={() => {setMobileModalOpen(false)}}
                open={mobileModalOpen}
                size="mini"
                closeOnEscape={true}
                closeOnDimmerClick={true}
            >
                <Modal.Header className={"flex justify-content-center text-center"}>
                    {Translate("Welcome")}
                </Modal.Header>
                <Modal.Content className={"text-center"}>
                    {Translate("OptimisedFunctionality")}
                </Modal.Content>
                <Modal.Actions className={"flex justify-content-center"}>
                    <Button onClick={() => setMobileModalOpen(false)} style={{backgroundColor: "#094180", color:"#FFFFFF"}}>
                        {Translate("Okay")}
                    </Button>
                </Modal.Actions>
            </Modal>
            <div className="fill flex dashboard">
                {!isMobileDeviceOrTablet ?
                    (<>
                    {showUnityBanner && (<div className={ "px-4 flex center-item justify-content-between w-100 visible"} style={{backgroundColor: "#E8EBEF", height: "50px"}}>
                            <div style={{width: "80%"}}>
                                {Translate("UnityBanner", ["Currently"])}
                              <a href={"https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance/early-investigations"}
                                 target="_blank" rel="noopener noreferrer">
                                {Translate("UnityBanner", ["ProtocolLink"])}
                              </a> {Translate("UnityBanner",["ViewDatabase"])} <span className={"link"} onClick={() => {dispatch({type: "SET_UNITY_FILTER_PULSATE", payload: true})}}> {Translate("UnityBanner", ["WHOUnityFilter"])} </span>
                                {Translate("UnityBanner", ["Filter"])}
                            </div>
                            <Icon link onClick={() => {setShowUnityBanner(false)}} name='close'/>
                    </div>)}
                        <div className="flex h-100 w-100">
                            <div className="col-2 p-0 flex">
                                <LeftSidebar page={PageStateEnum.explore}/>
                            </div>
                            <div className="col-8 p-0 flex" id={PAGE_HASHES.Explore.Map}>
                                <Loader indeterminate active={state.explore.isLoading}/>
                                <div className="info flex legend center-item">
                                    <Legend/>
                                </div>
                                <ArboTrackerBanner />
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
                                <Filters page={PageStateEnum.explore}/>
                            </div>
                        </div>
                    </>) :
                    (

                          <div className="flex w-100">
                              {showUnityBanner && (<div className={"px-4 flex center-item justify-content-between w-100"}
                                                       style={{backgroundColor: "#E8EBEF", height: "150px"}}>
                                  <div style={{width: "80%"}}>
                                      {Translate("UnityBanner", ["Currently"])}
                                      <a href={"https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance/early-investigations"}
                                         target="_blank" rel="noopener noreferrer">
                                          {Translate("UnityBanner", ["ProtocolLink"])}
                                      </a> {Translate("UnityBanner", ["ViewDatabase"])} <span className={"link"}
                                                                                              onClick={() => {
                                                                                                  dispatch({type: "SET_UNITY_FILTER_PULSATE", payload: true})
                                                                                              }}> {Translate("UnityBanner", ["WHOUnityFilter"])} </span>
                                      {Translate("UnityBanner", ["Filter"])}
                                  </div>
                                  <Icon link onClick={() => {
                                      setShowUnityBanner(false)
                                  }} name='close'/>
                              </div>)}
                            <MobileComponents/>
                          </div>
                    )}
            </div>
            <MaintenanceModal isOpen={isMaintenanceMode} headerText={"Explore"}/>
        </>
    )
}
