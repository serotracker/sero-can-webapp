import React, { useEffect  } from "react";
import { useLeaflet } from "react-leaflet";
import L from 'leaflet';
import VectorGrid from "leaflet.vectorgrid";
import VectorTile from "leaflet.vectorgrid/dist/Leaflet.VectorGrid.js";
import Pbf from "leaflet.vectorgrid/dist/Leaflet.VectorGrid.js";
import esriStyle from './EsriStyle';

// custom componants for 2.X https://react-leaflet.js.org/legacy/docs/en/custom-components
// for 3.X + https://react-leaflet.js.org/docs/api-map/#mapcontainer
// <TileLayer url="https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer/tile/{z}/{y}/{x}.pbf" /> 
// above is wrong because mapbox doesn't know how to use ESRIs return pbf format into useable vector tiles :(


// plugin for protobuffer to compile with the MapBox Vector Tile Specification https://leaflet.github.io/Leaflet.VectorGrid/vectorgrid-api-docs.html

/*
  TODO: handle styling issues with protocol buffering, esri/mapbox
*/

export default function VectorTileLayer() {

  //var esriTilesUrl = "https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf";
  var esriTilesUrl = "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer/tile/{z}/{y}/{x}.pbf";
  const { map } = useLeaflet();
  
  var esriVectorTileOptions = {
    rendererFactory: L.canvas.tile,
    attribution: '© ESRI',
    vectorTileLayerStyles: esriStyle,
  };
  

  var esriTilesPbfLayer = L.vectorGrid.protobuf(esriTilesUrl, esriVectorTileOptions).addTo(map);;
  // todo: keep a state in this component and only added the layer to the map on load. might need to look at react-leaflet life cycle methods for this one.

  useEffect(() => {
    
  })

  return null;
}
