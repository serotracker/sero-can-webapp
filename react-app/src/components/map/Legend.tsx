import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const Legend = () => {
  const { map } = useLeaflet();
  console.log(map);

  useEffect(() => {

    // TODO: Abstract to utility function that gets dynamically set for proper ranges
    const getColor = (d: number) => {
      return d === 1 ? '#800026' :
        d === 2 ? '#BD0026' :
          d === 3 ? '#E31A1C' :
            d === 4 ? '#FC4E2A' :
              d === 5 ? '#FD8D3C' :
                d === 6 ? '#FEB24C' :
                  d === 7 ? '#FED976' :
                    '#FFEDA0';
    }

    // apparently this is not caught in the typings so I have to any it
    const control = L.control as any
    const legend = control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [1, 2, 3, 4, 5, 6, 7, 8];

      const labels = grades.map((value, index) => {        
        if(index !== grades.length) {
          const from = value;
          const to = grades[index + 1]
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
