import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import { layerStyle } from './MapStyle';
import httpClient from "../../httpClient";
import _ from "lodash";
// TODO: Write definitions for leaflet vectorgrid ---> Ewan
// @ts-ignore
import VectorGrid from "leaflet.vectorgrid";

// Parser for Esri ArcGis styles for leaflet.
// ArcGIS Vector labels do not work in the current version
const parseApiStyle = async (url: string) => {
  const api = new httpClient()

  // object to store layer descriptions
  const vectorTileLayerStyles: any = {};

  // get the actual JSON style file from the ArcGIS REST endpoint
  const data = await api.httpGet(`${url}/resources/styles/root.json`, false);

  // loop over the layers property specifically for the JSON style
  data.layers.forEach((layer: any) => {

    const layerName = layer["source-layer"];
    switch (layer.type) {
      case "line":
        vectorTileLayerStyles[layerName] = {
          weight: 1,
          color: layer.paint["line-color"],
          fillColor: layer.paint["fill-color"] || layerStyle.Default.color,
          dashArray: layer.paint["line-dasharray"]?.join() || undefined,
          opacity: 1
        };
        break;
      case "fill":
        vectorTileLayerStyles[layerName] = {
          weight: 0,
          fillColor: layer.paint["fill-color"] || layerStyle.Default.color,
          fillOpacity: 1,
          fill: true
        };
        break;
      case "symbol":
        vectorTileLayerStyles[layerName] = {
          weight: 1,
          color: layer.paint["text-color"],
        };
        break;
      default: {
        vectorTileLayerStyles[layerName] = {
          opacity: 0
        };
        break;
      }
    }


    return vectorTileLayerStyles
  });
}


export default function VectorTileLayer(props: any) {

  const { url, fetchApiStyle, front, zIndex, style } = props;
  const map = useMap();

  useEffect(() => {
    (async function buildVectorTileLayer() {

      let mappingStyle = style;

      // @ts-ignore
      if (fetchApiStyle && L.vectorGrid) {
        const apiStyle: any = await parseApiStyle(url);
        if (apiStyle) {
          mappingStyle = _.merge(apiStyle, style); // use styles from API but overwrite if found in mappingStyle}
        }
        // @ts-ignore
        const layer = L.vectorGrid.protobuf(`${url}/tile/{z}/{y}/{x}.pbf`, {
          // @ts-ignore
          rendererFactory: L.canvas.tile,
          attribution: '',
          vectorTileLayerStyles: mappingStyle,
          zIndex: zIndex
        }
        ).addTo(map);

        if (front) {
          layer.bringToFront();
        }

        return;
      }
    })();
  }, [fetchApiStyle, front, map, style, url, zIndex])

  return null;
}
