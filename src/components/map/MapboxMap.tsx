import React from "react";
import mapboxgl, { Layer, RasterLayer } from "mapbox-gl";
import httpClient from "../../httpClient";
import './MapboxMap';

mapboxgl.accessToken = "pk.eyJ1Ijoic2Vyb3RyYWNrZXIiLCJhIjoiY2tha2d4bTdmMDJ3dzJ3azFqbnphdWlzZSJ9.IutISibpBV33t_7ybaCNTg";

interface state {
    lng: number,
    lat: number,
    zoom: number
  }

// Takes in the style JSON object from VectorTileServer API response 
// Modifies & adds attributes for Mapbox GL compatability 
async function prepare(url : string) {

  const styleUrl = url+"/resources/styles/root.json";

  const api = new httpClient()

  let fetchedStyle = await api.getStyles(styleUrl);
  fetchedStyle.sprite = url+"/resources/styles/../sprites/sprite";
  fetchedStyle.glyphs = url+"/resources/styles/../fonts/{fontstack}/{range}.pbf";
  fetchedStyle.sources.esri = {
    type: 'vector',
    tiles: [url+"/tile/{z}/{y}/{x}.pbf"],
    maxzoom: 23,  
    };

  return fetchedStyle;
};

function addEsriLayer(map : mapboxgl.Map, url : string){
  prepare(url).then((style : mapboxgl.Style) => {
    const layerGuid = "esri"+(Math.random().toString())
    var source = style?.sources?.esri as mapboxgl.VectorSource;

    //@ts-ignore
    const l = style?.layers[0];
    if(l?.id === "Countries")
    {
      source.promoteId = {"Countries": "CODE"}
    }
    map.addSource(layerGuid, source as mapboxgl.VectorSource);


    style?.layers?.forEach((layer : any) => {
      layer.source = layerGuid
      map.addLayer(layer)
    });
  })
}

class MapboxMap extends React.Component {
  mapContainer: string | HTMLElement = "";
  state: state;

  constructor(props : any) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
    };
  }

  componentDidMount() {

    var map : mapboxgl.Map;

    // Sets WHO polygons as basemap
    prepare("https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer").then((style) => {
    map = new mapboxgl.Map({
        container: this.mapContainer,
        style: style,
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom,
      });

    map.on('load', () => {
      addEsriLayer(map, "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_Disputed_Areas_and_Borders_VTP/VectorTileServer")
      addEsriLayer(map, "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/Countries/VectorTileServer")
      var e = map.getSource('esri')
      console.log(e)
    })

    var hoveredStateId : any = null;
    // When the user moves their mouse over the state-fill layer, we'll update the
    // feature state for the feature under the mouse.
    map.on('mousemove', 'Land/1', function (e : any) {
        var f = e?.features[0]?.layer
        f.paint = {
          "fill-color" : "rgba(255, 255, 0, 1)"
        }
        var layer = map.getLayer('Countries');
        var layer2 = map.getLayer('Land/1');
        /*
        var features = map.querySourceFeatures('Land/1', {
          sourceLayer: 'Land'
          });
          */
        var features2 = map.queryRenderedFeatures(undefined, { layers: ['Countries'] });
        var features2 = map.queryRenderedFeatures(undefined, { layers: ['Land/1'] });
        var features3 = map.querySourceFeatures('Land/1');
        console.log(e)
      });
      
      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on('mouseleave', 'esri', function () {
      if (hoveredStateId) {
      map.setFeatureState(
      { source: 'states', id: hoveredStateId },
      { hover: false }
      );
      }
      hoveredStateId = null;
      });
  })
  }

  render() {
    return (
        <div ref={(el) => (this.mapContainer = el ?? "")} className="mapContainer w-100" />
    );
  }
}

export default MapboxMap;
