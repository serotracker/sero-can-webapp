import React, { useContext } from "react";
import { AppContext } from "../../../context";
import InformationIcon from "../../shared/InformationIcon";
import './RightSidebar.css';
import Translate from "../../../utils/translate/translateService";

export default function LastUpdated() {
  const [state] = useContext(AppContext);

  return (
    <div className="col-12 pb-2">
      <div className='col-12 p-0 center-item flex'>
        <div className="section-title">
        {Translate("LastUpdated").toUpperCase()}
        </div>
        <div className="tooltip-vert-adj">
          <InformationIcon
              offset={10}
              position="top right"
              color="#455a64"
              tooltipHeader={Translate("LastUpdated")}
              popupSize="small"
              size="sm"
              tooltip={Translate("LastUpdatedTooltip")}/>
        </div>
      </div>
      <div className="py-2 center">
        {state.updated_at}
      </div>
    </div>
  )
}