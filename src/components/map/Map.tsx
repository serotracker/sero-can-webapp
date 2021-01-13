import { latLngBounds, icon } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";
import { AppContext } from "../../context";
import { getBuckets, getMapUrl } from "../../utils/mapUtils";
import Legend from "./Legend";
import './Map.css';
import VectorTileLayer from './VectorTileLayer.js';
import CountriesTileLayer from "./CountriesTileLayer"
import { layerStyle } from './MapStyle';
import { mapZIndex } from './../../constants'
import Translate from "../../utils/translate/translateService";
import { getGeography } from "../../utils/utils";

export default function Map() {
  const [state] = useContext(AppContext);
  const [mapRecords, setMapRecords] = useState(state.countries as any);
  const buckets = getBuckets(mapRecords);

  useEffect(() => {
    if(state.explore.estimateGradePrevalences.length > 0){
      const countriesData = state.countries.map( (country : any) => {
        const countryEstimate = state.explore.estimateGradePrevalences.find(element => element.alpha3Code === country.alpha3Code);

        if (countryEstimate && countryEstimate.testsAdministered) {
          const { testsAdministered, geographicalName, numberOfStudies, localEstimate, nationalEstimate, regionalEstimate, sublocalEstimate } = countryEstimate;
          return { ...country, properties: { testsAdministered, geographicalName, numberOfStudies, localEstimate, nationalEstimate, regionalEstimate, sublocalEstimate }}
        }
        return { ...country, properties: { testsAdministered: null, geographicalName: null, numberOfStudies: null, localEstimate: null, nationalEstimate: null, regionalEstimate: null, sublocalEstimate: null } }
      })
      setMapRecords(countriesData);
    }
  }, [state.explore.estimateGradePrevalences, state.countries])

  const bounds = latLngBounds([-90, -200], [90, 180]);
  const maxBounds = latLngBounds([-90, -200], [90, 200]);

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_API_KEY;

  // Definitions of the marker fields: 
  //  iconSize: size of the icon
  //  iconAnchor: point of the icon which will correspond to marker's location
  //  popupAnchor: point from which the popup should open relative to the iconAnchor
  const nationalMarker = icon({ 
    iconUrl: require('../../assets/icons/national_pin.png'), 
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -30]
  })

  const regionalMarker = icon({ 
    iconUrl: require('../../assets/icons/regional_pin.png'), 
    iconSize: [21, 30],
    iconAnchor: [10.5, 30],
    popupAnchor: [0, -20]
  })

  const localMarker = icon({ 
    iconUrl: require('../../assets/icons/local_pin.png'), 
    iconSize: [14, 20],
    iconAnchor: [7, 20],
    popupAnchor: [0, -10]
  })

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
        mapRecords={mapRecords}
        zIndex={mapZIndex.CountriesTileLayer}
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
        ref={(tl : any) => tl?.bringToFront()}
        url={getMapUrl(state.language) + mapboxAccessToken}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        tileSize={512}
        id={'serotracker/ckis9n3mt0qkg19o0q03wkg84'}
        zoomOffset={-1}
        zIndex={mapZIndex.Labels}
      />
      {state.showEstimatePins && state.explore.records.map((record, idx) => 
        {
          if(record.pin_latitude && record.pin_longitude){
            return (
              <Marker 
                eventHandlers={{
                  click: (e) => {
                    (e.target as any).openPopup();
                  },
                }}
                icon={record.estimate_grade === "National" ? nationalMarker : (record.estimate_grade === "Regional" ? regionalMarker : localMarker)}
                key={`marker-${idx}`} 
                position={[record.pin_latitude, record.pin_longitude]}
              >
                <Popup autoClose={false} className="pin-popup">
                  <div className="popup-title">
                    {`${record.estimate_grade} study details`}
                  </div>
                  <div className="popup-heading">
                    Study name
                  </div>
                  <div className="popup-text">
                    {`${record.source_name}`}
                  </div>
                  <div className="popup-heading">
                    Location
                  </div>
                  <div className="popup-text">
                    { getGeography(record.city, record.state, record.country) }
                  </div>
                  <div className="popup-heading">
                    Best seroprevalence (SP) estimate
                  </div>
                  <div className="popup-text">
                    {record.seroprevalence ? `${(record.seroprevalence * 100).toFixed(1)}%` : "N/A"}
                  </div>
                  <div className="popup-heading">
                    N
                  </div>
                  <div className="popup-text">
                    {`${record.denominator}`}
                  </div>
                  <div className="popup-heading">
                    Population group
                  </div>
                  <div className="popup-text">
                    {record.population_group ? `${record.population_group}` : Translate("NotReported")}
                  </div>
                  <div className="popup-heading">
                    Risk of Bias
                  </div>
                  <div className="popup-text">
                    {`${record.overall_risk_of_bias}`}
                  </div>
                </Popup>
              </Marker>
            )
          }
          else
            return null;
        }
      )}
    </MapContainer>
  );
}
