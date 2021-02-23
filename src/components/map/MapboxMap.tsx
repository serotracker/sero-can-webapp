import ReactDOMServer from "react-dom/server";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "context";
import { EstimateGradePrevalence, LanguageType } from "types";
import mapboxgl from "mapbox-gl";
import httpClient from "httpClient";
import { getEsriVectorSourceStyle, addEsriLayersFromVectorSourceStyle } from "components/map/EsriMappingUtil";
import generateSourceFromRecords from "./GeoJsonGenerator";
import StudyPopup from "components/map/StudyPopup";
import CountryPopup from 'components/map/CountryPopup'
import Legend from "components/map/Legend"
import MapConfig from "components/map/MapConfig"
import "components/map/Map.css";
import "components/map/MapboxMap.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY as string;

const WHO_BASEMAP =
  "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer";
const WHO_COUNTRY_VECTORTILES =
  "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/Countries/VectorTileServer";

function mapOnLoad(map: mapboxgl.Map, api: httpClient, language: LanguageType) {

  getEsriVectorSourceStyle(WHO_COUNTRY_VECTORTILES).then((style) => {
    addEsriLayersFromVectorSourceStyle(style, map);
    const styleJson: any = map.getStyle();
    if (styleJson && styleJson.layers) {
      for (let layer of styleJson.layers) {
        const t = layer['source-layer'];
        if (t === "DISPUTED_AREAS") {
          map.moveLayer('Countries', layer.id); // HACK for now, moves countries layer behind border once loaded.
          break;
        }
      }
    }
  });

  let countryPop = new mapboxgl.Popup({ offset: 5, className: "pin-popup", closeButton: false });

  let countryCode: string | undefined = undefined;

  // Connect mouse movement events
  map.on("mouseenter", "Countries", function (e: any) {
    if (e.features[0].state.hasData) {
      countryPop.setLngLat(e.lngLat)
        .trackPointer()
        .setMaxWidth("250px")
        .setHTML(ReactDOMServer.renderToString(CountryPopup(e.features[0], language)))
        .addTo(map);
    }
  });

  map.on("mouseleave", "Countries", function (e: any) {
    if (countryPop.isOpen()) {
      countryPop.remove()
    }
  });

  map.on("mousemove", "Countries", function (e: any) {
    if (e.features.length > 0 && e.features[0].id !== countryCode) {
      if (e.features[0].state.hasData) {
        countryPop.setHTML(ReactDOMServer.renderToString(CountryPopup(e.features[0], language)))
        if (!countryPop.isOpen()) {
          countryPop.addTo(map)
        }
      }
      else {
        countryPop.remove()
      }
      countryCode = e.features[0].id
    }
  });

  map.on("click", "study-pins", function (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
    const source_id = e.features[0].properties.source_id;

    api.getRecordDetails(source_id).then((record) => {
      if (record !== null) {
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

const MapboxGLMap = (): any => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [state] = useContext(AppContext);
  const api = new httpClient();
  const [mapRef, setMap] = useState<mapboxgl.Map | undefined>(undefined);

  // Creates map
  useEffect(() => {
    if (!mapRef) {
      getEsriVectorSourceStyle(WHO_BASEMAP).then((baseMapStyle) => {
        const map = new mapboxgl.Map({
          //@ts-ignore
          container: mapContainerRef.current,
          style: baseMapStyle,
          center: [-80, 45],
          zoom: 5,
        });

        map.on("load", () => mapOnLoad(map, api, state.language));
        setMap(map);
      });
    }
  });

  // Add Country highlighting to map
  useEffect(() => {
    if (state.explore.estimateGradePrevalences.length > 0 && mapRef) {
      state.explore.estimateGradePrevalences.forEach((country: EstimateGradePrevalence) => {
        if (country && country.testsAdministered && mapRef) {
          mapRef.setFeatureState(
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
  }, [mapRef, state.explore.estimateGradePrevalences, state.language]);

  // Adds pins features to map
  useEffect(() => {
    if (mapRef && state.explore.records.length > 0 && mapRef && mapRef.getLayer("study-pins") === undefined) {
      const src = generateSourceFromRecords(state.explore.records);
      mapRef.addSource("study-pins", src);
      mapRef.addLayer({
        id: "study-pins",
        type: "circle",
        source: "study-pins",
        paint: MapConfig.Studies
      });
    }
    else if (mapRef && mapRef.getLayer("study-pins")) {
      mapRef.setLayoutProperty("study-pins", 'visibility', state.showEstimatePins ? 'visible' : 'none');
    }
  }, [mapRef, state.explore.records, state.showEstimatePins]);

  //@ts-ignore
  return <div className="mapContainer w-100" ref={el => (mapContainerRef.current = el)}>
    <Legend />
  </div>;
}

export default MapboxGLMap;