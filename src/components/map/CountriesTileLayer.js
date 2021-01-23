import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import { layerStyle, highlightStyles } from './MapStyle';
import { createAltPopup } from "../../utils/mapUtils"
import ReactDOMServer from 'react-dom/server';
// eslint-disable-next-line no-unused-vars
import VectorGrid from "leaflet.vectorgrid";

const toggleCountrySelection = (e, layer, highlightStyle) => {
  // only change selection style on countries that have seroprev data
  const layerStyle = layer._overriddenStyles[e.layer.properties.CODE]; //TODO: refactor this kinda ugly

  if (layerStyle)
    layer.setFeatureStyle(e.layer.properties.CODE, highlightStyle);
}

export default function CountriesTileLayer(props) {

  const { url, records, zIndex, language } = props;
  const map = useMap();
  const [layer, setLayer] = useState(undefined);

  useEffect(() => {
    const vectorGridLayer = L.vectorGrid.protobuf(`${url}/tile/{z}/{y}/{x}.pbf`, {
      rendererFactory: L.svg.tile,
      attribution: '',
      interactive: true,
      vectorTileLayerStyles: layerStyle,
      minZoom: 1,
      minNativeZoom: 3,
      getFeatureId: (feature) => feature.properties.CODE,
      zIndex: zIndex
    }
    ).addTo(map);

    setLayer(vectorGridLayer);
  },[map, url, zIndex])

  useEffect(() => {
    // If the user navigates away from the map and navigates back it will crash unless we copy and check the element 
    const recordsCopy = Object.assign([], records)
    if (layer && recordsCopy)
    {
      recordsCopy.forEach(element => {
        if (element && element.properties && element.properties.testsAdministered != null)
        {
          layer.setFeatureStyle(element.alpha3Code, {
            weight: 1,
            color: '#00456E',
            dashArray: '',
            fillOpacity: 0.7,
            fill: true ,
            zIndex: 200
          });
        }
        else
        {
          layer.resetFeatureStyle(element.alpha3Code);
        }
      });

      layer.on({
        mouseover: (e) => {
          const pop = layer.getPopup()
          if(pop)
          {
            layer.openPopup(e.latlng);
            const country = records.find(x => x.alpha3Code === e.sourceTarget.properties.CODE)
            if (country) {
              pop.setContent(ReactDOMServer.renderToString(createAltPopup(country, language)));
            }
          }

          toggleCountrySelection(e, e.target, highlightStyles.hovering)
        },
        mouseout: (e) => {
          if(layer.getPopup())
          {
            layer.closePopup();
          }

          toggleCountrySelection(e, e.target, highlightStyles.default)
        },
        mousemove: (e) => {
          const pop = layer.getPopup()
          if(pop && e.latlng)
          {
            pop.setLatLng(e.latlng)
          }
        },
        })

        layer.bindPopup(ReactDOMServer.renderToString(null), { closeButton: false, autoPan: false });
    }
  },[records, layer, language])

  return null;
}