import L, { FeatureGroup, LeafletEvent, LeafletMouseEvent } from 'leaflet';
import { useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import { useMap } from "react-leaflet";
import { LanguageType } from '../../types';
import { createAltPopup } from "../../utils/mapUtils";
import { highlightStyles, layerStyle } from './MapStyle';

interface countrySelectionProps {
  url: string
  records: Record<string, any>[],
  zIndex: number,
  language: LanguageType
}

const toggleCountrySelection = (e: LeafletEvent, layer: any, highlightStyle: any) => {
  // only change selection style on countries that have seroprev data
  const layerStyle = layer._overriddenStyles[e.layer.properties.CODE]; //TODO: refactor this kinda ugly

  if (layerStyle)
    layer.setFeatureStyle(e.layer.properties.CODE, highlightStyle);
}

export default function CountriesTileLayer(props: countrySelectionProps) {

  const { url, records, zIndex, language } = props;
  const map = useMap();
  const [layer, setLayer] = useState(undefined as any);
  const Lcopy = L as any
  useEffect(() => {
    var layer = Lcopy.vectorGrid.protobuf(`${url}/tile/{z}/{y}/{x}.pbf`, {
      rendererFactory: Lcopy.svg.tile,
      attribution: '',
      interactive: true,
      vectorTileLayerStyles: layerStyle,
      minZoom: 1,
      minNativeZoom: 3,
      getFeatureId: (feature: GeoJSON.Feature) => feature.properties?.CODE,
      zIndex: zIndex
    }
    ).addTo(map);

    setLayer(layer);
  }, [Lcopy.svg.tile, Lcopy.vectorGrid, map, url, zIndex])

  useEffect(() => {
    if (layer) {
      records.forEach((element) => {
        if (element.properties.testsAdministered != null) {
          layer.setFeatureStyle(element.alpha3Code, {
            weight: 1,
            color: '#00456E',
            dashArray: '',
            fillOpacity: 0.7,
            fill: true,
            zIndex: 200
          });
        }
        else {
          layer.resetFeatureStyle(element.alpha3Code);
        }
      });

      layer.on({
        mouseover: (e: LeafletMouseEvent) => {
          var pop = layer.getPopup()
          if (pop) {
            layer.openPopup(e.latlng);
            const country = records.find(x => x.alpha3Code === e.sourceTarget.properties.CODE)
            if (country) {
              var test2 = ReactDOMServer.renderToString(createAltPopup(country, language))
              pop.setContent(test2);
            }
          }

          toggleCountrySelection(e, e.target, highlightStyles.hovering)
        },
        mouseout: (e: LeafletMouseEvent) => {
          if (layer.getPopup())
            layer.closePopup();

          toggleCountrySelection(e, e.target, highlightStyles.default)
        },
        mousemove: (e: LeafletMouseEvent) => {
          const pop = layer.getPopup()
          if (pop && e.latlng)
            pop.setLatLng(e.latlng)
        },
        click: () => { }
      })

      layer.bindPopup(ReactDOMServer.renderToString(null as any), { closeButton: false, autoPan: false });
    }
  }, [records, layer, language])

  return null;
}