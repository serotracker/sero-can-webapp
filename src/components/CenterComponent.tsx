import React, { useState } from "react";
import Map from './map/Map';
import './Component.css'
import Charts from "./charts/Charts";

export default function CentralPiece() {
  const [showMap, setShowMap] = useState(true);

  const getClass = (shouldHighlight: boolean) => {
    if(shouldHighlight === showMap) {
      return 'center-highlighted'
    }
    return 'center-regular'
  }

  const displayCenter = () => {
    return showMap ? <Map/> : <Charts />
  }
  return (
    <div className="col-12 p-0">
      <div className="center-button flex">
          <div className={`center-item left-button ${getClass(true)}`} onClick={() => setShowMap(true)}>
            Explore
          </div>
          <div className={`right-button ${getClass(false)}`} onClick={() => setShowMap(false)}>
            Analyze
          </div>
      </div>
      {displayCenter()}
    </div>
  );
}
