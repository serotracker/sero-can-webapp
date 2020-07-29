import { latLngBounds, Layer, LeafletMouseEvent, } from "leaflet";
import React, { createRef, useContext, useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import { GeoJSON, Map as LeafletMap, TileLayer, Pane, CircleMarker, Popup, Marker} from "react-leaflet";
import Countries from "../../assets/countries-geo.json";
import Centroids from "../../assets/centroids.json";
import { AppContext } from "../../context";
import { AggregatedRecord, CaseCountRecord } from "../../types";
import { getBuckets, getColor, getCountryName, getMapUrl } from "../../utils/mapUtils";
import Translate from "../../utils/translate/translateService";
import Legend from "./Legend";
import './Map.css';

export default function Map() {
  const mapRef = createRef<LeafletMap>();
  const geoJsonRef = createRef<GeoJSON>();
  const [state] = useContext(AppContext);
  const [mapRecords, setMapRecords] = useState(Countries as any);
  const [forceUpdate, setForceUpdate] = useState(Math.random());
  const buckets = getBuckets(mapRecords.features);

  useEffect(() => {
    if(state.country_prevalences.length > 0){
      const prevalenceCountryDict: Record<string, AggregatedRecord> = state.country_prevalences.reduce((a: any, x: AggregatedRecord) => ({ ...a, [x.name]: x }), {});

      const importGeo = Countries as any;
      const features = importGeo.features as GeoJSON.Feature[]

      // We will iterate through all the features in the geoJson
      // if they are in the country dict we will attach their aggregated data to the feature for displaying
      importGeo.features = features.map(feature => {
        const country = prevalenceCountryDict![feature?.properties?.name];
        if (country && country.seroprevalence) {
          const { seroprevalence, error, n, num_studies } = country;
          return { ...feature, properties: { ...feature.properties, seroprevalence, error, n, num_studies } }
        }
        return { ...feature, properties: { ...feature.properties, seroprevalence: null, error: null, n: null, num_studies: null } }
      })
      setMapRecords(importGeo)

      // we need to update the key on the GEOJSON to let react know it's time to rerender
      setForceUpdate(Math.random())
    }
    else{
      // Initialize map so that it starts out colourless
      const initImportGeo = Countries as any;
      const features = initImportGeo.features as GeoJSON.Feature[]
      initImportGeo.features = features.map(feature => {
        return { ...feature, properties: { ...feature.properties, seroprevalence: null, error: null, n: null, num_studies: null } }
      })
      setMapRecords(initImportGeo);
    }

    if(state.caseCountRecords.length> 0 ){
      const caseCountCountryDict: Record<string,CaseCountRecord> = state.caseCountRecords.reduce((a: any, x: CaseCountRecord) => ({...a, [x.country]: x}), {});
      
      const importCentroids = Centroids as any;
      const features = importCentroids.features as GeoJSON.Feature[]

      importCentroids.features = features.map(feature => {
        const country = caseCountCountryDict![feature?.properties?.name];
        if(country)
        {
          const { totalConfirmed, totalDeaths, totalRecovered} = country;
          return { ...feature, properties: {...feature.properties, totalConfirmed, totalDeaths, totalRecovered} }
        }

        return {...feature, properties: {...feature.properties, totalConfirmed: null, totalDeaths: null, totalRecovered: null}}
      })
    }
  }, [state.country_prevalences, state.caseCountRecords])

  const MyMarker = (props: any) => {
    
    const initMarker = (ref: CircleMarker<any> | null) => {
    if (ref) {
      const layer = ref.leafletElement;
      layer.on({
        mouseover: (e: LeafletMouseEvent) => {
          layer.openPopup();
          highlightFeature(e)
        },
        mouseout: (e: LeafletMouseEvent) => {
          layer.closePopup();
          resetHighlight(e)
        }
      })
    }
  }

  return <CircleMarker ref={initMarker} {...props}/>
}
  const drawCircles = () => {
    
    return Centroids.features.map((o: any) => {
      if(o.properties?.totalConfirmed != null) 
      {
        let r: number = o.properties.totalConfirmed ? Math.log10(o.properties.totalConfirmed) : 0
        return (           
        <MyMarker center={[o.geometry.coordinates[1],o.geometry.coordinates[0]]} fillColor={"#953b4a"} stroke={false} zIndex={1000} fillOpacity={1} radius={r}>()
          <Popup position={[o.geometry.coordinates[1],o.geometry.coordinates[0]]}> </Popup>
        </MyMarker>)
      }
    })
  };

  const style = (feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined) => {
    return {
      fillColor: getColor(feature?.properties?.seroprevalence, buckets),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '0',
      fillOpacity: 0.7,
      zIndex: 650
    }
  }
  

  const highlightFeature = (e: LeafletMouseEvent) => {
    const layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
      zIndex: 200
    });
    layer.bringToFront();

  }

  const zoomToFeature = (e: LeafletMouseEvent) => {
    const map = mapRef?.current?.leafletElement
    map?.fitBounds(e.target.getBounds());
  };

  const resetHighlight = (e: LeafletMouseEvent) => {
    const layer = e.target;

    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '',
      fillOpacity: 0.7
    });
  };

  const createPopup = (properties: any) => {
    if (properties.seroprevalence) {
      let error = properties?.error;
      return (
        <div className="col-12 p-0 flex">
          <div className="col-12 p-0 popup-header">{getCountryName(properties.name, state.language, "CountryOptions")}</div>
          <div className="col-12 p-0 popup-content">{Translate("Seroprevalence")}: {properties?.seroprevalence.toFixed(2)}%</div>
          <div className="col-12 p-0 popup-content">{Translate("95%ConfidenceInterval")}: {(properties?.seroprevalence - error[0]).toFixed(2)}%-{(properties?.seroprevalence + error[1]).toFixed(2)}%</div>
          <div className="col-12 p-0 popup-content">{Translate("TotalTests")}: {properties?.n}</div>
          <div className="col-12 p-0 popup-content">{Translate('TotalEstimates')}: {properties?.num_studies}</div>
        </div>)
    };
    return (
      <div className="col-12 p-0 flex">
        <div className="col-12 p-0 popup-header">{getCountryName(properties.name, state.language, "CountryOptions")}</div>
        <div className="col-12 p-0 flex popup-content">{Translate('NoData')}</div>
      </div>)
  }


  // This method sets all the functionality for each GeoJSON item
  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {

    layer.bindPopup(ReactDOMServer.renderToString(createPopup(feature.properties)), { closeButton: false, autoPan: false });

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        layer.openPopup();
        highlightFeature(e)
      },
      mouseout: (e: LeafletMouseEvent) => {
        layer.closePopup();
        resetHighlight(e)
      },
      mousemove: (e: LeafletMouseEvent) => {
        layer.getPopup()?.setLatLng(e.latlng);
      },
      click: (e: LeafletMouseEvent) => {
        zoomToFeature(e);
      }
    })
  }

    // This method sets all the functionality for each GeoJSON item
    const onEachCircle = (feature: GeoJSON.Feature, layer: Layer) => {

      layer.bindPopup(ReactDOMServer.renderToString(createPopup(feature.properties)), { closeButton: false, autoPan: false });
  
      layer.on({
        mouseover: (e: LeafletMouseEvent) => {
          layer.openPopup();
          highlightFeature(e)
        },
        mouseout: (e: LeafletMouseEvent) => {
          layer.closePopup();
          resetHighlight(e)
        },
        mousemove: (e: LeafletMouseEvent) => {
          layer.getPopup()?.setLatLng(e.latlng);
        },
        click: (e: LeafletMouseEvent) => {
          zoomToFeature(e);
        }
      })
    }

  const bounds = latLngBounds([-90, -200], [90, 180]);
  const maxBounds = latLngBounds([-90, -200], [90, 200]);

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_API_KEY;
  return (
    <LeafletMap
      ref={mapRef}
      center={[0, 0]}
      zoom={2}
      className="map w-100"
      bounceAtZoomLimits={true}
      bounds={bounds}
      minZoom={2}
      maxBounds={maxBounds}
      enableHighAccuracy={true}
      maxBoundsViscosity={1}
    >
      <TileLayer
        url={getMapUrl(state.language) + mapboxAccessToken}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        tileSize={512}
        id={'mapbox/light-v9'}
        zoomOffset={-1}>
      </TileLayer>
        <Pane style={{zIndex: 500, opacity:1}}>
          {drawCircles()}
        </Pane>
      <GeoJSON
        onEachFeature={onEachFeature}
        ref={geoJsonRef}
        key={forceUpdate}
        data={mapRecords as GeoJSON.GeoJsonObject}
        style={(data) => style(data)}>
      </GeoJSON>
      <Legend buckets={buckets} />
    </LeafletMap>
  );
}
