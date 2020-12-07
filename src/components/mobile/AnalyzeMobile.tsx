import { faBars, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { AppContext } from "../../context";
import Charts from "../charts/Charts";
import AnalysisMethods from "../sidebar/left-sidebar/AnalysisMethods";
import TotalStats from "../sidebar/left-sidebar/TotalStats";
import Datepicker from "../sidebar/right-sidebar/datepicker/Datepicker";
import Filters from "../sidebar/right-sidebar/Filters";
import LastUpdated from "../sidebar/right-sidebar/LastUpdated";

export default function AnalyzeMobile() {
  const [showMobileFilters, setShowFilters] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [state,] = useContext(AppContext)

  const handleFilterToggle = (showMobile: boolean, showSummary: boolean) => {
    setShowFilters(showMobile);
    setShowSummary(showSummary);
  }

  return (
    <div className="fill flex">
      <Sidebar.Pushable as={Segment} className="fill flex">
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
          <Filters filters={state.filters} />
          <Datepicker/>
          <LastUpdated />
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
          <AnalysisMethods />
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => handleFilterToggle(false, false)}
            className={'icon'}
            color={'#455a64'}
            style={{ fontWeight: 300, position: 'absolute', zIndex: 3000, top: 10, right: 20 }}
            size={"lg"} />
        </Sidebar>
        <Sidebar.Pusher className="fill flex">
          {/* <Charts /> */}
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