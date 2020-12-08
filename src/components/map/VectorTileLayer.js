import { useEffect } from "react";
import { useLeaflet } from "react-leaflet";
import L from 'leaflet';
// eslint-disable-next-line no-unused-vars
import VectorGrid from "leaflet.vectorgrid";
import basestyle from "./basestyle.js"
import esriStyle from './EsriStyle';
import httpClient from "../../httpClient";

// custom componants for 2.X https://react-leaflet.js.org/legacy/docs/en/custom-components
// for 3.X + https://react-leaflet.js.org/docs/api-map/#mapcontainer
// <TileLayer url="https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer/tile/{z}/{y}/{x}.pbf" /> 
// above is wrong because mapbox doesn't know how to use ESRIs return pbf format into useable vector tiles :(
//  TEST: esriTilesUrl = "https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf";

// plugin for protobuffer to compile with the MapBox Vector Tile Specification https://leaflet.github.io/Leaflet.VectorGrid/vectorgrid-api-docs.html

/*
  TODO: handle styling issues with protocol buffering, esri/mapbox
*/

/*
interface VectorTileLayerProps {
  url: string
}
*/

const styleUrl = "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer/resources/styles/root.json";

const prepareStyle = async (url, map) => {
  const api = new httpClient()

  // object to store layer descriptions
  const vectorTileLayerStyles = {};

  // get the actual JSON style file from the ArcGIS REST endpoint
  const data = await api.getEsriStyles(styleUrl);

  // loop over the layers property specifically for the JSON style
  data.layers.forEach(layer => {
    // only work with layers that are 'type === line', in this case.
    // Modify as needed, but ArcGIS Vector labels do not work for me in the current version
    const layerName = layer["source-layer"];
    if (layer.type === "line") {
      // add layer to style placeholder using layer name property
      vectorTileLayerStyles[layerName] = {
        weight: 2 ,
        color: layer.paint["line-color"],
        opacity: 1
      };
    } else if (layer.type === "fill") {
      vectorTileLayerStyles[layerName] = {
        weight: 1,
        color: layer.paint["fill-color"],
        opacity: 1,
        fillColor: layer.paint["fill-color"],
        fillOpacity: 1,
      };
    }
    else {
      // if the layer type is not a line, make the layer transparent
      vectorTileLayerStyles[layerName] = {
        opacity: 0
      };
    }
  });


  L.vectorGrid.protobuf(`${url}/tile/{z}/{y}/{x}.pbf`, {
    rendererFactory: L.canvas.tile,
    attribution: '© ESRI',
    vectorTileLayerStyles: vectorTileLayerStyles
  }
  ).addTo(map);
};

const init = async (url, map) => {
  return await prepareStyle(url, map);
}

export default function VectorTileLayer(props) {

  const { url } = props;
  const { map } = useLeaflet();
  
  useEffect(() => {
      init(url, map);
      console.log(`Added Layer ${url}`);
  },[])

  return null;
}
