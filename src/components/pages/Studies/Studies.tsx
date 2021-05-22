import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams, useRouteMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { isMaintenanceMode, mobileDeviceOrTabletWidth } from "../../../constants";
import { AppContext } from "../../../context";
import MaintenanceModal from "../../shared/MaintenanceModal";
import Map from "components/map/Map";
import TableauEmbed from "components/shared/TableauEmbed";
import PartnershipsConfig from "PartnershipsConfig";

export default function Studies() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth });
  const [state, dispatch] = useContext(AppContext);
  const { name } = useParams<{ name: string }>();
  const config = PartnershipsConfig.Country.find((x) => x.routeName === name);

  return (
    <>
      {config !== undefined ? (
        <>
          <div className="mx-auto col-9">
            <div style={{ height: "700px" }}>
              <div className="mt-4">
                <h1>Study Name Here</h1>
              </div>
              <div className="col-12 px-0 h-100 flex">
                <Map mapConfig={config.mapboxMapOptions} />
              </div>
            </div>
            <TableauEmbed
              url={config.tableauUrl}
              key={config.tableauUrl}
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
      ) : (
        <Redirect to="/ " />
      )}
    </>
  );
}
