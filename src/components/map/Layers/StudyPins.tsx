import { useState, useEffect, useContext } from "react"
import ReactDOMServer from "react-dom/server";
import StudyPopup from "components/map/Popups/StudyPopup";
import { AppContext } from "context";
import { AirtableRecord } from "types";
import httpClient from "httpClient";
import mapboxgl from "mapbox-gl";
import generateSourceFromRecords from "utils/GeoJsonGenerator";
import MapConfig from "components/map/MapConfig"

const StudyPins = (map: mapboxgl.Map | undefined, records: AirtableRecord[], showEstimatePins: boolean) => {

  const [state] = useContext(AppContext);
  const [api] = useState(new httpClient());

  useEffect(() => {
    if (map && records.length > 0 && map.getLayer("study-pins") === undefined) {
      const src = generateSourceFromRecords(records);
      map.addSource("study-pins", src);
      map.addLayer({
        id: "study-pins",
        type: "circle",
        source: "study-pins",
        paint: MapConfig.Studies
      });
    }
    else if (map && map.getLayer("study-pins")) {
      map.setLayoutProperty("study-pins", 'visibility', showEstimatePins ? 'visible' : 'none');

      var onlyGuid: (string | null)[] = records.map((r) => { return r.source_id })

    map?.setFilter('study-pins',
      ["in",
        ['get', 'source_id'],
        ["literal", onlyGuid]
      ]);
    }
  }, [map, records, showEstimatePins]);

  useEffect(() => {
    if (map) {
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
  }, [map, state.language, api])

  return;
}

export default StudyPins;