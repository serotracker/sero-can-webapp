import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import { layerStyle } from './MapStyle';
import httpClient from "../../httpClient";
import _ from "lodash";
// eslint-disable-next-line no-unused-vars
import VectorGrid from "leaflet.vectorgrid";

// Parser for Esri ArcGis styles for leaflet.
// ArcGIS Vector labels do not work in the current version
const parseApiStyle = async (url) => {
  const api = new httpClient()

  // object to store layer descriptions
  const vectorTileLayerStyles = {};

  // get the actual JSON style file from the ArcGIS REST endpoint
  const data = await api.httpGet(`${url}/resources/styles/root.json`, false);

  // loop over the layers property specifically for the JSON style
  data.layers.forEach(layer => {
    
    const layerName = layer["source-layer"];
    if (layer.type === "line") {
      vectorTileLayerStyles[layerName] = {
        weight: 1 ,
        color: layer.paint["line-color"],
        fillColor: layer.paint["fill-color"] || layerStyle.Default.color,
        dashArray: layer.paint["line-dasharray"]?.join() || undefined,
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

        let mappingStyle = style;
        
        if (fetchApiStyle)
        {
          const apiStyle = await parseApiStyle(url);

          if (apiStyle)
            mappingStyle = _.merge(apiStyle, style); // use styles from API but overwrite if found in mappingStyle
        }
        
        const layer = L.vectorGrid.protobuf(`${url}/tile/{z}/{y}/{x}.pbf`, {
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
  },[fetchApiStyle, front, map, style, url, zIndex])

  return null;
}