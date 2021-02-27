export const MapSymbology = {
    StudyFeature: {
        National: {
            Color: '#094180',
            Size: 11
        },
        Regional: {
            Color: '#F19E66',
            Size: 9
        },
        Local: {
            Color: '#E15759',
            Size: 6
        },
        Sublocal: {
            Color: '#E15759',
            Size: 5
        },
        Default: {
            Color: '#FFFFFF',
            Size: 0
        }
    },
    CountryFeature: {
        HasData: {
            Color: '#97b1bd',
            Opacity: 0.5 
        },
        Default: {
            Color: '#FFFFFF',
            Opacity: 0 
        }
    },
    Border: {
        Color: "#455a64"
    }
}

const MapConfig = {
    Studies: {
        "circle-color": [
          "match",
          ["get", "estimate_grade"],
          "National",
          MapSymbology.StudyFeature.National.Color,
          "Regional",
          MapSymbology.StudyFeature.Regional.Color,
          "Local",
          MapSymbology.StudyFeature.Local.Color,
          "Sublocal",
          MapSymbology.StudyFeature.Sublocal.Color,
          MapSymbology.StudyFeature.Default.Color,
        ],
        "circle-radius": [
          "match",
          ["get", "estimate_grade"],
          "National",
          MapSymbology.StudyFeature.National.Size,
          "Regional",
          MapSymbology.StudyFeature.Regional.Size,
          "Local",
          MapSymbology.StudyFeature.Local.Size,
          "Sublocal",
          MapSymbology.StudyFeature.Sublocal.Size,
          MapSymbology.StudyFeature.Default.Size,
        ],
        "circle-opacity": 0.6,
      } as mapboxgl.CirclePaint,

      Countries : {
        //'fill-outline-color' : MapSymbology.Border.Color,
        'fill-color': [
          'case',
          ['boolean', ['feature-state', 'hasData'], false],
          MapSymbology.CountryFeature.HasData.Color,
          MapSymbology.CountryFeature.Default.Color
        ],
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hasData'], false],
          MapSymbology.CountryFeature.HasData.Opacity,
          MapSymbology.CountryFeature.Default.Opacity
        ]
      }
}

export default MapConfig;