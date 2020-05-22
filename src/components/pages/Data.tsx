import React, { useState } from "react";
import CentralPiece from "../CenterComponent";
import LeftSidebar from "../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../sidebar/right-sidebar/RightSidebar";
import MediaQuery from 'react-responsive';
import Filters from "../sidebar/right-sidebar/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Sidebar, Segment, Menu, Header } from "semantic-ui-react";
import TotalStats from "../sidebar/left-sidebar/TotalStats";
import CountryList from "../sidebar/left-sidebar/CountryList";

export default function Dashboard() {
  const [showMobileFilters, setShowFilters] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleFilterToggle = (showMobile: boolean, showSummary: boolean) => {
    setShowFilters(showMobile);
    setShowSummary(showSummary);
  }

  return (
    <div className="col-12 p-0 flex">
      <MediaQuery minDeviceWidth={600}>
        <div className="col-12 p-0 flex">
          <div className="col-2 p-0">
            <LeftSidebar />
          </div>
          <div className="col-8 p-0">
            <CentralPiece />
          </div>
          <div className="col-2 p-0">
            <RightSidebar />
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={600}>
        <div className="col-12 p-0 flex">
          <Sidebar.Pushable as={Segment} className="col-12 p-0">
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              className="col-10 p-0"
              vertical
              direction="left"
              visible={showMobileFilters}
              width='wide'
            >

              <Filters />
            </Sidebar>
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              className="col-10 p-0"
              vertical
              direction="left"
              visible={showSummary}
              width='wide'
            >

              <TotalStats/>
              <CountryList />
            </Sidebar>
            <Sidebar.Pusher className="col-12 p-0">
              <CentralPiece />
              <div className="icon-container"
                style={{ top: 10, right: 20 }}>
                <FontAwesomeIcon
                  icon={faFilter}
                  onClick={() => handleFilterToggle(!showMobileFilters, false)}
                  className={'icon'}
                  color={'#455a64'}
                  size={"2x"} />
              </div>
              <div className="icon-container"
                style={{ top: 10, right: 70 }}>
                <FontAwesomeIcon
                  icon={faBars}
                  onClick={() => handleFilterToggle(false, !showSummary)}
                  className={'icon'}
                  color={'#455a64'}
                  size={"2x"} />
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </MediaQuery>
    </div >
  )
}