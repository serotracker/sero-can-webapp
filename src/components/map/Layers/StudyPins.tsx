import { useState, useEffect, useContext } from "react"
import ReactDOMServer from "react-dom/server";
import StudyPopup from "components/map/Popups/StudyPopup";
import { AppContext } from "context";
import { StudyPinsMapConfig } from "types";
import httpClient from "httpClient";
import usePrevious from "utils/usePrevious"
import mapboxgl from "mapbox-gl";
import generateSourceFromRecords from "utils/GeoJsonGenerator";
import {Expressions} from "components/map/MapConfig"
import { sendAnalyticsEvent } from "../../../utils/analyticsUtils";
import {getMapboxLatitudeOffset} from "../../../utils/utils";
import {useMediaQuery} from "react-responsive";
import {mobileDeviceOrTabletWidth} from "../../../constants";

// Checks and blurs all pins that are not selected whgen a certain pin is clicked
const togglePinBlur = (map: mapboxgl.Map, selectedPinId?: string) => {
  const features = map.querySourceFeatures('study-pins', {
    sourceLayer: 'study-pins'
    });
  
  features.forEach(x => {
    const isBlurred = !(selectedPinId === x?.id || selectedPinId === undefined)
    if (x && x.id)
    {
      map.setFeatureState(
        {
          source: "study-pins",
          id: x.id,
        },
        {
          isBlurred: isBlurred,
          // a safety net because sometimes the hover state is skipped on click, makes sure to reset the map everytime something is clicked
          hover: false
        }
      );
    }
  })
}

const StudyPins = (map: mapboxgl.Map | undefined, {records}: StudyPinsMapConfig) => {

  const [state] = useContext(AppContext);
  const [api] = useState(new httpClient());
  const [selectedPinId, setSelectedPinId] = useState<string | undefined>(undefined);
  const prevSelectedPinId = usePrevious(selectedPinId)
  const [hoveredOverId, setHoveredOverId] = useState<string | undefined>(undefined);
  const prevHoveredOverId = usePrevious(hoveredOverId)

  useEffect(() => {
    if(map){
      const src = generateSourceFromRecords(records);
      if(map.getLayer("study-pins") === undefined){
        map.addSource("study-pins", src);
        map.addLayer({
          id: "study-pins",
          type: "circle",
          source: "study-pins",
          paint: Expressions.Studies as mapboxgl.CirclePaint
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
        const offset = getMapboxLatitudeOffset(map)
        api.getRecordDetails(source_id).then((record) => {
          if (record !== null) {
            setSelectedPinId(source_id);
            togglePinBlur(map, source_id);
            pinPopup = new mapboxgl.Popup({ offset: 5, className: "pin-popup" })
              .setLngLat(e.lngLat)
              .setMaxWidth("480px")
              .setHTML(ReactDOMServer.renderToString(StudyPopup(record, state.allFilterOptions.population_group)))
              .addTo(map);
            map.flyTo({
              center: [e.lngLat.lng, e.lngLat.lat - offset],
              curve: 0.5,
              speed: 0.5,
              });
            sendAnalyticsEvent({
              category: "Study pin popup",
              action: "open",
              label: `${source_id} - ${record.source_name}`,
            });
            pinPopup.on("close",()=>{
              setSelectedPinId(undefined);
              togglePinBlur(map);
            })
          }
        });
      });

      map.on("mouseenter", "study-pins", function () {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "study-pins", function () {
        map.getCanvas().style.cursor = "";
      });

      // Toggles the hover state
      map.on("mousemove", "study-pins", function (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
        setHoveredOverId(e.features[0].properties.source_id)
      })
    }
  }, [map, api])

  // Changes hover state of each circle
  useEffect(() => {
    if(map){
      if(hoveredOverId && !selectedPinId){
        map.setFeatureState(
            {
              source: "study-pins",
              id: hoveredOverId,
            },
            {
              hover: true,
            }
        )

        map.setFeatureState(
            {
              source: "study-pins",
              id: prevHoveredOverId,
            },
            {
              hover: false,
            }
        )
      }
    }

  }, [map, hoveredOverId])

  // changes select state styling of each circle
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

      if(selectedPinId)
      {
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
    }
  }, [map, selectedPinId, prevSelectedPinId]);

  return;
}

export default StudyPins;