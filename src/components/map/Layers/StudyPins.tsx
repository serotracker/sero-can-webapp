import { useState, useEffect, useContext } from "react"
import ReactDOMServer from "react-dom/server";
import StudyPopup from "components/map/Popups/StudyPopup";
import { AppContext } from "context";
import { AirtableRecord } from "types";
import httpClient from "httpClient";
import usePrevious from "utils/usePrevious"
import mapboxgl from "mapbox-gl";
import generateSourceFromRecords from "utils/GeoJsonGenerator";
import MapConfig from "components/map/MapConfig"

const togglePinBlur = (map: mapboxgl.Map, selectedPinId?: string) => {
  const features = map.querySourceFeatures('study-pins', {
    sourceLayer: 'study-pins'
    });
  
  features.forEach(x => {
    const isBlurred = (selectedPinId === x?.id || selectedPinId === undefined) ? false : true
    map.setFeatureState(
      {
        source: "study-pins",
        id: x?.id,
      },
      {
        isBlurred: isBlurred,
      }
    );
  })
}

const StudyPins = (map: mapboxgl.Map | undefined, records: AirtableRecord[]) => {

  const [state] = useContext(AppContext);
  const [api] = useState(new httpClient());
  const [selectedPinId, setSelectedPinId] = useState<string | undefined>(undefined);
  const prevSelectedPinId = usePrevious(selectedPinId)

  useEffect(() => {
    if(map){
      const src = generateSourceFromRecords(records);
      if(map.getLayer("study-pins") === undefined){
        map.addSource("study-pins", src);
        map.addLayer({
          id: "study-pins",
          type: "circle",
          source: "study-pins",
          paint: MapConfig.Studies as mapboxgl.CirclePaint
        });
      }
      else{
        const studyPinsSource = map.getSource("study-pins") as any;
        studyPinsSource.setData(src.data);
      }
    }
  }, [map, records]);

  useEffect(() => {
    if (map) {
      map?.setFilter('study-pins',
      [
        "match",
        ["get", "estimate_grade"],
        "National", state.explore.legendLayers.National,
        "Regional", state.explore.legendLayers.Regional,
        "Local", state.explore.legendLayers.Local,
        "Sublocal", state.explore.legendLayers.Local,
        false,
      ]
      );
    }
  }, [map, state.explore.legendLayers]);

  useEffect(() => {
    if (map) {
      let pinPopup: mapboxgl.Popup | undefined = undefined;

      map.on("click", "study-pins", function (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {

        if (pinPopup !== undefined)
        {
          pinPopup.remove()
        }
        const source_id = e.features[0].properties.source_id;

        api.getRecordDetails(source_id).then((record) => {
          if (record !== null) {
            setSelectedPinId(source_id);
            togglePinBlur(map, source_id);
            pinPopup = new mapboxgl.Popup({ offset: 5, className: "pin-popup" })
              .setLngLat(e.lngLat)
              .setHTML(ReactDOMServer.renderToString(StudyPopup(record)))
              .setMaxWidth("300px")
              .addTo(map);
            pinPopup.on("close",()=>{
              setSelectedPinId(undefined);
              togglePinBlur(map);
            })
          }
        });
      });

      /*
      map.on('click', function(e) {
        if (e.point !== pinCoords)
        {
          setSelectedPinId(undefined);
          togglePinBlur(map);
        }
      });
      */

      map.on("mouseenter", "study-pins", function () {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "study-pins", function () {
        map.getCanvas().style.cursor = "";
      });
    }
  }, [map, state.language, api])

  useEffect(() => {
    if (map) {
      if (prevSelectedPinId) {
        map.setFeatureState(
          {
            source: "study-pins",
            id: prevSelectedPinId,
          },
          {
            isSelected: false,
          }
        );
      }

      map.setFeatureState(
        {
          source: "study-pins",
          id: selectedPinId,
        },
        {
          isSelected: true,
        }
      );
    }
  }, [map, selectedPinId, prevSelectedPinId]);

  return;
}

export default StudyPins;