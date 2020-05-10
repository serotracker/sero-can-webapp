import React, { useContext } from "react";
import { AppContext } from "../../../context";

export default function LastUpdated() {
  const [state, dispatch] = useContext(AppContext);

  return (
    <div className="col-12 p-0 flex">
      Last Updated {state.updated_at}
    </div>
  )
}