import { latLngBounds, LatLng} from "leaflet";
import React, { createRef, useContext, useEffect, useState } from "react";
import { GeoJSON, Map as LeafletMap, Marker, Popup, Rectangle, TileLayer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import Countries from "../../assets/countries-geo.json";
import { AppContext } from "../../context";
import { altStyle, getBuckets, getMapUrl, mapAltDataToFeatures, onAltEachFeature } from "../../utils/mapUtils";
import Legend from "./Legend";
import './Map.css';

export default function Map() {
  const mapRef = createRef<LeafletMap>();
  const geoJsonRef = createRef<GeoJSON>();
  const [state] = useContext(AppContext);
  const [mapRecords, setMapRecords] = useState(Countries as any);
  const [forceUpdate, setForceUpdate] = useState(Math.random());
  const buckets = getBuckets(mapRecords.features);

  useEffect(() => {
    if(state.estimate_grade_prevalences.length > 0){
      const importGeo = Countries as any;
      const features = importGeo.features as GeoJSON.Feature[]
      // We will iterate through all the features in the geoJson
      // if they are in the country dict we will attach their aggregated data to the feature for displaying
      importGeo.features = mapAltDataToFeatures(features, state.estimate_grade_prevalences);
      setMapRecords(importGeo)

      // we need to update the key on the GEOJSON to let react know it's time to rerender
      setForceUpdate(Math.random())
    }
    else{
      // Initialize map so that it starts out colourless
      const initImportGeo = Countries as any;
      const features = initImportGeo.features as GeoJSON.Feature[]
      initImportGeo.features = features.map(feature => {
        return { ...feature, properties: { ...feature.properties, seroprevalence: null, error: null, n: null, num_studies: null } }
      })
      setMapRecords(initImportGeo);
    }
  }, [state.estimate_grade_prevalences])

  const bounds = latLngBounds([-90, -200], [90, 180]);
  const maxBounds = latLngBounds([-90, -200], [90, 200]);

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_API_KEY;

  // TODO: map all the lat/lng from the BE into an array of markers
  const markers: [number, number][]  =  [[51.505, -0.09]];

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const clickMarker = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    (e.target as any).openPopup();
  }

  const initMarker = (ref : any) => { 
          if (ref && ref.leafletElement) {

    window.setTimeout(() => {
      ref.leafletElement.openPopup() 
    })
    }
  }

  // Definitions of the marker fields: 
  //  iconSize: size of the icon
  //  iconAnchor: point of the icon which will correspond to marker's location
  //  popupAnchor: point from which the popup should open relative to the iconAnchor
  const nationalMarker = L.icon({ 
    iconUrl: require('../../assets/icons/national_pin.png'), 
    iconSize: [35, 50],
    iconAnchor: [17.5, 50],
    popupAnchor: [0, -40]
  })

  const regionalMarker = L.icon({ 
    iconUrl: require('../../assets/icons/regional_pin.png'), 
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -30]
  })

  const localMarker = L.icon({ 
    iconUrl: require('../../assets/icons/local_pin.png'), 
    iconSize: [21, 30],
    iconAnchor: [10.5, 30],
    popupAnchor: [0, -20]
  })

  return (
    <LeafletMap
      ref={mapRef}
      center={[0, 0]}
      zoom={1}
      className="map w-100"
      bounceAtZoomLimits={true}
      bounds={bounds}
      minZoom={2}
      maxBounds={maxBounds}
      enableHighAccuracy={true}
      maxBoundsViscosity={1}
    >
      <TileLayer
        url={getMapUrl(state.language) + mapboxAccessToken}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        tileSize={512}
        id={'mapbox/light-v9'}
        zoomOffset={-1}>
      </TileLayer>
      {/*
      <ImageOverlay
        url="https://www.solidbackgrounds.com/images/1920x1080/1920x1080-gray-solid-color-background.jpg"
        bounds={bounds}>
      </ImageOverlay>
      */}
        {state.filteredRecords.map((record) => 
          <Marker 
            onClick={clickMarker}
            icon={record.pin_region_type == "country" ? nationalMarker : (record.pin_region_type == "state" ? regionalMarker : localMarker)}
            key={`marker-${record.source_name}`} 
            position={[record.pin_latitude, record.pin_longitude]}
          >
          <Popup autoClose={false} className="pin-popup">
            <div className="popup-title">
              {`${record.estimate_grade} study details`}
            </div>
            <div className="popup-heading">
              Study name
            </div>
            <div className="popup-text">
              {`${record.source_name}`}
            </div>
            <div className="popup-heading">
              Location
            </div>
            <div className="popup-text">
              {record.city && `${record.city}`}{record.city && record.state && ","} {record.state && `${record.state}`}{record.state && record.country && ","} {record.country && `${record.country}`}
            </div>
            <div className="popup-heading">
              Best seroprevalence (SP) estimate
            </div>
            <div className="popup-text">
              {record.seroprevalence ? `${record.seroprevalence * 100}%` : "N/A"}
            </div>
            <div className="popup-heading">
              N
            </div>
            <div className="popup-text">
              {`${record.denominator}`}
            </div>
            <div className="popup-heading">
              Age
            </div>
            <div className="popup-text">
              {record.age ? `${record.age.join(", ")}` : "N/A"}
            </div>
            <div className="popup-heading">
              Risk of Bias
            </div>
            <div className="popup-text">
              {`${record.overall_risk_of_bias}`}
            </div>
          </Popup>
        </Marker>
        )}
        {/*
        <Marker 
          icon={localMarker}
          key={`marker`} 
          position={[21.505, 1.05]}
        >
          <Popup>
            <span>Local<br/> Easily customizable.</span>
          </Popup>
        </Marker>
        <Marker 
          icon={regionalMarker}
          key={`marker`} 
          position={[51.505, 1.05]}
        >
          <Popup autoClose={false} draggable={true}>
            <span>Regional<br/> Easily customizable.</span>
          </Popup>
        </Marker>
        <Marker 
          icon={nationalMarker}
          key={`marker`} 
          position={[81.505, 1.05]}
        >
          <Popup>
            <span>National<br/> Easily customizable.</span>
          </Popup>
        </Marker>
        */}
      <GeoJSON
        onEachFeature={(feature, layer) => onAltEachFeature(feature, layer, mapRef, state.language)}
        ref={geoJsonRef}
        key={forceUpdate}
        data={mapRecords as GeoJSON.GeoJsonObject}
        style={(data) => altStyle(data, buckets)}>
      </GeoJSON>
      <Legend buckets={buckets} />
    </LeafletMap>
  );
}
