import React, {useContext, useEffect, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import {DefaultMapboxMapOptions, MapResources, MapSymbology} from "../../map/MapConfig";
import {getEsriVectorSourceStyle} from "../../../utils/MappingUtil";
import ReactDOMServer from "react-dom/server";
import StudyPopup from "../../map/Popups/StudyPopup";
import {AppContext} from "../../../context";
import ArboStudyPopup from "./ArboStudyPopup";
import Legend from "../../map/Legend";
import Translate from "../../../utils/translate/translateService";
import {Checkbox} from "semantic-ui-react"; // or "const mapboxgl = require('mapbox-gl');"

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY as string;


export default function ArboVirusMap() {

    const [state] = useContext(AppContext);
    const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
    const mapContainer = useRef(null);


    const query = useQuery({
        queryKey: ['ArbovirusRecords'],
        queryFn: () => fetch("http://localhost:5000/data_provider/records/arbo").then(
            (response) => response.json()
        )
    })

    if(!query.isLoading && !query.isError) {
        console.log(query.data)
    }



    // Creates map, only runs once
    useEffect(() => {
        (async () => {
            const baseMapStyle = await getEsriVectorSourceStyle(MapResources.WHO_BASEMAP);

            const mergedOptions = { // Merges options together to configure map
                ...{
                    container: mapContainer.current, // container id
                    style: baseMapStyle,
                },
                ...DefaultMapboxMapOptions,
            };

            //base map style has 31 layers
            //Countries layer is added on top later.
            const m = new mapboxgl.Map(mergedOptions).addControl(new mapboxgl.NavigationControl());

            m.on('load', () => {
                setMap(m);
            })

        })();

        return () => map.remove()

    }, []);

    useEffect(() => {
        if(map && query.data) {
            // Add arbo pins

            // Once data loads then populate map
            if(query.data) {
                // Create array of pin features
                const arboStudyPins = query.data.records.map((record: any) => {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [record.longitude, record.latitude]
                        },
                        properties: {
                            title: record.title,
                            pathogen: record.pathogen,
                            id: record.estimate_id
                        }
                    }
                })

                // Create GeoJson
                const pinSourceData = {
                    type: 'FeatureCollection',
                    features: arboStudyPins
                }

                console.log(pinSourceData)

                if(map.getLayer('arbo-pins') == undefined) {
                    // Create mapbox source
                    map.addSource('arboStudyPins', {
                        type: 'geojson',
                        data: pinSourceData
                    })

                    // Create mapbox circle layer for pins
                    map.addLayer({
                        id: "arbo-pins",
                        type: "circle",
                        source: "arboStudyPins",
                        paint: {
                            "circle-color": [
                                "match",
                                ["get", "pathogen"],
                                "ZIKV",
                                "#A0C4FF",
                                "CHIKV",
                                "#9BF6FF",
                                "WNV",
                                "#CAFFBF",
                                "DENV",
                                "#FDFFB6",
                                "YF",
                                "#FFD6A5",
                                "MAYV",
                                "#FFADAD",
                                "#FFFFFC",
                            ],
                            "circle-radius": 8,
                            "circle-stroke-color": "#333333",
                            "circle-stroke-width": 1,
                        },
                    })
                }
            }
        }
    }, [query.data, map])

    useEffect(() => {
        if(map) {

            let pinPopup: mapboxgl.Popup | undefined = undefined;
            console.log("adding event listeners")
            map.on("mouseenter", "arbo-pins", function () {
                map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", "arbo-pins", function () {
                map.getCanvas().style.cursor = "";
            });

            map.on("click", "arbo-pins", function (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {

                console.log("map clicked")

                if (pinPopup !== undefined) {
                    pinPopup.remove()
                }

                let study = query.data.records.filter((record: any) => record.estimate_id === e.features[0].properties.id);

                console.log(study)

                if(study !== undefined && study.length > 0) {
                    pinPopup = new mapboxgl.Popup({ offset: 5, className: "pin-popup" })
                        .setLngLat(e.lngLat)
                        .setMaxWidth("480px")
                        .setHTML(ReactDOMServer.renderToString(ArboStudyPopup(study[0])))
                        .addTo(map);
                }

                pinPopup.on("close",()=>{
                    console.log("closed pip popup")
                })
            })
        }
    }, [map])

    return (
        <>
            <div className="info flex legend center-item">
                <div className="flex legend-container" key={Math.random()}>
                    <div className="legend-item" id="National">
                        <i className="circleBase legend-icon" style={{ background: "#A0C4FF" }}></i>
                        <label className='legend-label'>Zika</label>
                        <Checkbox className="legend-checkbox" checked={state.explore.legendLayers.National}/>
                    </div>
                    <div className="legend-item" id="Regional">
                        <i className="circleBase legend-icon" style={{ background: "#9BF6FF" }}></i>
                        <label className='legend-label'>Chikungunya</label>
                        <Checkbox className="legend-checkbox" checked={state.explore.legendLayers.Regional}/>
                    </div>
                    <div className="legend-item mb-1" id="Local">
                        <i className="circleBase legend-icon" style={{ background: "#CAFFBF" }}></i>
                        <label className='legend-label'>West Nile</label>
                        <Checkbox className="legend-checkbox" checked={state.explore.legendLayers.Local}/>
                    </div>
                    <div className="legend-item" id="National">
                        <i className="circleBase legend-icon" style={{ background: "#FDFFB6" }}></i>
                        <label className='legend-label'>Dengue</label>
                        <Checkbox className="legend-checkbox" checked={state.explore.legendLayers.National}/>
                    </div>
                    <div className="legend-item" id="Regional">
                        <i className="circleBase legend-icon" style={{ background: "#FFD6A5" }}></i>
                        <label className='legend-label'>Yellow Fever</label>
                        <Checkbox className="legend-checkbox" checked={state.explore.legendLayers.Regional}/>
                    </div>
                    <div className="legend-item mb-1" id="Local">
                        <i className="circleBase legend-icon" style={{ background: "#FFADAD" }}></i>
                        <label className='legend-label'>Mayaro</label>
                        <Checkbox className="legend-checkbox" checked={state.explore.legendLayers.Local}/>
                    </div>
                </div>
            </div>
            <div ref={mapContainer} className={"w-100 h-100 overflow-hidden"}>
            </div>
        </>
    )
}