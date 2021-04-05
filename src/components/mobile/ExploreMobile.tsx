import { faBars, faFilter, faTimes, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {  useState } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { PageStateEnum } from "../../types";
import MapboxMap from "components/map/MapboxMap"
import AnalysisMethods from "../sidebar/left-sidebar/AnalysisMethods";
import TotalStats from "../sidebar/left-sidebar/TotalStats";
import Datepicker from "../sidebar/right-sidebar/datepicker/Datepicker";
import Filters from "../sidebar/right-sidebar/Filters";
import LastUpdated from "../sidebar/right-sidebar/LastUpdated";
import Legend from "components/map/Legend";


export default function ExploreMobile() {
  const [showMobileFilters, setShowFilters] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const handleFilterToggle = (showMobile: boolean, showSummary: boolean, showLegend: boolean) => {
    setShowFilters(showMobile);
    setShowSummary(showSummary);
    setShowLegend(showLegend);
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
        <Filters page={PageStateEnum.explore}/>
        <Datepicker page={PageStateEnum.explore}/>
          <LastUpdated />
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => handleFilterToggle(false, false, false)}
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
          <TotalStats page={PageStateEnum.explore}/>
          <AnalysisMethods />
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => handleFilterToggle(false, false, false)}
            className={'icon'}
            color={'#455a64'}
            style={{ fontWeight: 300, position: 'absolute', zIndex: 3000, top: 10, right: 20 }}
            size={"lg"} />
        </Sidebar>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          className="col-10 p-0"
          vertical
          direction="left"
          visible={showLegend}
          width='wide'
        >
          <div className="mx-3 px-2" style={{marginTop: 45}}>
            <Legend/>
          </div>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => handleFilterToggle(false, false, false)}
            className={'icon'}
            color={'#455a64'}
            style={{ fontWeight: 300, position: 'absolute', zIndex: 3000, top: 10, right: 20 }}
            size={"lg"} />
        </Sidebar>
        <Sidebar.Pusher className="fill flex">
          <MapboxMap />
          {/* Icons */}
          <div className="icon-container"
            style={{ top: 10, right: 15 }}>
            <FontAwesomeIcon
              icon={faFilter}
              onClick={() => handleFilterToggle(!showMobileFilters, false, false)}
              className={'icon'}
              color={'#455a64'}
              size={"2x"} />
          </div>
          <div className="icon-container"
            style={{ top: 10, right: 58 }}>
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => handleFilterToggle(false, !showSummary, false)}
              className={'icon'}
              color={'#455a64'}
              size={"2x"} />
          </div>
          <div className="icon-container" style={{ top: 10, right: 98 }}>
            <FontAwesomeIcon
              icon={faListAlt}
              onClick={() => handleFilterToggle(false, false, !showLegend)}
              className={"icon"}
              color={"#455a64"}
              size={"2x"}
            />
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}
