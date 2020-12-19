import React from "react";
import mapboxgl from "mapbox-gl";
import httpClient from "../../httpClient";
import './MapboxMap';

mapboxgl.accessToken = "pk.eyJ1Ijoic2Vyb3RyYWNrZXIiLCJhIjoiY2tha2d4bTdmMDJ3dzJ3azFqbnphdWlzZSJ9.IutISibpBV33t_7ybaCNTg";

interface state {
    lng: number,
    lat: number,
    zoom: number
  }

function format (style : any, metadata : any, endpointUrl : any) {
// ArcGIS Pro published vector services dont prepend tile or tileMap urls with a /
style.sources.esri = {
    type: 'vector',
    scheme: 'xyz',
    tilejson: metadata.tilejson || '2.0.0',
    format: (metadata.tileInfo && metadata.tileInfo.format) || 'pbf',
    /* mapbox-gl-js does not respect the indexing of esri tiles
    because we cache to different zoom levels depending on feature density, in rural areas 404s will still be encountered.
    more info: https://github.com/mapbox/mapbox-gl-js/pull/1377
    */
    index: metadata.tileMap ? style.sources.esri.url + '/' + metadata.tileMap : null,
    maxzoom: 15,  
    tiles: [
        //style.sources.esri.url + '/' + metadata.tiles[0]
        "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_Disputed_Areas_and_Borders_VTP/VectorTileServer/tile/{z}/{y}/{x}.pbf"
    ],
    description: metadata.description,
    name: metadata.name
    };
    return style;
}

async function prepare() {

    const styleUrl = "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_Disputed_Areas_and_Borders_VTP/VectorTileServer/resources/styles/root.json"
    const metadataUrl = "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_Disputed_Areas_and_Borders_VTP/VectorTileServer";

    const api = new httpClient()

    const fetchedStyle = await api.getStyles(styleUrl);
    const fetchedmetadata = await api.getStyles(metadataUrl);

    const style = format(fetchedStyle, fetchedmetadata, styleUrl);

    return style;
};

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

    var map : any;

    prepare().then((style) => {
        map = new mapboxgl.Map({
            container: this.mapContainer,
            // @ts-ignore
            style: style,
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
          });

        map.on("move", () => {
        this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2),
        });
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
