import { Layer, LatLngBounds, latLngBounds } from "leaflet";
import React, { createRef, useContext } from "react";
import { GeoJSON, Map as LeafletMap, TileLayer, LatLng } from "react-leaflet";
import Countries from "../../assets/countries-geo.json";
import { AppContext } from "../../context";
import { getAggregateData } from "../../metaAnalysis";
import Legend from "./Legend";
import './Map.css';

export default function Map() {
  const fileImport = Countries as any;
  const geoJsonData = fileImport.features as GeoJSON.Feature[]
  const mapRef = createRef<LeafletMap>();
  const geoJsonRef = createRef<GeoJSON>();
  const [state, dispatch] = useContext(AppContext);

  const prevalenceCountryDict = getAggregateData(state.filtered_records, "country").reduce((a, x) => ({ ...a, [x.name]: x.seroprevalence }), {})
  fileImport.features = geoJsonData.map(feature => {
    const seroprevalence = prevalenceCountryDict[feature?.properties?.name_sort as string];
    if (seroprevalence) {
      return { ...feature, properties: { ...feature.properties, seroprevalence } }
    }
    return { ...feature, properties: { ...feature.properties, seroprevalence: null } }
  })

  const style = (feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined) => {
    return {
      fillColor: getColor(feature?.properties?.seroprevalence),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      zIndex: 650
    }
  }

  const getBuckets = (features: GeoJSON.Feature[]) => {
    const maxSeroprevalence = Math.max.apply(Math, features.filter(o => o.properties?.seroprevalence).map((o) => o?.properties?.seroprevalence));
    const roundedMax = Math.ceil(maxSeroprevalence);
    const step = parseFloat((roundedMax / 6).toFixed(1));
    const buckets = [];
    for (let x = 1; x <= 6; x++) {
      buckets.push(parseFloat((step * x).toFixed(1)))
    }
    return buckets;
  }

  const buckets: Array<number> = getBuckets(fileImport.features);

  // TODO: abstract this to utils function
  const getColor = (d: number | null) => {
    if (d === null) {
      return "#EEEEEE"
    }
    return d <= buckets[0] ? '#F8FCF1' :
      d <= buckets[1] ? '#D2EAC8' :
        d <= buckets[2] ? '#B3DCB8' :
          d <= buckets[3] ? '#8ECAC4' :
            d <= buckets[4] ? '#6AB1CF' :
              d <= buckets[5] ? '#498ABA' :
                '#265799';
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
        center={[0,0]}
        zoom={2}
        className="map w-100 h-94"
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
          data={fileImport as GeoJSON.GeoJsonObject}
          style={(data) => style(data)}>
        </GeoJSON>
        <Legend buckets={buckets} />
      </LeafletMap>
  );
}
