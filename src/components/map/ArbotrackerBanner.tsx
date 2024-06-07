import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes} from "@fortawesome/free-solid-svg-icons";

export const ArboTrackerBanner = () => {
  const [visible, setVisible]= useState<boolean>(true);

  return (
    <div className="px-4 py-2 w-1/2 mx-auto info" style={{
      position: "absolute",
      display: "flex",
      alignContent: "flex-start",
      zIndex: 10,
      width: "50%",
      left: 0,
      right: 0,
      top: 20 
    }} hidden={!visible}>
      <div>
        <a href="https://new.serotracker.com/pathogen/arbovirus/dashboard" target="_blank" rel="noopener noreferrer">JUST LAUNCHED: The team behind SeroTracker has just launched a brand new dashboard focused on Arbovirus studies</a>
      </div>
      <div>
        <button aria-label="Close Popup" onClick={() => setVisible(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
}