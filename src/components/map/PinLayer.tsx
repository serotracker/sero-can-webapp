
import { icon, LeafletMouseEvent } from "leaflet";
import React, { useContext } from 'react';
import { Marker, Popup } from "react-leaflet";
import { AppContext } from '../../context';
import Translate from '../../utils/translate/translateService';
import { getGeography, getPossibleNullDateString } from '../../utils/utils';


export default function PinLayer() {
  const [state] = useContext(AppContext);

  // Definitions of the marker fields: 
  //  iconSize: size of the icon
  //  iconAnchor: point of the icon which will correspond to marker's location
  //  popupAnchor: point from which the popup should open relative to the iconAnchor
  const nationalMarker = icon({
    iconUrl: require('../../assets/icons/national_pin.png'),
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -30]
  });

  const regionalMarker = icon({
    iconUrl: require('../../assets/icons/regional_pin.png'),
    iconSize: [21, 30],
    iconAnchor: [10.5, 30],
    popupAnchor: [0, -20]
  });

  const localMarker = icon({
    iconUrl: require('../../assets/icons/local_pin.png'),
    iconSize: [14, 20],
    iconAnchor: [7, 20],
    popupAnchor: [0, -10]
  });

  return (
    <div>
      {state.explore.records.map((record, idx) => {
        if (record.pin_latitude && record.pin_longitude) {
          return (
            <Marker
              eventHandlers={{
                click: (e: LeafletMouseEvent) => {
                  e.target.openPopup();
                },
              }}
              icon={record.estimate_grade === "National" ? nationalMarker : (record.estimate_grade === "Regional" ? regionalMarker : localMarker)}
              key={`marker-${idx}`}
              position={[record.pin_latitude, record.pin_longitude]}
            >
              {/*<Popup autoClose={false} className="pin-popup">
                <div className="popup-title">
                  {Translate(`${record.estimate_grade}StudyDetails`)}
                </div>
                <div className="popup-heading">
                  {Translate("StudyName")}
                </div>
                <div className="popup-text">
                  {record.url ? <a href={record.url} target="_blank" rel="noopener noreferrer">{record.source_name}</a> : record.source_name}
                </div>
                <div className="popup-heading">
                  {Translate("Location")}
                </div>
                <div className="popup-text">
                  {getGeography(record.city, record.state, record.country)}
                </div>
                {(record.sampling_start_date && record.sampling_end_date) && (
                  <>
                    <div className="popup-heading">
                      {Translate("SamplingDates")}
                    </div>
                    <div className="popup-text">
                      {`${getPossibleNullDateString(record.sampling_start_date)} → ${getPossibleNullDateString(record.sampling_end_date)}`}
                    </div>
                  </>)
                }
                <div className="popup-heading">
                  {Translate("BestSeroprevalenceEstimate")}
                </div>
                <div className="popup-text">
                  {record.seroprevalence ? `${(record.seroprevalence * 100).toFixed(1)}%` : "N/A"}
                </div>
                <div className="popup-heading">
                  {Translate("N")}
                </div>
                <div className="popup-text">
                  {`${record.denominator}`}
                </div>
                <div className="popup-heading">
                  {Translate("PopulationGroup")}
                </div>
                <div className="popup-text">
                  {record.population_group ? `${record.population_group}` : Translate("NotReported")}
                </div>
                <div className="popup-heading">
                  {Translate("RiskOfBias")}
                </div>
                <div className="popup-text">
                  {`${record.overall_risk_of_bias}`}
                </div>
              </Popup>*/}
            </Marker>)
        }
      })}
    </div>
  )
}