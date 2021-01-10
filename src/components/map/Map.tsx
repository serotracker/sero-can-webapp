import { latLngBounds } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { AppContext } from "../../context";
import { getBuckets, getMapUrl } from "../../utils/mapUtils";
import { mapZIndex } from './../../constants';
import CountriesTileLayer from "./CountriesTileLayer";
import Legend from "./Legend";
import './Map.css';
import { layerStyle } from './MapStyle';
import PinLayer from "./PinLayer";
import VectorTileLayer from './VectorTileLayer';

export default function Map() {
  const [state] = useContext(AppContext);
  const [mapRecords, setMapRecords] = useState(state.countries as any);

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_API_KEY;
  const [countryUrl, setCountryUrl] = useState("");
  const buckets = getBuckets(mapRecords);

  useEffect(() => {
    setCountryUrl(getMapUrl(state.language) + mapboxAccessToken)
  }, [mapboxAccessToken, state.language])

  useEffect(() => {
    if (state.explore.estimateGradePrevalences.length > 0) {
      const countriesData = state.countries.map((country: any) => {
        const countryEstimate = state.explore.estimateGradePrevalences.find(element => element.alpha3Code === country.alpha3Code);

        if (countryEstimate && countryEstimate.testsAdministered) {
          const { testsAdministered, geographicalName, numberOfStudies, localEstimate, nationalEstimate, regionalEstimate, sublocalEstimate } = countryEstimate;
          return { ...country, properties: { testsAdministered, geographicalName, numberOfStudies, localEstimate, nationalEstimate, regionalEstimate, sublocalEstimate } }
        }
        return { ...country, properties: { testsAdministered: null, geographicalName: null, numberOfStudies: null, localEstimate: null, nationalEstimate: null, regionalEstimate: null, sublocalEstimate: null } }
      })
      setMapRecords(countriesData);
    }
  }, [state.explore.estimateGradePrevalences, state.countries, state.language])

  const bounds = latLngBounds([-90, -200], [90, 180]);
  const maxBounds = latLngBounds([-90, -200], [90, 200]);
  return (
    <MapContainer
      center={bounds.getCenter()}
      zoom={3}
      className="map w-100"
      bounceAtZoomLimits={true}
      bounds={bounds}
      minZoom={3}
      maxBounds={maxBounds}
      maxBoundsViscosity={1}
    >

      <CountriesTileLayer
        url="https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/Countries/VectorTileServer"
        records={mapRecords}
        zIndex={mapZIndex.CountriesTileLayer}
        language={state.language}
      />

      <VectorTileLayer
        url="https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer"
        style={layerStyle}
        fetchApiStyle
      />

      <VectorTileLayer
        url="https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_Disputed_Areas_and_Borders_VTP/VectorTileServer"
        zIndex={mapZIndex.DisputedAreasAndBorders}
        fetchApiStyle
        style={layerStyle}
        front
      />

      <Legend buckets={buckets} />

      <TileLayer
        ref={(tl: any) => tl?.bringToFront()}
        url={countryUrl}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        tileSize={512}
        id={'serotracker/ckis9n3mt0qkg19o0q03wkg84'}
        zoomOffset={-1}
        zIndex={mapZIndex.Labels}
        key={countryUrl}
      />
        <PinLayer />
    </MapContainer>
  );
}
