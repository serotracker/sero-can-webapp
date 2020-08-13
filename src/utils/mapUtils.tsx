
import * as Countries from 'i18n-iso-countries';
import English from "i18n-iso-countries/langs/en.json";
import French from "i18n-iso-countries/langs/fr.json";
import { Layer, LeafletMouseEvent } from 'leaflet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Map, MapProps } from 'react-leaflet';
import { LanguageType, AggregatedRecord, AlternateAggregatedRecord, RegionalPrevalenceEstimate } from "../types";
import { toPascalCase } from './translate/caseChanger';
import Translate from './translate/translateService';
import { Button } from 'semantic-ui-react';
import ReactDOM from 'react-dom';

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
const unmatchedCountryNames: Record<string, string> = {}

export const getCountryName = (country: string, language: LanguageType, optionString: string) => {
  const code = Countries.getAlpha2Code(country, 'en');
  const translatedCountryName = Countries.getName(code, language);
  if (!code && !translatedCountryName) {
    unmatchedCountryNames[toPascalCase(country)] = country;
  }
  const displayText = translatedCountryName ? translatedCountryName : Translate(optionString, [toPascalCase(country)]);
  return displayText;
}

// This refers to the old map that displayed seroprevalences directly
export const style = (feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined, buckets: number[]) => {
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

export const altStyle = (feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined, buckets: number[]) => {
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

// This refers to the old map that displayed seroprevalences directly
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

const sendDispatch = () => {

}
const createPopupGeographySection = (regionalEstimate: RegionalPrevalenceEstimate, title: string) => {
  const minString = `${(regionalEstimate.minEstimate * 100).toFixed(2)}%`
  const maxString = `${(regionalEstimate.maxEstimate * 100).toFixed(2)}%`
  const regionString = minString === maxString ? minString : `${minString} - ${maxString}`;
  return (
    regionalEstimate.numEstimates ?
      <div className="flex fit column popup-section">
        <div className="section-title pt-1">{title.toUpperCase()}</div>
        <div className="col-12 p-0 popup-content">{Translate('EstimateRange')}: <b>{regionString}</b></div>
        <div className="col-12 p-0 popup-content">{Translate('NumberEstimates')}: <b>{regionalEstimate.numEstimates}</b></div>
      </div> : null
  )
}

export const createAltPopup = (properties: any,
  language: LanguageType,
  dispatch: React.Dispatch<Record<string, any>>) => {
  if (properties.testsAdministered) {
    const regionalEstimate = properties?.regionalEstimate;
    const nationalEstimate = properties?.nationalEstimate;
    const localEstimate = properties?.localEstimate;
    const sublocalEstimate = properties?.sublocalEstimate;
    return (
      <div className="col-12 p-0 flex column">
        <div className="fit popup-header popup-section">{getCountryName(properties.geographicalName, language, "CountryOptions")}</div>
        <div className="flex column fit popup-section">
          <div className="fit popup-content">{Translate("TestsAdministered")}: <b>{properties?.testsAdministered}</b></div>
          <div className="fit popup-content">{Translate('NumSeroprevalenceEstimates')}: <b>{properties?.numberOfStudies}</b></div>
        </div>
        {createPopupGeographySection(nationalEstimate, Translate('NationalEstimates'))}
        {createPopupGeographySection(regionalEstimate, Translate('RegionalEstimates'))}
        {createPopupGeographySection(localEstimate, Translate('LocalEstimates'))}
        {createPopupGeographySection(sublocalEstimate, Translate('SublocalEstimates'))}
        <div className="popup-section fit flex" id="popup-button">

        </div>
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
  const popup = ReactDOMServer.renderToString(<div id="1234">{createPopup(feature.properties, language)}</div>)
  layer.bindPopup(popup, { closeButton: false, autoPan: false });

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

// This refers to the old map that displayed seroprevalences directly
export const onAltEachFeature = (
  feature: GeoJSON.Feature,
  layer: Layer,
  mapRef: React.RefObject<Map<MapProps>>,
  language: LanguageType,
  dispatch: React.Dispatch<Record<string, any>>,
  isMobileDeviceOrTablet: boolean) => {

  // Basically leaflet is really damn weird
  // We have to turn our JSX element into a string so that they can render it 
  // inside the popup. But that removes our onClick method on the button so we have to 
  // render the component again using ReactDOM.render().
  const newPopup = createAltPopup(feature.properties, language, dispatch)
  layer.bindPopup(ReactDOMServer.renderToString(newPopup),
    { closeButton: false, autoPan: false, keepInView: true });

  const popupButton = () => {
    return (
    <Button id="onClickButton" className="fill my-2" primary onClick={(e) => {
      dispatch({
        type: "SELECT_REGION",
        payload: feature?.properties?.geographicalName
      })
    }}>{Translate('ViewStudies')}</Button>)
  }

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
      if (!isMobileDeviceOrTablet) {        
        zoomToFeature(e, mapRef);
        if(feature?.properties?.name) {        
          dispatch({
              type: "SELECT_REGION",
              payload: feature?.properties?.name
            })
          }
      }
      // We need to check if the popup is open otherwise we will try and render in the button
      // onto a node that doesn't exist.
      else {
        console.log(layer.getPopup()?.isPopupOpen())
        console.log(layer.getPopup()?.isOpen())
        console.log(layer.getPopup())
        try {
            ReactDOM.render(
            popupButton(),
            document.getElementById('popup-button')
          );
        }
        catch(e) {}
      }
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
  return features.map(feature => {
    const country: AlternateAggregatedRecord = prevalenceCountryDict![feature?.properties?.name];
    if (country && country.testsAdministered) {
      const { testsAdministered, geographicalName, numberOfStudies, localEstimate, nationalEstimate, regionalEstimate, sublocalEstimate } = country;
      return { ...feature, properties: { ...feature.properties, testsAdministered, geographicalName, numberOfStudies, localEstimate, nationalEstimate, regionalEstimate, sublocalEstimate } }
    }
    return { ...feature, properties: { ...feature.properties, testsAdministered: null, geographicalName: null, numberOfStudies: null, localEstimate: null, nationalEstimate: null, regionalEstimate: null, sublocalEstimate: null } }
  })
}