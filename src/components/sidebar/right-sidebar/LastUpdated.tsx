import React, { useContext } from "react";
import { AppContext } from "../../../context";
import Translate from "../../../utils/translate/translateService";
import './RightSidebar.css';

export default function LastUpdated() {
  const [state] = useContext(AppContext);

  return (
    <div className="col-12 pb-2">
      <div className='col-12 p-0 center-item flex'>
        <div className="section-title center last-refreshed-title">
        {Translate("DatabaseUptoDateTo").toUpperCase()}
        </div>
      </div>
      <div className="py-2 center">
        {state.updatedAt}
      </div>
    </div>
  )
}