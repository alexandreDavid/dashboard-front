let twoDays = []
let sevenDays = []
// Try to find value to display to be removed for a smart service
const initDate = new Date()
// initDate.setDate(18)
// initDate.setMonth(6)
initDate.setHours(0, 0, 0, 0)
for (let i = 0; i < 16; i++) {
  twoDays.push(initDate / 1000 + i * 10800)
}
for (let i = 0; i < 28; i++) {
  sevenDays.push(initDate / 1000 + i * 21600)
}

let parameters = [
  {
    name: 'Air pressure at sea level (2 days forecast)',
    layer: 'twoDaysForecast:air_pressure_at_sea_level',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level`,
    times: twoDays,
    unit: 'Pa'
  }, {
    name: 'Air pressure at sea level (7 days forecast)',
    layer: 'mogreps:air_pressure_at_sea_level',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level`,
    times: sevenDays,
    unit: 'Pa'
  }, {
    name: 'Air temperature (2 days forecast)',
    layer: 'twoDaysForecast:air_temperature',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature`,
    // times: twoDays,
    unit: 'K'
  }, {
    name: 'Air temperature (7 days forecast)',
    layer: 'mogreps:air_temperature',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature`,
    times: sevenDays,
    unit: 'K'
  }
]
const defaultFormat = {
  'name': 'Air temperature (2 days forecast)',
  'desc': 'MetOffice model ....',
  'type': 'tms',
  'tags': ['wheater', 'forecast', 'metoffice', '2 days'],
  'config': {
    'layer': {
      'timeserie': true,
      'link': 'https://dfms.co.uk/v1/api/map/tms/air_temperature_2_days/{date}/{unit}/{z}/{x}/{y}.{format}',
      'params': {
        'date': [
          '2018-09-10 12:00', '2018-09-10 15:00', '2018-09-10 18:00', '2018-09-10 21:00'
        ],
        'unit': [
          'f', 'c', 'k'
        ],
        'format': [
          'png', 'jpeg', 'gridjson', 'mvt'
        ]
      }
    },
    'statistics': {
      'link': 'https://dfms.co.uk/v1/api/statistics/air_temperature_2_days/{date_range-date_range}/{unit}',
      'params': {
        'date_range': [
          '2018-09-10 12:00', '2018-09-10 15:00', '2018-09-10 18:00', '2018-09-10 21:00'
        ],
        'unit': [
          'f', 'c', 'k'
        ]
      }
    },
    'legend': {
      'link': 'https://dfms.co.uk/v1/api/map/tms/air_temperature_2_days/{date}/{unit}/legend',
      'params': {
        'date_range': [
          '2018-09-10 12:00', '2018-09-10 15:00', '2018-09-10 18:00', '2018-09-10 21:00'
        ],
        'unit': [
          'f', 'c', 'k'
        ]
      }
    }
  },
  'extent': {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [[
          -22.5,
          28.304380682962783
        ],
        [
          23.203125,
          28.304380682962783
        ],
        [
          23.203125,
          49.15296965617042
        ],
        [
          -22.5,
          49.15296965617042
        ],
        [
          -22.5,
          28.304380682962783
        ]]
      ]
    }
  }
}

export default {
  async getAll () {
    return parameters.map(this.getParameterInfos)
  },
  getParameterInfos (p) {
    return Object.assign({
      name: p.name,
      config: {
        layer: {
          link: `${process.env.GEOSERVER_URL}/wms`,
          layerName: p.layer,
          params: {
            date: p.times
          }
        },
        legend: {
          link: p.legend
        }
      }
    }, ...defaultFormat)
  }
}
