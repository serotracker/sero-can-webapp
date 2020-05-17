import React, { useContext } from "react";
import { AppContext } from "../../../context";

export default function LastUpdated() {
  const [state] = useContext(AppContext);

  return (
    <div className="col-12 pb-4">
      <div className="section-title center">
        LAST UPDATED
      </div>
      <div className="py-2 center">
        {state.updated_at}
      </div>
    </div>
  )
}