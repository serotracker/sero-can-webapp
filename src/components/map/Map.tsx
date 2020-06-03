import { latLngBounds, Layer, LeafletMouseEvent } from "leaflet";
import React, { createRef, useContext, useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import { GeoJSON, Map as LeafletMap, TileLayer } from "react-leaflet";
import Countries from "../../assets/countries-geo.json";
import { AppContext } from "../../context";
import { getAggregateData } from "../../metaAnalysis";
import { AggregatedRecord, AggregationFactor } from "../../types";
import { getBuckets, getColor } from "../../utils/mapUtils";
import Translate from "../../utils/translate/translateService";
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
    const prevalenceCountryDict: Record<string, AggregatedRecord> = getAggregateData(state.filtered_records, AggregationFactor.country)
      .reduce((a, x: AggregatedRecord) => ({ ...a, [x.name]: x }), {})

    const importGeo = Countries as any;
    const features = importGeo.features as GeoJSON.Feature[]

    // We will iterate through all the features in the geoJson
    // if they are in the country dict we will attach their aggregated data to the feature for displaying
    importGeo.features = features.map(feature => {
      const country = prevalenceCountryDict[feature?.properties?.name];
      if (country && country.seroprevalence) {
        const { seroprevalence, error, n, num_studies } = country;
        return { ...feature, properties: { ...feature.properties, seroprevalence, error, n, num_studies } }
      }
      return { ...feature, properties: { ...feature.properties, seroprevalence: null, error: null, n: null, num_studies: null } }
    })
    setMapRecords(importGeo)

    // we need to update the key on the GEOJSON to let react know it's time to rerender
    setForceUpdate(Math.random())
  }, [state.filtered_records])


  const style = (feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined) => {
    return {
      fillColor: getColor(feature?.properties?.seroprevalence, buckets),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '0',
      fillOpacity: 0.7,
      zIndex: 650
    }
  }

  const highlightFeature = (e: LeafletMouseEvent) => {
    const layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
      zIndex: 200
    });
    layer.bringToFront();

  }

  const zoomToFeature = (e: LeafletMouseEvent) => {
    const map = mapRef?.current?.leafletElement
    map?.fitBounds(e.target.getBounds());
  };

  const resetHighlight = (e: LeafletMouseEvent) => {
    const layer = e.target;

    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '',
      fillOpacity: 0.7
    });
  };

  const seroPrevalence = Translate("Seroprevalence")
  const confInterval = Translate("95%ConfidenceInterval");
  const tests = Translate("95%TotalTests");
  const totalEstimates = Translate('TotalEstimates');
  const noData = Translate('NoData')

  const createPopup = (properties: any) => {
    if (properties.seroprevalence) {
      let error = properties?.error;
      return (
        <div className="col-12 p-0 flex">
          <div className="col-12 p-0 popup-header">{properties.name}</div>
          <div className="col-12 p-0 popup-content">{seroPrevalence}: {properties?.seroprevalence.toFixed(2)}%</div>
          <div className="col-12 p-0 popup-content">{confInterval}: {(properties?.seroprevalence - error[0]).toFixed(2)}%-{(properties?.seroprevalence + error[1]).toFixed(2)}%</div>
          <div className="col-12 p-0 popup-content">{tests}: {properties?.n}</div>
          <div className="col-12 p-0 popup-content">{totalEstimates}: {properties?.num_studies}</div>
        </div>)
    };
    return (
      <div className="col-12 p-0 flex">
        <h3 className="col-12 p-0 flex popup-header">{properties.name}</h3>
        <div className="col-12 p-0 flex popup-content">{noData}</div>
      </div>)
  }


  // This method sets all the functionality for each GeoJSON item
  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {

    layer.bindPopup(ReactDOMServer.renderToString(createPopup(feature.properties)), { closeButton: false, autoPan: false });

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        layer.openPopup();
        highlightFeature(e)
      },
      mouseout: (e: LeafletMouseEvent) => {
        layer.closePopup();
        resetHighlight(e)
      },
      mousemove: (e: LeafletMouseEvent) => {
        layer.getPopup()?.setLatLng(e.latlng);
      },
      click: (e: LeafletMouseEvent) => {
        zoomToFeature(e);
      }
    })
  }

  const bounds = latLngBounds([-90, -200], [90, 180]);
  const maxBounds = latLngBounds([-90, -200], [90, 200]);

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_API_KEY;
  return (
    <LeafletMap
      ref={mapRef}
      center={[0, 0]}
      zoom={2}
      className="map w-100"
      bounceAtZoomLimits={true}
      bounds={bounds}
      minZoom={2}
      maxBounds={maxBounds}
      enableHighAccuracy={true}
      maxBoundsViscosity={1}
    >
      <TileLayer
        url={'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        tileSize={512}
        id='mapbox/light-v9'
        zoomOffset={-1}>
      </TileLayer>
      <GeoJSON
        onEachFeature={onEachFeature}
        ref={geoJsonRef}
        key={forceUpdate}
        data={mapRecords as GeoJSON.GeoJsonObject}
        style={(data) => style(data)}>
      </GeoJSON>
      <Legend buckets={buckets} />
    </LeafletMap>
  );
}
