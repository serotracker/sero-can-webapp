import L from "leaflet";
import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { useLeaflet } from "react-leaflet";
import "./Legend.css";
import { useMediaQuery } from "react-responsive";
interface legendProps {
  buckets: number[],
  getColor: (d: number | null) => string
}

const Legend = (props: legendProps) => {
  const { map } = useLeaflet();
  const buckets = props.buckets as number[]
  const getColor = props.getColor;
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1200 })
  useEffect(() => {
    const control = L.control as any
    const legend = control({ position: "bottomright" });
    // apparently this is not caught in the typings so I have to any it
    legend.onAdd = () => {
      let div = L.DomUtil.create("div", "info flex legend center-item");

      if (isTabletOrMobileDevice) {
        div = L.DomUtil.create("div", "info flex legend-mobile center-item");
      }

      // Don't show the scale until we have all the data
      if (isNaN(buckets[1])) {
        return div
      }

      // Title underneath scale with tooltip
      const title = ReactDOMServer.renderToString(
        <h4 className="legend-title p-0 middle">Seroprevalence
          <span className="flex popup">
            <div className="popup-header col-12 p-0 flex left">Seroprevalence Scale</div>
            <div className="popup-content col-12 p-0 flex start-item left">Made from the logit transform of the maximum value to determine the 'bins'</div>
          </span>
        </h4>)

      const labels = buckets.map((value, index) => {
        if (index !== buckets.length) {
          const from = value;
          const to = buckets[index + 1]
          // TODO: Check into passing in an array of colours instead of the getColor function
          return ReactDOMServer.renderToString(
            <div className="bin flex">
              <div className={isTabletOrMobileDevice ? "col-12 mobile-text p-0" : "col-12 p-0"}>
          {isTabletOrMobileDevice ? `${from}%${to ? '' : "+"}`:`${from}%${to ? `- ${to}%` : "+"}`}</div>
              <i className="col-12 p-0" style={{ background: getColor(from) }}></i>
            </div>
          )
        }
        return null;
      })
      labels.push(title);
      div.innerHTML = labels.join("");
      return div;
    };
    legend.addTo(map);

    return () => {
      map?.removeControl(legend);
    }
  });

  return null;
};

export default Legend;
