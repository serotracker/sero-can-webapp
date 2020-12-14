import { latLngBounds } from "leaflet";
import L from 'leaflet';
import React, { createRef, useContext, useEffect, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, MapConsumer, Pane, useMap } from "react-leaflet";
import Countries from "../../assets/countries-geo.json";
import { AppContext } from "../../context";
import { mapAltDataToFeatures } from "../../utils/mapUtils";
import Legend from "./Legend";
import './Map.css';

export default function MapLayers() {
  const [state] = useContext(AppContext);
  const [mapRecords, setMapRecords] = useState(Countries as any);
  const [forceUpdate, setForceUpdate] = useState(Math.random());
  const map = useMap();

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
  
  useEffect(() => {

    var labels = map.createPane('labels');
    labels.style.zIndex = "500";
    labels.style.pointerEvents = 'none';

    var positronLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        pane: 'labels'
    }).addTo(map);
  },[])

  return null;
}
