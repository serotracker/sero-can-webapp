import mapboxgl from "mapbox-gl";
import httpClient from "../../httpClient";

// Params: url - to an esri vector tile service
// Returns: Modified style object with attributes for Mapbox GL JS compatability 
async function prepare(url: string) {

  const styleUrl = url + "/resources/styles/root.json";

  const api = new httpClient()

  let fetchedStyle = await api.getStyles(styleUrl);
  fetchedStyle.sprite = url + "/resources/styles/../sprites/sprite";
  fetchedStyle.glyphs = url + "/resources/styles/../fonts/{fontstack}/{range}.pbf";
  fetchedStyle.sources.esri = {
    type: 'vector',
    tiles: [url + "/tile/{z}/{y}/{x}.pbf"],
    maxzoom: 23,
  };

  return fetchedStyle;
};

// Params: url - to an esri vector tile service
// Returns: Mapbox style object with applied serotracker styling expressions
export async function getEsriVectorSourceStyle(url: string) {
    let style = await prepare(url)

    var source = style.sources.esri as mapboxgl.VectorSource;

    const l = style.layers[0] as mapboxgl.Layer;
    if (l.id === "Countries") {
      source.promoteId = { "Countries": "CODE" }
      l.paint = {
        'fill-outline-color' : "#455a64",
        'fill-color': [
          'case',
          ['boolean', ['feature-state', 'hasData'], false],
          "#97b1bd",
          "#ffffff"
        ]
      }
    }

    return style
}

// Params: mapbox style object, mapbox instance to add layers to
export function addEsriLayersFromVectorSourceStyle(style: any, map: mapboxgl.Map) {
  const sourceLayerId = style?.layers[0]["source-layer"] as string;

  map.addSource(sourceLayerId, style.sources.esri);

  style.layers.forEach((layer: any) => {
    layer.source = sourceLayerId;
    map.addLayer(layer);
  });
}
