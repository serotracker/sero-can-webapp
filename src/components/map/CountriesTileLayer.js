import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import { layerStyle, highlightStyles } from './MapStyle';
import _ from "lodash";
import { createAltPopup } from "../../utils/mapUtils"
//import { createPopup } from "../../utils/mapUtils";
import ReactDOMServer from 'react-dom/server';
// eslint-disable-next-line no-unused-vars
import VectorGrid from "leaflet.vectorgrid";

const toggleCountrySelection = (e, layer, highlightStyle) => {
  // only change selection style on countries that have seroprev data
  const layerStyle = layer._overriddenStyles[e.layer.properties.CODE]; //TODO: refactor this kinda ugly

  if (layerStyle) 
    layer.setFeatureStyle(e.layer.properties.CODE, highlightStyle);
}

const createPopup = () => {
  return (
    <div className="col-12 p-0 flex">
      <div className="col-12 p-0 popup-header">{"Initial"}</div>
    </div>)
}

export default function CountriesTileLayer(props) {

  const { url, records, zIndex } = props;
  const map = useMap();
  const [layer, setLayer] = useState(undefined);
  
  useEffect(() => {
        
    var layer = L.vectorGrid.protobuf(`${url}/tile/{z}/{y}/{x}.pbf`, {
      rendererFactory: L.canvas.tile,
      attribution: '',
      interactive: true,
      vectorTileLayerStyles: layerStyle,
      minZoom: 1,
      minNativeZoom: 3,
      getFeatureId: (feature) => feature.properties.CODE,
      zIndex: zIndex
    }
    ).addTo(map);

    layer.bindPopup(ReactDOMServer.renderToString(createPopup()), { closeButton: false, autoPan: false });

    layer.on({
      mouseover: (e) => {
        if(layer.getPopup())
        {
          layer.openPopup(e.latlng);
          const properties = records.find(x => x.alpha3Code === e.alpha3Code)
          var test2 = createAltPopup(properties,'en')
          layer.setContent();
        }

        toggleCountrySelection(e, e.target, highlightStyles.hovering)
      },
      mouseout: (e) => {
        if(layer.getPopup())
          layer.closePopup();

        toggleCountrySelection(e, e.target, highlightStyles.default)
      },
      mousemove: (e) => {
        const pop = layer.getPopup()
        if(pop)
          pop.setLatLng(e.latlng)
      },
      click: (e) => {}
      })

      setLayer(layer);
  },[])

  useEffect(() => {
    records.forEach(element => {
      if (element.properties.testsAdministered != null)
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
    });
  },[records])

  return null;
}


/*
{
      Countries: function(properties : any) 
      {
      const found = mapRecords.find((x : any)=> x.alpha3Code == properties.CODE)
    
      if (found) {   // If there exists sero prev data, blue, else clear.
          return ({
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
            return ({
                fillColor: '#ffffff',
                fillOpacity : 0
            });
        }
      }
      }
*/