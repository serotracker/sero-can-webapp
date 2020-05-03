import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

interface legendProps {
  buckets: number[]
}

const Legend = (props: legendProps) => {
  const { map } = useLeaflet();
  const buckets = props.buckets as number[]

  useEffect(() => {

    // TODO: Abstract to utility function that gets dynamically set for proper ranges
    const getColor = (d: number | null) => {
      if (d === null) {
        return "#EEEEEE"
      }
      return d <= buckets[0] ? '#F8FCF1' :
        d <= buckets[1] ? '#D2EAC8' :
          d <= buckets[2] ? '#B3DCB8' :
            d <= buckets[3] ? '#8ECAC4' :
              d <= buckets[4] ? '#6AB1CF' :
                d <= buckets[5] ? '#498ABA' :
                  '#265799';
    }

    // apparently this is not caught in the typings so I have to any it
    const control = L.control as any
    const legend = control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      const labels = buckets.map((value, index) => {
        if (index !== buckets.length) {
          const from = value;
          const to = buckets[index + 1]
          return `<i style="background:${getColor(from + 1)}"></i>${from}${to ? "&ndash;" + to : "+"}`
        }
      })

      div.innerHTML = labels.join("<br>");
      return div;
    };

    legend.addTo(map);
  });
  return null;
};

export default Legend;
