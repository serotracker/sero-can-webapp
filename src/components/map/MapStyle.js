export default {
    Land : {
        weight: 1,
        color: "#ECEEEE",
        fillColor: "#ECEEEE",
        opacity: 1
        },
    Ocean : {
        weight: 1,
        color: "#CAD2D3",
        fillColor: "#CAD2D3",
        opacity: 1
        },
    Default : {
        color: "#C1C1C1",
    },
    Countries: function(properties, zoom, geometryDimension) {

        const codeISO3 = properties.CODE;

	    if (codeISO3) {   // If there exists sero prev data, blue, else clear.
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

};