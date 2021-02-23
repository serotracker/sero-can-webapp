export const Symbology = {
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
          Symbology.StudyFeature.National.Color,
          "Regional",
          Symbology.StudyFeature.Regional.Color,
          "Local",
          Symbology.StudyFeature.Local.Color,
          "Sublocal",
          Symbology.StudyFeature.Sublocal.Color,
          Symbology.StudyFeature.Default.Color,
        ],
        "circle-radius": [
          "match",
          ["get", "estimate_grade"],
          "National",
          Symbology.StudyFeature.National.Size,
          "Regional",
          Symbology.StudyFeature.Regional.Size,
          "Local",
          Symbology.StudyFeature.Local.Size,
          "Sublocal",
          Symbology.StudyFeature.Sublocal.Size,
          Symbology.StudyFeature.Default.Size,
        ],
        "circle-opacity": 0.6,
      } as mapboxgl.CirclePaint,

      Countries : {
        'fill-outline-color' : Symbology.Border.Color,
        'fill-color': [
          'case',
          ['boolean', ['feature-state', 'hasData'], false],
          Symbology.CountryFeature.HasData.Color,
          Symbology.CountryFeature.Default.Color
        ],
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hasData'], false],
          Symbology.CountryFeature.HasData.Opacity,
          Symbology.CountryFeature.Default.Opacity
        ]
      }
}

export default MapConfig;