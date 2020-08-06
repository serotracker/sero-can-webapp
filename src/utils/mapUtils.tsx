
import * as Countries from 'i18n-iso-countries';
import English from "i18n-iso-countries/langs/en.json";
import French from "i18n-iso-countries/langs/fr.json";
import { Layer, LeafletMouseEvent } from 'leaflet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Map, MapProps } from 'react-leaflet';
import { LanguageType, AggregatedRecord, AlternateAggregatedRecord } from "../types";
import { toPascalCase } from './translate/caseChanger';
import Translate from './translate/translateService';

export const getBuckets = (features: GeoJSON.Feature[]) => {
  // This is some javascript voodoo to get maxSeroprevalence
  const maxSeroprevalence = Math.max.apply(Math, features.filter(o => o.properties?.seroprevalence).map((o) => o?.properties?.seroprevalence));
  const roundedMax = Math.ceil(maxSeroprevalence);
  const maxLogit = getLogit(roundedMax);

  // This is an arbitrary value that I chose because on the logit scale
  // as you decrease in size you approach infinity, not 0
  const lowerEnd = -7;
  const differenceScale = maxLogit - lowerEnd
  const bucketSegments = 6
  const step = differenceScale / bucketSegments;
  const buckets = [0];
  for (let x = 1; x <= 6; x++) {
    const logitStep = parseFloat(getDecimalFromLogit(-7 + step * x).toFixed(1));
    buckets.push(logitStep);
  }
  return buckets;
}

const getLogit = (percentage: number) => {
  const decimal = percentage / 100;
  return Math.log(decimal) - Math.log(1 - decimal);
}

const getDecimalFromLogit = (logit: number) => {
  return Math.exp(logit) / (Math.exp(logit) + 1) * 100
}


export const getMapUrl = (language: LanguageType) => {
  return language === LanguageType.english ? 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='
    : 'https://api.mapbox.com/styles/v1/serotracker/ckb5pp5aj33xn1it8hivdofiv/tiles/512/{z}/{x}/{y}?access_token='
}

export const colors = ['#76E57F', '#62CA7C', '#4FB079', '#3B9577', '#277A74', '#146071', '#00456E', "#EEEEEE"]

export const getColor = (d: number | null, buckets: number[]) => {
  if (d === null) return colors[7];
  
  return d < buckets[1] ? colors[0] :
    d < buckets[2] ? colors[1] :
      d < buckets[3] ? colors[2] :
        d < buckets[4] ? colors[3] :
          d < buckets[5] ? colors[4] :
            d < buckets[6] ? colors[5] :
              colors[6]
}

Countries.registerLocale(English);
Countries.registerLocale(French);

export const getCountryName = (country: string, language: LanguageType, optionString: string) => {
  const code = Countries.getAlpha2Code(country, 'en');
  const translatedCountryName = Countries.getName(code, language);
  const displayText = translatedCountryName ? translatedCountryName : Translate(optionString, [toPascalCase(country)]);
  return displayText;
}


