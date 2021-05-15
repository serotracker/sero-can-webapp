import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { isMaintenanceMode, mobileDeviceOrTabletWidth } from "../../../constants";
import { AppContext } from "../../../context";
import MaintenanceModal from "../../shared/MaintenanceModal";
import Map from "components/map/Map";
import TableauEmbed from "components/shared/TableauEmbed";
import StudyViewConfig from "StudyViewConfig";

export default function StudyView() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });
  const [state, dispatch] = useContext(AppContext);
  //@ts-ignore
  const url = StudyViewConfig.Country.find(x => x.iso3 === 'CAN').tableauUrl

  return (
    <>
      <div className="mx-auto col-9">
        <div style={{ height: "700px" }}>
          <div className="mt-4">
            <h1>Study Name Here</h1>
          </div>
          <div className="col-12 px-0 h-100 flex">
            <Map />
          </div>
        </div>
        <TableauEmbed
          url={url}
          key="CanadianTableau"
          desktopOptions={{
            width: "80vw",
            height: "4100px",
          }}
          mobileOptions={{
            width: "90vw",
            height: "2800px",
          }}
        />
      </div>
      <MaintenanceModal isOpen={isMaintenanceMode} headerText={""} />
    </>
  );
}
