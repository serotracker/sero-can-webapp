
import * as Countries from 'i18n-iso-countries';
import English from "i18n-iso-countries/langs/en.json"
import French from "i18n-iso-countries/langs/fr.json"
import { LanguageType } from "../types";
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
  console.log(code);
  const translatedCountryName = Countries.getName(code, language);
  const displayText = translatedCountryName ? translatedCountryName : Translate(optionString, [toPascalCase(country)]);
  return displayText;
}
