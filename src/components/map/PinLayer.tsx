
import { icon, LeafletMouseEvent } from "leaflet";
import React, { useContext, useState } from 'react';
import { Marker } from "react-leaflet";
import { AppContext } from '../../context';
import PinModal from './PinModal';
import httpClient from "../../httpClient";
import { AirtableRecord } from "../../types";
import ReactDOMServer from "react-dom/server";


export default function PinLayer() {
  const [state] = useContext(AppContext);
  const [currentRecord, setRecord] = useState({} as AirtableRecord);

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

  const getRecord = async (source_id: string) => {
      const api = new httpClient()
      // TODO: Figure out a better place to put this so we don't keep updating this either 
      const res = await api.getOneAirtableRecord(source_id);
      setRecord(res);
  }

  return (
    <div>
      {state.explore.records.map((record, idx) => {
        if (record.pin_latitude && record.pin_longitude) {
          return (
            <Marker
              eventHandlers={{
                click: (e: LeafletMouseEvent) => {
                  setRecord({} as AirtableRecord);
                  getRecord(record.source_id);
                  e.target.openPopup()
                },
              }}
              icon={record.estimate_grade === "National" ? nationalMarker : (record.estimate_grade === "Regional" ? regionalMarker : localMarker)}
              key={`marker-${idx}`}
              position={[record.pin_latitude, record.pin_longitude]}
            >
                <PinModal record={currentRecord} key={`popup-${idx}`}/>
            </Marker>)
        }
      })}
    </div>
  )
}