import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "./Legend.css"
interface legendProps {
  buckets: number[],
  getColor: (d: number | null) => string
}

const Legend = (props: legendProps) => {
  const { map } = useLeaflet();
  const buckets = props.buckets as number[]
  const getColor = props.getColor;
  useEffect(() => {
    const control = L.control as any
    const legend = control({ position: "bottomright" });
    // apparently this is not caught in the typings so I have to any it
    L.DomUtil.remove(legend)
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info flex legend center-item");
      const title = '<h4 className="legend-title col-12 p-0 flex middle">Seroprevalence (logit scale) </h4>'
      const labels = buckets.map((value, index) => {
        if (index !== buckets.length) {
          const from = value;
          const to = buckets[index + 1]
          // TODO: Check into passing in an array of colours instead of the getColor function
          return `<div className="col-12 p-0 flex">
                    <div className="col-12 p-0"> ${from}%${to ? "&ndash;" + to + "%" : "+"}</div>
                    <i className="legend col-12 p-0"style="background:${getColor(from)}"></i>
                  </div>`
        }
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
