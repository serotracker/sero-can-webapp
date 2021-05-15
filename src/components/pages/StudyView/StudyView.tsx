import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Loader } from "semantic-ui-react";
import { isMaintenanceMode, mobileDeviceOrTabletWidth } from "../../../constants";
import { AppContext } from "../../../context";
import { PageStateEnum } from "../../../types";
import MapboxMap from "../../map/MapboxMap";
import MobileComponents from "../../mobile/ExploreMobile";
import MaintenanceModal from "../../shared/MaintenanceModal";
import LeftSidebar from "../../sidebar/left-sidebar/LeftSidebar";
import RightSidebar from "../../sidebar/right-sidebar/RightSidebar";
import Legend from "components/map/Legend";
import Map from "components/map/Map";
import TableauEmbed from "components/shared/TableauEmbed";
import StudyViewConfig from "StudyViewConfig"

export default function StudyView() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });
  const [state, dispatch] = useContext(AppContext);
  const url = StudyViewConfig.Country.CAN.Url

  return (
    <>
      <div>
        testing
        <h1>
          adasda
        </h1>
        <div style={{ width: "500px", height: "700px" }}>
            <div className="col-8 h-100 flex">
                  <Map />
            </div>
        </div>
        <TableauEmbed
            url={url}
            key="CanadianTableau"
            desktopOptions={{
              width: "80vw",
              height: "4100px"
            }}
            mobileOptions={{
              width: "90vw",
              height: "2800px"
            }}
          />
      </div>
      <MaintenanceModal isOpen={isMaintenanceMode} headerText={""} />
    </>
  );
}
