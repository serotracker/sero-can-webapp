import React, {useContext, useEffect, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import {DefaultMapboxMapOptions, MapResources} from "../../map/MapConfig";
import {getEsriVectorSourceStyle} from "../../../utils/MappingUtil";
import ReactDOMServer from "react-dom/server";
import {AppContext} from "../../../context";
import ArboStudyPopup from "./ArboStudyPopup";
import {Checkbox, Dropdown} from "semantic-ui-react";
import Translate from "../../../utils/translate/translateService";
import InformationIcon from "../../shared/InformationIcon";
import SectionHeader from "../../sidebar/right-sidebar/SectionHeader";


// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY as string;


export default function ArboVirusMap() {

    const [state] = useContext(AppContext);
    const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
    const mapContainer = useRef(null);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({})


    const addFilter = (value: string[], newFilter: string) => {
        setSelectedFilters(prevState => {
            let mapboxFilters = []

            Object.keys(prevState).forEach((filter: string) => {
                if (filter !== newFilter && prevState[filter].length > 0)
                    mapboxFilters.push(['in', filter, ...prevState[filter]])
            })

            if(value.length > 0) mapboxFilters.push(['in', newFilter, ...value]);

            console.log("Filters: ", mapboxFilters);
            map?.setFilter('arbo-pins', ['all', ...mapboxFilters])

            return ({
            ...prevState, [newFilter]: value
            })
        });
    }

    const buildFilterDropdown = (filter: string, placeholder: string) => {
        return (
            <div className="pb-3">
                <Dropdown
                    text={placeholder}
                    fluid
                    multiple
                    search
                    clearable
                    selection
                    options={filters.data[filter].map((filterOption: string) => (
                        {
                            key: filterOption,
                            text: filterOption,
                            value: filterOption
                        })
                    )}
                    onChange={(e: any, data: any) => {
                        addFilter(data.value, filter)
                    }}
                    value={selectedFilters[filter] as string[]}
                    defaultValue={selectedFilters[filter] as string[]}
                />
            </div>
        )
    }

    const query = useQuery({
        queryKey: ['ArbovirusRecords'],
        queryFn: () => fetch("http://localhost:5000/data_provider/records/arbo").then(
            (response) => response.json()
        ),
    })

    const filters = useQuery({
        queryKey: ['ArbovirusFilters'],
        queryFn: () => fetch("http://localhost:5000/data_provider/arbo/filter_options").then(
            (response) => response.json()
        ),
    })

    if(!filters.isLoading && !filters.isError) {
        console.log(filters.data)
    } else {
        console.log("loading or errored filters", filters.error, filters.isError, filters.isLoading)
    }

    if(!query.isLoading && !query.isError) {
        console.log(query.data)
    } else {
        console.log("loading or errored", query.error, query.isError, query.isLoading)
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
                            coordinates: [record.latitude, record.longitude]
                        },
                        properties: {
                            title: record.title,
                            pathogen: record.pathogen,
                            id: record.id,
                            age_group: record.age_group,
                            sex: record.sex,
                            country: record.country,
                            assay: record.assay,
                            producer: record.producer,
                            sample_frame: record.sample_frame
                        }
                    }
                })

                // Create GeoJson
                const pinSourceData = {
                    type: 'FeatureCollection',
                    features: arboStudyPins
                }

                console.log("Pin Source Data", pinSourceData)

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

                    let pinPopup: mapboxgl.Popup | undefined = undefined;
                    console.log("adding event listeners")
                    map.on("mouseenter", "arbo-pins", function () {
                        map.getCanvas().style.cursor = "pointer";
                    });
                    map.on("mouseleave", "arbo-pins", function () {
                        map.getCanvas().style.cursor = "";
                    });

                    map.on("click", "arbo-pins", function (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
                        if (pinPopup !== undefined) {
                            pinPopup.remove()
                        }

                        let study = query.data.records.filter((record: any) => record.id === e.features[0].properties.id);
                        
                        if(study !== undefined && study.length > 0) {
                            pinPopup = new mapboxgl.Popup({ offset: 5, className: "pin-popup" })
                                .setLngLat(e.lngLat)
                                .setMaxWidth("480px")
                                .setHTML(ReactDOMServer.renderToString(ArboStudyPopup(study[0])))
                                .addTo(map);
                        }

                    })
                }
            }
        }
    }, [query.data, map])

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
            <div>
                <div className={"w-1/5 h-100"}>
                    <div className="flex legend center-item">
                        {/*{!filters.isLoading && !filters.isError &&*/}
                        {/*    (Object.keys(filters.data.filters).map((filterKey: any) =>*/}
                        {/*    <div className="pb-3">*/}
                        {/*        {filterKey} : {filters.data.filters[filterKey]}*/}
                        {/*    </div>*/}
                        {/*))}*/}

                    </div>
                </div>
            </div>
            <div className={"flex w-100 h-100 flex-col"}>
                {!filters.isLoading && !filters.isError && (
                    <div className="col-2 p-0 h-100">
                        <div className="py-3 center flex">
                            <div className="subheading">
                                {Translate("Filter")}
                            </div>
                            <div className="tooltip-vert-adj">
                                <InformationIcon
                                    offset={10}
                                    position="bottom right"
                                    color="#455a64"
                                    tooltipHeader={Translate("Filter")}
                                    popupSize="small"
                                    size="sm"
                                    tooltip={Translate('FilterTooltip')} />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-10 col align-items-center p-0">
                                <div className="p-0">
                                    <div>
                                        <SectionHeader
                                            header_text={"Demographics"}
                                            tooltip_text={"Participant related data"}
                                        />
                                    </div>
                                    <div>
                                        {buildFilterDropdown('age_group', "Age Group")}
                                    </div>
                                    <div>
                                        {buildFilterDropdown('sex', "Sex")}
                                    </div>
                                    <div>
                                        {buildFilterDropdown('country', "Country")}
                                    </div>
                                </div>
                                <div className="p-0">
                                    <div>
                                        <SectionHeader header_text={"Study Information"} tooltip_text={"Filter on different types of study based metadata"}/>
                                    </div>
                                    <div>
                                        {buildFilterDropdown('assay',"Assay")}
                                    </div>
                                    <div>
                                        {buildFilterDropdown('producer', "Producer")}
                                    </div>
                                    <div>
                                        {buildFilterDropdown('sample_frame', "Sample Frame")}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="row justify-content-center">*/}
                        {/*    <div className="col-10 col align-items-center p-0">*/}
                        {/*        <div className="pb-3">*/}
                        {/*            <Button  className="clear-filters-btn" size="medium" onClick={clearFilter}> {Translate('ClearAllFilters')}</Button>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                )}
                <div ref={mapContainer} className={"col-10 h-100 overflow-hidden"}>
                </div>
            </div>

        </>
    )
}