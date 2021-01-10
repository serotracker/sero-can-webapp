
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";
import React, { useContext } from 'react';
import { AppContext } from '../../context';
import Translate from '../../utils/translate/translateService';
import { getGeography } from '../../utils/utils';
import { icon, LeafletMouseEvent } from "leaflet";


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
              <Popup autoClose={false} className="pin-popup">
                <div className="popup-title">
                  {`${record.estimate_grade} study details`}
                </div>
                <div className="popup-heading">
                  {Translate("StudyName")}
                </div>
                <div className="popup-text">
                  {`${record.source_name}`}
                </div>
                <div className="popup-heading">
                  {Translate("Location")}
                </div>
                <div className="popup-text">
                  {getGeography(record.city, record.state, record.country)}
                </div>
                <div className="popup-heading">
                  Best seroprevalence (SP) estimate
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
              </Popup>
            </Marker>)
        }
      })}
    </div>
  )
}