export const style = (feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined, buckets: number[] ) => {
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

export const altStyle = (feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined, buckets: number[] ) => {
  return {
    fillColor: feature?.properties?.geographicalName ? colors[6] : colors[7],
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '0',
    fillOpacity: 0.7,
    zIndex: 650
  }
}

export const highlightFeature = (e: LeafletMouseEvent) => {
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


export const resetHighlight = (e: LeafletMouseEvent) => {
  const layer = e.target;

  layer.setStyle({
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.7
  });
};
export const createPopup = (properties: any, language: LanguageType) => {
  if (properties.seroprevalence) {
    let error = properties?.error;
    return (
      <div className="col-12 p-0 flex">
        <div className="col-12 p-0 popup-header">{getCountryName(properties.name, language, "CountryOptions")}</div>
        <div className="col-12 p-0 popup-content">{Translate("Seroprevalence")}: {properties?.seroprevalence.toFixed(2)}%</div>
        <div className="col-12 p-0 popup-content">{Translate("95%ConfidenceInterval")}: {(properties?.seroprevalence - error[0]).toFixed(2)}%-{(properties?.seroprevalence + error[1]).toFixed(2)}%</div>
        <div className="col-12 p-0 popup-content">{Translate("TotalTests")}: {properties?.n}</div>
        <div className="col-12 p-0 popup-content">{Translate('TotalEstimates')}: {properties?.num_studies}</div>
      </div>)
  };
  return (
    <div className="col-12 p-0 flex">
      <div className="col-12 p-0 popup-header">{getCountryName(properties.name, language, "CountryOptions")}</div>
      <div className="col-12 p-0 flex popup-content">{Translate('NoData')}</div>
    </div>)
}

export const createAltPopup = (properties: any, language: LanguageType) => {
  if (properties.testsAdministered) {
    const regionalEstimate = properties?.regionalEstimate;
    const nationalEstimate = properties?.nationalEstimate;
    const localEstimate = properties?.localEstimate;
    const sublocalEstimate = properties?.sublocalEstimate;
    return (
      <div className="col-12 p-0 flex">
        <div className="col-12 p-0 popup-header">{getCountryName(properties.geographicalName, language, "CountryOptions")}</div>
        <div className="col-12 p-0 popup-content">{Translate("TestsAdministered")}: {properties?.testsAdministered}</div>
        <div className="col-12 p-0 popup-content">{Translate('NumSeroprevalenceEstimates')}: {properties?.numberOfStudies}</div>
        { nationalEstimate.numEstimates ? <div className="col-12 p-0 popup-content">{Translate('NationalEstimateRange')}: {(nationalEstimate.minEstimate * 100).toFixed(2)}%-{(nationalEstimate.maxEstimate * 100).toFixed(2)}%</div> : null}
        { nationalEstimate.numEstimates ? <div className="col-12 p-0 popup-content">{Translate('NationalEstimates')}: {nationalEstimate.numEstimates}</div> : null}
        { regionalEstimate.numEstimates ? <div className="col-12 p-0 popup-content">{Translate('RegionalEstimateRange')}: {(regionalEstimate.minEstimate * 100).toFixed(2)}%-{(regionalEstimate.maxEstimate * 100).toFixed(2)}%</div> : null}
        { regionalEstimate.numEstimates ? <div className="col-12 p-0 popup-content">{Translate('RegionalEstimates')}: {regionalEstimate.numEstimates}</div> : null}
        { localEstimate.numEstimates ? <div className="col-12 p-0 popup-content">{Translate('LocalEstimateRange')}: {(localEstimate.minEstimate * 100).toFixed(2)}%-{(localEstimate.maxEstimate * 100).toFixed(2)}%</div> : null}
        { localEstimate.numEstimates ? <div className="col-12 p-0 popup-content">{Translate('LocalEstimates')}: {localEstimate.numEstimates}</div> : null}
        { sublocalEstimate.numEstimates ? <div className="col-12 p-0 popup-content">{Translate('SublocalEstimateRange')}: {(sublocalEstimate.minEstimate * 100).toFixed(2)}%-{(sublocalEstimate.maxEstimate * 100).toFixed(2)}%</div>: null}
        { sublocalEstimate.numEstimates ? <div className="col-12 p-0 popup-content">{Translate('SublocalEstimates')}: {sublocalEstimate.numEstimates}</div> : null}
      </div>)
  };
  return (
    <div className="col-12 p-0 flex">
      <div className="col-12 p-0 popup-header">{getCountryName(properties.name, language, "CountryOptions")}</div>
      <div className="col-12 p-0 flex popup-content">{Translate('NoData')}</div>
    </div>)
}


export const zoomToFeature = (e: LeafletMouseEvent, mapRef: React.RefObject<Map<MapProps>>
  ) => {
  const map = mapRef?.current?.leafletElement
  map?.fitBounds(e.target.getBounds());
};

// This method sets all the functionality for each GeoJSON item
export const onEachFeature = (feature: GeoJSON.Feature, layer: Layer, mapRef: React.RefObject<Map<MapProps>>, language: LanguageType) => {

  layer.bindPopup(ReactDOMServer.renderToString(createPopup(feature.properties, language)), { closeButton: false, autoPan: false });

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
      zoomToFeature(e, mapRef);
    }
  })
}

export const onAltEachFeature = (feature: GeoJSON.Feature, layer: Layer, mapRef: React.RefObject<Map<MapProps>>, language: LanguageType) => {

  layer.bindPopup(ReactDOMServer.renderToString(createAltPopup(feature.properties, language)), { closeButton: false, autoPan: false });

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
      zoomToFeature(e, mapRef);
    }
  })
}

export const mapDataToFeatures = (features: GeoJSON.Feature[], prevalences: AggregatedRecord[]) => {  
  const prevalenceCountryDict: Record<string, AggregatedRecord> = prevalences.reduce((a: any, x: AggregatedRecord) => ({ ...a, [x.name]: x }), {});
  return features.map(feature => {
    const country = prevalenceCountryDict![feature?.properties?.name];
    if (country && country.seroprevalence) {
      const { seroprevalence, error, n, num_studies } = country;
      return { ...feature, properties: { ...feature.properties, seroprevalence, error, n, num_studies } }
    }
    return { ...feature, properties: { ...feature.properties, seroprevalence: null, error: null, n: null, num_studies: null } }
  })
}
export const mapAltDataToFeatures = (features: GeoJSON.Feature[], prevalences: AlternateAggregatedRecord[]) => {
  const prevalenceCountryDict: Record<string, AlternateAggregatedRecord> = prevalences.reduce((a: any, x: AlternateAggregatedRecord) => ({ ...a, [x.geographicalName]: x }), {});
  console.log(prevalenceCountryDict);
  return features.map(feature => {
    const country: AlternateAggregatedRecord = prevalenceCountryDict![feature?.properties?.name];
    if (country && country.testsAdministered) {
      const { testsAdministered, geographicalName, numberOfStudies, localEstimate, nationalEstimate, regionalEstimate, sublocalEstimate } = country;
      return { ...feature, properties: { ...feature.properties, testsAdministered, geographicalName, numberOfStudies, localEstimate, nationalEstimate, regionalEstimate, sublocalEstimate } }
    }
    return { ...feature, properties: { ...feature.properties, testsAdministered: null, geographicalName: null, numberOfStudies: null, localEstimate: null, nationalEstimate: null, regionalEstimate: null, sublocalEstimate: null } }
  })
}