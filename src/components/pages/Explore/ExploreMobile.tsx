import { faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState, useContext, useEffect} from "react";
import { AppContext } from "context";
import { Menu, Segment, Sidebar, Icon } from "semantic-ui-react";
import { PageStateEnum } from "../../../types";
import MapboxMap from "components/map/MapboxMap"
import Datepicker from "./right-sidebar/datepicker/Datepicker";
import Filters from "./right-sidebar/Filters";
import Legend from "components/map/Legend";
import LeftSidebar from "./left-sidebar/LeftSidebar";
import './ExploreMobile.scss';

export default function ExploreMobile() {
  const [showMobileFilters, setShowFilters] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [state] = useContext(AppContext);

  const handleFilterToggle = (showMobile: boolean = false, showSummary: boolean = false, showLegend: boolean = false) => {
    setShowFilters(showMobile);
    setShowSummary(showSummary);
    setShowLegend(showLegend);
  }

  useEffect(() => {
    setShowFilters(state.pulsateUnityFilter);
  }, [state.pulsateUnityFilter])

  return (
    <div className="fill flex explore" style={{height: "100%"}}>
      <Sidebar.Pushable as={Segment} className="fill flex">
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
        <Filters page={PageStateEnum.explore} />
        <Datepicker page={PageStateEnum.explore}/>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => handleFilterToggle()}
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
          visible={showSummary}
          width='wide'
        >
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => handleFilterToggle()}
            className={'icon'}
            color={'#455a64'}
            style={{ fontWeight: 300, position: 'absolute', zIndex: 3000, top: 10, right: 20 }}
            size={"lg"} />
          <LeftSidebar page={PageStateEnum.explore}/>
        </Sidebar>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          className="col-10 p-0"
          vertical
          visible={showLegend}
          width='wide'
        >
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => handleFilterToggle()}
            className={'icon'}
            color={'#455a64'}
            style={{ fontWeight: 300, position: 'absolute', zIndex: 3000, top: 10, right: 20 }}
            size={"lg"} />
            <div className='m-3 mt-5'>
              <Legend/>
            </div>
        </Sidebar>
        <Sidebar.Pusher className="fill flex">
          <MapboxMap
              countriesConfig={{
                estimateGradePrevalences: state.explore.estimateGradePrevalences
              }}
              studyPinsConfig={{
                records: state.explore.records
              }}
              />
          {/* Icons */}
          <div className="sidebar__info-btn">
             <Icon
             name='filter'
             size='large'
             className='ml-1 mt-1'
             onClick={() => handleFilterToggle(!showMobileFilters, false, false)}
             />
          </div>
          <div className="sidebar__filter-btn">
          <Icon
             name='question circle'
             size='large'
             className='ml-1 mt-1'
             onClick={() => handleFilterToggle(false, !showSummary, false)}
             />
          </div>
          <div className="sidebar__map-btn">
          <Icon
             name='map'
             size='large'
             className='ml-1 mt-1'
             onClick={() => handleFilterToggle(false, false, !showMobileFilters)}
             />
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}
