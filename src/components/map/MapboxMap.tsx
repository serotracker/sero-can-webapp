import ReactDOMServer from "react-dom/server";
import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "context";
import { EstimateGradePrevalence, LanguageType } from "types";
import mapboxgl from "mapbox-gl";
import httpClient from "httpClient";
import { getEsriVectorSourceStyle, addEsriLayersFromVectorSourceStyle } from "components/map/EsriMappingUtil";
import generateSourceFromRecords from "./GeoJsonGenerator";
import StudyPopup from "components/map/StudyPopup";
import CountryPopup from 'components/map/CountryPopup'
import "components/map/Map.css";
import "components/map/MapboxMap.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1Ijoic2Vyb3RyYWNrZXIiLCJhIjoiY2tha2d4bTdmMDJ3dzJ3azFqbnphdWlzZSJ9.IutISibpBV33t_7ybaCNTg";

const WHO_BASEMAP =
  "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer";
const WHO_COUNTRY_VECTORTILES =
  "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/Countries/VectorTileServer";

function mapOnLoad(map: mapboxgl.Map, api : httpClient, language: LanguageType) {
  map.on("styleimagemissing", (e: any) => {
    console.log("loading missing image: " + e.id);
    map.loadImage("http://placekitten.com/50/50", (error: any, image: any) => {
      if (error) throw error;
      if (!map.hasImage(e.id)) map.addImage(e.id, image);
    });
  });

  getEsriVectorSourceStyle(WHO_COUNTRY_VECTORTILES).then((style) => {
    addEsriLayersFromVectorSourceStyle(style, map);
    var styleJson = map.getStyle();


    if (styleJson && styleJson.layers)
    {
      for (let layer of styleJson.layers) {
        //@ts-ignore
        const t = layer['source-layer'];
        if (t === "DISPUTED_AREAS") {
          map.moveLayer('Countries', layer.id); // HACK for now, moves countries layer behind border once loaded.
          break;
        }
      }
    }
  });

  let countryPop = new mapboxgl.Popup({ offset: 5, className: "pin-popup", closeButton: false });
  let countryCode : string | undefined = undefined;

  // Connect mouse movement events
  map.on("mouseenter", "Countries", function (e : any) {
    if (e.features[0].state.hasData)
    {
      countryPop
      .setLngLat(e.lngLat)
      .trackPointer()
      .setHTML(ReactDOMServer.renderToString(CountryPopup(e.features[0], language)))
      .addTo(map);
    }
  });

  map.on("mouseleave", "Countries", function (e : any) {
    if (countryPop.isOpen())
    {
      countryPop.remove()
    }
  });

  map.on("mousemove", "Countries", function (e : any) {
    if (e.features.length > 0 && e.features[0].id !== countryCode) {
      if (e.features[0].state.hasData) {
        countryPop.setHTML(ReactDOMServer.renderToString(CountryPopup(e.features[0], language)))
        if(!countryPop.isOpen())
        {
          countryPop.addTo(map);
        }
      }
      else
      {
        countryPop.remove()
      }
        countryCode = e.features[0].id
      }
    });

  map.on("click", "study-pins", function (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
    const source_id = e.features[0].properties.source_id;

    api.getRecordDetails(source_id).then((record) => {
      if (record !== null){
        new mapboxgl.Popup({ offset: 5, className: "pin-popup" })
        .setLngLat(e.lngLat)
        .setHTML(ReactDOMServer.renderToString(StudyPopup(record)))
        .setMaxWidth("300px")
        .addTo(map);
      }
    });
  });

  map.on("mouseenter", "study-pins", function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "study-pins", function () {
    map.getCanvas().style.cursor = "";
  });
}



const MapboxGLMap = () : any => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [state] = useContext(AppContext);
  const api = new httpClient();
  const mapContainer = useRef<mapboxgl.Map>(null);

  // Creates map
  useEffect(() => {
    getEsriVectorSourceStyle(WHO_BASEMAP).then((baseMapStyle) => {
      const map = new mapboxgl.Map({
        //@ts-ignore
        container: mapContainerRef.current,
        style: baseMapStyle,
        center: [-80, 45],
        zoom: 5,
      });

      //@ts-ignore
      mapContainer.current = map;
      map.on("load", () => mapOnLoad(map, api, state.language));
    });
  }, [state.language]); // eslint-disable-line react-hooks/exhaustive-deps

  // Add Country highlighting to map
  useEffect(() => {
    if (state.explore.estimateGradePrevalences.length > 0) {
      state.explore.estimateGradePrevalences.forEach((country: EstimateGradePrevalence) => {
        if (country && country.testsAdministered) {
          //@ts-ignore
          mapContainer.current.setFeatureState(
            {
              source: "Countries",
              sourceLayer: "Countries",
              id: country.alpha3Code,
            },
            {
              hasData: true,
              testsAdministered: country.testsAdministered,
              geographicalName: country.geographicalName,
              numberOfStudies: country.numberOfStudies,
              localEstimate: country.localEstimate,
              nationalEstimate: country.nationalEstimate,
              regionalEstimate: country.regionalEstimate,
              sublocalEstimate: country.sublocalEstimate,
            }
          );
        }
      });
    }
  }, [state.explore.estimateGradePrevalences, state.language]);

  // Adds pins features to map
  useEffect(() => {
    const map = mapContainer?.current;
    if (state.explore.records.length > 0 && map !== null && map.getLayer("study-pins") === undefined) {
      const src = generateSourceFromRecords(state.explore.records);
      map.addSource("study-pins", src);
      map.addLayer({
        id: "study-pins",
        type: "circle",
        source: "study-pins",
        paint: {
          "circle-color": [
            "match",
            ["get", "estimate_grade"],
            "National",
            "#1485FF",
            "Regional",
            "#FFD400",
            "Local",
            "#FF2B35",
            "Sublocal",
            "#FF3AB0",
            /* default */ "#A0A0A0",
          ],
          "circle-radius": [
            "match",
            ["get", "estimate_grade"],
            "National",
            12,
            "Regional",
            10,
            "Local",
            7,
            "Sublocal",
            5,
            /* default */ 10,
          ],
          "circle-opacity": 0.6,
        },
      });
    }
  }, [state.explore.records]);

  return <div className="mapContainer w-100" ref={mapContainerRef} />;
}

export default MapboxGLMap;