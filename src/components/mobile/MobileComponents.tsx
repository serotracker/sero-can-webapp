import React, { useState } from "react";
// import { AppContext } from "../../../context";
import { Sidebar, Segment, Menu } from "semantic-ui-react";
import Filters from "../sidebar/right-sidebar/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faFilter, faBars } from "@fortawesome/free-solid-svg-icons";
import TotalStats from "../sidebar/left-sidebar/TotalStats";
import CountryList from "../sidebar/left-sidebar/CountryList";
import CentralPiece from "../pages/Dashboard/CenterComponent";


export default function MobileComponents() {
  const [showMobileFilters, setShowFilters] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleFilterToggle = (showMobile: boolean, showSummary: boolean) => {
    setShowFilters(showMobile);
    setShowSummary(showSummary);
  }

  return (
    <div className="col-12 p-0"> <Sidebar.Pushable as={Segment} className="col-12 p-0">
      {/* Filters */}
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
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => handleFilterToggle(false, false)}
          className={'icon'}
          color={'#455a64'}
          style={{ fontWeight: 300, position: 'absolute', zIndex: 3000, top: 10, right: 20 }}
          size={"lg"} />
      </Sidebar>
      {/* Left Sidebar */}
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
        <TotalStats />
        <CountryList />
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => handleFilterToggle(false, false)}
          className={'icon'}
          color={'#455a64'}
          style={{ fontWeight: 300, position: 'absolute', zIndex: 3000, top: 10, right: 20 }}
          size={"lg"} />
      </Sidebar>
      <Sidebar.Pusher className="col-12 p-0 flex">
        <CentralPiece />
        {/* Icons */}
        <div className="icon-container"
          style={{ top: 10, right: 15 }}>
          <FontAwesomeIcon
            icon={faFilter}
            onClick={() => handleFilterToggle(!showMobileFilters, false)}
            className={'icon'}
            color={'#455a64'}
            size={"2x"} />
        </div>
        <div className="icon-container"
          style={{ top: 10, right: 58 }}>
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
  )
}