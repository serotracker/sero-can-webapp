import React, { useContext } from "react";
import { AppContext } from "../context";
import Charts from "./charts/Charts";
import './Component.css';
import Map from './map/Map';

export default function CentralPiece() {
  const [state, dispatch] = useContext(AppContext);


  const getClass = (shouldHighlight: boolean) => {
    if (shouldHighlight === state.data_page_state.mapOpen) {
      return 'center-highlighted'
    }
    return 'center-regular'
  }

  const displayCenter = () => {
    return state.data_page_state.mapOpen ? <Map /> : <Charts />
  }
  return (
    <div className="col-12 p-0">
      <div className="center-button flex">
        <div className={`center-item left-button ${getClass(true)}`} onClick={() =>
          dispatch({
            type: 'SELECT_DATA_TAB',
            payload: true
          })}>
          Explore
          </div>
        <div className={`right-button ${getClass(false)}`} onClick={() =>
          dispatch({
            type: 'SELECT_DATA_TAB',
            payload: false
          })}>
          Analyze
          </div>
      </div>
      {displayCenter()}
    </div>
  );
}
