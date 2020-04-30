import { Layer } from "leaflet";
import React, { createRef, useContext } from "react";
import { GeoJSON, Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import Countries from "../../assets/countries-geo.json";
import { AppContext } from "../../context";
import Legend from "./Legend";
import './Map.css';
import { AirtableRecord } from "../../types";

const countryDict = Countries.features.reduce((map, obj) => {
  map[obj.name_sort] = obj
})

export default function Map() {
  const [state, dispatch] = useContext(AppContext);
  const fileImport = Countries  as any;
  const geoJsonData = fileImport.features as GeoJSON.FeatureCollection

  const fakeFilteredData: AirtableRecord[] = [ ]
  geoJsonData.features.forEach(o => )
  // state.filtered_records.map(o => o.)

  const mapRef = createRef<LeafletMap>();
  const geoJsonRef = createRef<GeoJSON>();

  const style = (feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined) => {
    return {
      fillColor: getColor(feature?.properties?.labelrank),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    }
  }

  // TODO: abstract this to utils function
  const getColor = (d: number) => {
    return d === 1 ? '#800026' :
      d === 2 ? '#BD0026' :
        d === 3 ? '#E31A1C' :
          d === 4 ? '#FC4E2A' :
            d === 5 ? '#FD8D3C' :
              d === 6 ? '#FEB24C' :
                d === 7 ? '#FED976' :
                  '#FFEDA0';
  }

  //TODO: add in typing for event
  const highlightFeature = (e: any) => {
    const layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
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

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_API_KEY;
  console.log(process.env);
  return (
    <LeafletMap
      ref={mapRef}
      zoom={10}
      className="map"
      bounceAtZoomLimits={true}
      bounds={[[-90, 200], [90, 200]]}
      zoomDelta={0.1}
      minZoom={2.3}
      maxBounds={[[-90, -200], [90, 200]]}
      enableHighAccuracy={true}
      maxBoundsViscosity={1}>
      <TileLayer
        url={'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        tileSize={512}
        id='mapbox/light-v9'
        zoomOffset={-1} />
      <GeoJSON
        onEachFeature={onEachFeature}
        ref={geoJsonRef}
        data={Countries as GeoJSON.GeoJsonObject}
        style={(data) => style(data)} />

      <Marker position={[0, 0]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
      </Marker>
      <Legend/>
    </LeafletMap>
  );
}