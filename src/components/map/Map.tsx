import L, { latLngBounds, Layer, LeafletMouseEvent } from "leaflet";
import React, { createRef, useContext, useEffect, useState, useRef } from "react";
import { GeoJSON, Map as LeafletMap, TileLayer } from "react-leaflet";
import Countries from "../../assets/countries-geo.json";
import { AppContext } from "../../context";
import { getAggregateData } from "../../metaAnalysis";
import Legend from "./Legend";
import './Map.css';
import { AggregationFactor } from "../../types";

export default function Map() {
  const mapRef = createRef<LeafletMap>();
  const geoJsonRef = createRef<GeoJSON>();
  const [state] = useContext(AppContext);
  const [mapRecords, setMapRecords] = useState(Countries as any);
  const [forceUpdate, setForceUpdate] = useState(Math.random());

  const colors = [
    '#76E57F', '#62CA7C', '#4FB079', '#3B9577', '#277A74', '#146071', '#00456E', "#EEEEEE"
  ]

  useEffect(() => {
    const prevalenceCountryDict = getAggregateData(state.filtered_records, AggregationFactor.country).reduce((a, x) => ({ ...a, [x.name]: x.seroprevalence }), {})
    const importGeo = Countries as any;
    const features = importGeo.features as GeoJSON.Feature[]
    importGeo.features = features.map(feature => {
      const seroprevalence = prevalenceCountryDict[feature?.properties?.name as string];
      if (seroprevalence) {
        return { ...feature, properties: { ...feature.properties, seroprevalence } }
      }
      return { ...feature, properties: { ...feature.properties, seroprevalence: null } }
    })
    setMapRecords(importGeo)
    // we need to update the key on the GEOJSON to let react know it's time to rerender
    setForceUpdate(Math.random())
  }, [state.filtered_records])


  const style = (feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined) => {
    return {
      fillColor: getColor(feature?.properties?.seroprevalence),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '0',
      fillOpacity: 0.7,
      zIndex: 650
    }
  }

  const getBuckets = (features: GeoJSON.Feature[]) => {
    const maxSeroprevalence = Math.max.apply(Math, features.filter(o => o.properties?.seroprevalence).map((o) => o?.properties?.seroprevalence));
    const roundedMax = Math.ceil(maxSeroprevalence);
    const step = parseFloat((roundedMax / 6).toFixed(1));
    const buckets = [0];
    for (let x = 1; x <= 6; x++) {
      buckets.push(parseFloat((step * x).toFixed(1)))
    }
    return buckets;
  }

  const buckets: Array<number> = getBuckets(mapRecords.features);

  // TODO: abstract this to utils function
  const getColor = (d: number | null) => {
    if (d === null) {
      return colors[7];
    }
    return d <= buckets[1] ? colors[0] :
      d <= buckets[2] ? colors[1] :
        d <= buckets[3] ? colors[2] :
          d <= buckets[4] ? colors[3] :
            d <= buckets[5] ? colors[4] :
              d <= buckets[6] ? colors[5] :
                colors[6]
  }

  //TODO: add in typing for event
  const highlightFeature = (e: any) => {
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

  //TODO: add in typing for event
  const zoomToFeature = (e: any) => {
    const map = mapRef?.current?.leafletElement
    map?.fitBounds(e.target.getBounds());
  };

  //TODO: add in typing for event
  const resetHighlight = (e: any) => {
    const layer = e.target;

    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    });
  };

  // This method sets all the functionality for each GeoJSON item
  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    if (feature.properties?.seroprevalence) {
      layer.bindPopup(`${feature.properties.name}: ${feature.properties?.seroprevalence.toFixed(2)}%`, { closeButton: false, autoPan: false });
    }
    else {
      layer.bindPopup(`${feature.properties?.name}: No data recorded`, { closeButton: false, autoPan: false });
    }

    layer.on({
      mouseover: () => { layer.openPopup() },
      mouseout: () => { layer.closePopup(); },
      mousemove: (e: LeafletMouseEvent) => {
        layer.getPopup()?.setLatLng(e.latlng);
      }
    })
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
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
      <Legend buckets={buckets} getColor={getColor} />
    </LeafletMap>
  );
}
