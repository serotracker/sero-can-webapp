import React, { useContext, useEffect, useRef, useState, Dispatch } from "react";
import { AppContext } from "context";
import { Loader } from "semantic-ui-react";
import Legend from "components/map/Legend";
import MapboxMap from "../map/MapboxMap";
import "components/map/MapboxMap.css";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  mapConfig?: any
  className?: any
}

const Map = ( {mapConfig, className}: MapProps): any => {
  const [state] = useContext(AppContext);

  return (
    <div className={"w-100 h-100"}>
      <Loader indeterminate active={state.explore.isLoading}></Loader>
      <div className="info flex legend center-item">
        <Legend />
      </div>
      <MapboxMap mapConfig={mapConfig} />
    </div>
  );
};

export default Map;
