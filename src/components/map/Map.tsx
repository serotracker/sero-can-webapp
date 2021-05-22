import React, { useContext, useEffect, useRef, useState, Dispatch } from "react";
import { AppContext } from "context";
import { Loader } from "semantic-ui-react";
import Legend from "components/map/Legend";
import MapboxMap from "../map/MapboxMap";
import "components/map/MapboxMap.css";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  mapConfig?: any
}

const Map = ( {mapConfig}: MapProps): any => {
  const [state] = useContext(AppContext);

  return (
    <>
      <Loader indeterminate active={state.explore.isLoading}></Loader>
      <div className="info flex legend center-item">
        <Legend />
      </div>
      <MapboxMap mapConfig={mapConfig} />
    </>
  );
};

export default Map;
