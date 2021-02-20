//@ts-ignore
import mapboxgl, { Layer, MapboxEvent, MapLayerMouseEvent, RasterLayer, Style } from "mapbox-gl";
import generateSourceFromRecords from './GeoJsonGenerator'
import './MapboxMap';
import React, { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../../context";
import './Map.css';
import {getEsriVectorSourceStyle, addEsriLayersFromVectorSourceStyle} from "./EsriMappingUtil"

mapboxgl.accessToken = "pk.eyJ1Ijoic2Vyb3RyYWNrZXIiLCJhIjoiY2tha2d4bTdmMDJ3dzJ3azFqbnphdWlzZSJ9.IutISibpBV33t_7ybaCNTg";

const WHO_BASEMAP = "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer";
const WHO_COUNTRY_VECTORTILES = "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/Countries/VectorTileServer";
const WHO_DISPUTED_GEOGRAPHY = "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_Disputed_Areas_and_Borders_VTP/VectorTileServer";

export default function MapBox() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [state] = useContext(AppContext);
  const [mapRecords, setMapRecords] = useState(state.countries as any);
  const mapRef = useRef<mapboxgl.Map>(null);

  useEffect(() => {
    getEsriVectorSourceStyle(WHO_BASEMAP).then(baseMapStyle => {
      const map = new mapboxgl.Map({
        //@ts-ignore
        container: mapContainerRef.current,
        style: baseMapStyle,
        center: [-80, 45],
        zoom: 5,
      });
    


      //@ts-ignore
      mapRef.current = map;

      map.on("load", () => {
        
        getEsriVectorSourceStyle(WHO_COUNTRY_VECTORTILES).then(style => {
          addEsriLayersFromVectorSourceStyle(style, map);
        })

        getEsriVectorSourceStyle(WHO_DISPUTED_GEOGRAPHY).then(style => {
          addEsriLayersFromVectorSourceStyle(style, map);
        })

        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.on('click', 'study-pins', function (e : mapboxgl.MapMouseEvent & mapboxgl.EventData) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;
          
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          
          new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML("test")
          .addTo(map);
          });

        map.on('mousemove', 'Countries', function(e : any) {
          if (e.features.length > 0) {
          map.setFeatureState({
          source: 'Countries',
          sourceLayer: 'Countries',
          id: e.features[0].id,
          }, {
          hover: true
          });
          }
          });
      });
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.explore.estimateGradePrevalences.length > 0) {


      const countriesData = state.countries.map((country: any) => {
        const countryEstimate = state.explore.estimateGradePrevalences.find(element => element.alpha3Code === country.alpha3Code);

        if (countryEstimate && countryEstimate.testsAdministered) {

          //@ts-ignore
          mapRef.current.setFeatureState({
            source: 'Countries',
            sourceLayer: 'Countries',
            id: country.alpha3Code,
            }, {
              hasData: true
            });

          const { testsAdministered, geographicalName, numberOfStudies, localEstimate, nationalEstimate, regionalEstimate, sublocalEstimate } = countryEstimate;
          return { ...country, properties: { testsAdministered, geographicalName, numberOfStudies, localEstimate, nationalEstimate, regionalEstimate, sublocalEstimate } }
        }
        return { ...country, properties: { testsAdministered: null, geographicalName: null, numberOfStudies: null, localEstimate: null, nationalEstimate: null, regionalEstimate: null, sublocalEstimate: null } }
      })

      setMapRecords(countriesData);
    }
  }, [state.explore.estimateGradePrevalences, state.countries, state.language])

  // Adds pins features to map
  useEffect(() => {
    const map = mapRef?.current;
    if (state.explore.records.length > 0 && map !== null && map.getLayer('study-pins') === undefined) {
      const src = generateSourceFromRecords(state.explore.records);
      map.addSource('study-pins', src)
      map.addLayer({
        id: 'study-pins',
        type: 'circle',
        source: 'study-pins',
        paint: {
          'circle-color': ["match",
            ["get", 'estimate_grade'],
            "National", '#1485FF',
            "Regional", '#FFD400',
            "Local", '#FF2B35',
            "Sublocal", '#FF3AB0',
              /* default */ '#A0A0A0'
          ],
          'circle-radius': ["match",
            ["get", 'estimate_grade'],
            "National", 12,
            "Regional", 10,
            "Local", 7,
            "Sublocal", 5,
            /* default */ 10
          ],
          'circle-opacity': 0.6
          }
        });
    }
  },[state.explore.records])

  return (<div className="mapContainer w-100" ref={mapContainerRef}/>);
}
