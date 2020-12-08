import { latLngBounds } from "leaflet";
import React, { createRef, useContext, useEffect, useState } from "react";
import { GeoJSON, Map as LeafletMap, TileLayer } from "react-leaflet";
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
    const importGeo = Countries as any;
    const features = importGeo.features as GeoJSON.Feature[]
    // We will iterate through all the features in the geoJson
    // if they are in the country dict we will attach their aggregated data to the feature for displaying
    importGeo.features = mapAltDataToFeatures(features, state.explore.estimateGradePrevalences);
    setMapRecords(importGeo)

    // we need to update the key on the GEOJSON to let react know it's time to rerender
    setForceUpdate(Math.random())
  }, [state.explore.estimateGradePrevalences])

  const bounds = latLngBounds([-90, -200], [90, 180]);
  const maxBounds = latLngBounds([-90, -200], [90, 200]);

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_API_KEY;
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
