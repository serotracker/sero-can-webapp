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
        <div className="section-title center last-refreshed-title">
        {Translate("ServerLastRefreshed").toUpperCase()}
        </div>
      </div>
      <div className="py-2 center">
        {state.updated_at}
      </div>
    </div>
  )
}