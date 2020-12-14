import { latLngBounds } from "leaflet";
import React, { createRef, useContext, useEffect, useState } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import Countries from "../../assets/countries-geo.json";
import { AppContext } from "../../context";
import { getBuckets, getMapUrl, mapAltDataToFeatures } from "../../utils/mapUtils";
import Legend from "./Legend";
import './Map.css';
import VectorTileLayer from './VectorTileLayer.js';

export default function Map() {
  const mapRef = createRef<typeof MapContainer>();
  const geoJsonRef = createRef<typeof GeoJSON>();
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
  return (
    <MapContainer
      center={[0, 0]}
      zoom={1}
      className="map w-100"
      bounceAtZoomLimits={true}
      bounds={bounds}
      minZoom={2}
      maxBounds={maxBounds}
      maxBoundsViscosity={1}
    >

      <VectorTileLayer 
        url="https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/Countries/VectorTileServer"
        interactive
        getFeatureId={(feat : any) => feat.properties.CODE}
        zIndex={50}
        fetchApiStyle
      />

      <VectorTileLayer 
        url="https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer"
        fetchApiStyle
      />

      <VectorTileLayer 
        url="https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_Disputed_Areas_and_Borders_VTP/VectorTileServer"
        zIndex={70}
        fetchApiStyle
        front
      />

      <Legend buckets={buckets} />

      <TileLayer
        url={getMapUrl(state.language) + mapboxAccessToken}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        tileSize={512}
        id={'serotracker/ckigku3zy5ofb19maxsv6uokr'}
        zoomOffset={-1}
        zIndex={200}
      />

      {/*
      <GeoJSON
        onEachFeature={(feature, layer) => onAltEachFeature(feature, layer, mapRef, state.language)}
        key={forceUpdate}
        data={mapRecords as GeoJSON.GeoJsonObject}
        style={(data) => altStyle(data, buckets)}>
      </GeoJSON>
      */}
    </MapContainer>
  );
}
