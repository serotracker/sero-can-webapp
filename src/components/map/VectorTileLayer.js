import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import { layerStyle } from './MapStyle';
import httpClient from "../../httpClient";
import _ from "lodash";
import { highlightVectorFeature, resetHighlightVectorFeature } from "../../utils/mapUtils";
// eslint-disable-next-line no-unused-vars
import VectorGrid from "leaflet.vectorgrid";

// custom componants for 2.X https://react-leaflet.js.org/legacy/docs/en/custom-components
// for 3.X + https://react-leaflet.js.org/docs/api-map/#mapcontainer
// <TileLayer url="https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer/tile/{z}/{y}/{x}.pbf" /> 
// above is wrong because mapbox doesn't know how to use ESRIs return pbf format into useable vector tiles :(
//  TEST: esriTilesUrl = "https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf";
// plugin for protobuffer to compile with the MapBox Vector Tile Specification https://leaflet.github.io/Leaflet.VectorGrid/vectorgrid-api-docs.html


// Parser for Esri ArcGis styles for leaflet.
// ArcGIS Vector labels do not work in the current version
const parseApiStyle = async (url) => {
  const api = new httpClient()

  // object to store layer descriptions
  const vectorTileLayerStyles = {};

  // get the actual JSON style file from the ArcGIS REST endpoint
  const data = await api.getEsriStyles(`${url}/resources/styles/root.json`);

  // loop over the layers property specifically for the JSON style
  data.layers.forEach(layer => {
    
    const layerName = layer["source-layer"];
    if (layer.type === "line") {
      vectorTileLayerStyles[layerName] = {
        weight: 1 ,
        color: layer.paint["line-color"],
        fillColor: layer.paint["fill-color"] || layerStyle.Default.color,
        opacity: 1
      };
    } else if (layer.type === "fill") {
      vectorTileLayerStyles[layerName] = {
        weight: 0,
        fillColor: layer.paint["fill-color"] || layerStyle.Default.color,
        fillOpacity: 1,
        fill: true 
      };
    } else if (layer.type === "symbol") {
      vectorTileLayerStyles[layerName] = {
        weight: 1,
        color: layer.paint["text-color"],
      };
    } else {
      // if the layer type is not a line, make the layer transparent
      vectorTileLayerStyles[layerName] = {
        opacity: 0
      };
    }
  });

  return vectorTileLayerStyles
};

export default function VectorTileLayer(props) {

  const { url, fetchApiStyle, front, zIndex, style } = props;
  const map = useMap();
  
  useEffect(() => {
      (async function buildVectorTileLayer() {

        var mappingStyle = style;
        
        if (fetchApiStyle)
        {
          const apiStyle = await parseApiStyle(url);

          if (apiStyle)
            mappingStyle = _.merge(apiStyle, style); // use styles from API but overwrite if found in mappingStyle
        }
        
        var layer = L.vectorGrid.protobuf(`${url}/tile/{z}/{y}/{x}.pbf`, {
          rendererFactory: L.canvas.tile,
          attribution: '',
          vectorTileLayerStyles: mappingStyle,
          zIndex: zIndex
        }
        ).addTo(map);

        if(front) 
        {
          layer.bringToFront();
        }

        return; 
      })();
  },[map])

  return null;
}
