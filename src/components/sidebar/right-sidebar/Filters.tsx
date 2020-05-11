import React, { useContext } from "react";
import { AppContext } from "../../../context";

export default function Filters() {
  const [state, dispatch] = useContext(AppContext);

  return (
    <div className="col-12 p-0 flex">
      Filters
      <div>
        Country {Array.from(state.filter_options.country)}
      </div> 
      <div>
        Study status {Array.from(state.filter_options.study_status)}
      </div> 
      <div>
        Source type {Array.from(state.filter_options.source_type)}
      </div> 
      <div>
        Test type {Array.from(state.filter_options.test_type)}
      </div> 
      <div>
        Populations {Array.from(state.filter_options.populations)}
      </div> 
    </div>
  )
}