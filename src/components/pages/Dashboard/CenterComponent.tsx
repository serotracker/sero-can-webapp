import React, { useContext } from "react";
import { AppContext } from "../../../context";
import { sendAnalyticsEvent } from "../../../utils/analyticsUtils";
import Translate from "../../../utils/translate/translateService";
import Charts from "../../charts/Charts";
import Map from '../../map/Map';
import './Component.css';

export default function CentralPiece() {
  const [state, dispatch] = useContext(AppContext);

  const clickButton = (text: string) => {

    sendAnalyticsEvent({
      category: 'Center Button',
      action: 'click',
      label: text || "Unknown"
    })
  }

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
    <div className="flex fill">
      <div className="center-button flex">
        <div className={`center-item left-button ${getClass(true)}`} onClick={() => {
          clickButton('Explore');
          dispatch({
            type: 'SELECT_DATA_TAB',
            payload: true
          })
        }}>
          {Translate('Explore')}
        </div>
        <div className={`right-button ${getClass(false)}`} onClick={() => {
          clickButton('Analyze');
          dispatch({
            type: 'SELECT_DATA_TAB',
            payload: false
          })
        }}>
          {Translate('Analyze')}
        </div>
      </div>
      {displayCenter()}
    </div >
  );
}
