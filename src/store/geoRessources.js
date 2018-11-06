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
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_pressure_at_sea_level',
    times: twoDays,
    unit: 'Pa'
  }, {
    name: 'Air pressure at sea level (7 days forecast)',
    layer: 'mogreps:air_pressure_at_sea_level',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_pressure_at_sea_level',
    times: sevenDays,
    unit: 'Pa'
  }, {
    name: 'Air temperature (2 days forecast)',
    layer: 'twoDaysForecast:air_temperature',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'Air temperature (7 days forecast)',
    layer: 'mogreps:air_temperature',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: sevenDays,
    unit: 'K'
  }, {
    name: 'Dewpoint temperature (7 days forecast)',
    layer: 'mogreps:dew_point_temperature',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=mogreps:dew_point_temperature`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: sevenDays,
    unit: 'K'
  }, {
    name: 'High cloud amount (7 days forecast)',
    layer: 'mogreps:high_type_cloud_area_fraction',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=mogreps:high_type_cloud_area_fraction`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: sevenDays,
    unit: 'K'
  }, {
    name: 'Low cloud amount (7 days forecast)',
    layer: 'mogreps:low_type_cloud_area_fraction',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=mogreps:low_type_cloud_area_fraction`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: sevenDays,
    unit: 'K'
  }, {
    name: 'Relative humidity (2 days forecast)',
    layer: 'twoDaysForecast:relative_humidity',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:relative_humidity`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/relative_humidity',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'Relative humidity (7 days forecast)',
    layer: 'mogreps:low_type_cloud_area_fraction',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:relative_humidity`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: sevenDays,
    unit: 'K'
  }, {
    name: 'Total cloud amount (7 days forecast)',
    layer: 'mogreps:cloud_area_fraction_assuming_maximum_random_overlap',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=cloud_area_fraction_assuming_maximum_random_overlap`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: sevenDays,
    unit: 'K'
  }, {
    name: 'Total precipitation rate (2 days forecast)',
    layer: 'twoDaysForecast:stratiform_rainfall_rate_0',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:stratiform_rainfall_rate_0`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'Surface downwelling longwave flux (2 days forecast)',
    layer: 'twoDaysForecast:surface_downwelling_longwave_flux',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_downwelling_longwave_flux`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'Surface atmospheric temperature (2 days forecast)',
    layer: 'twoDaysForecast:surface_temperature',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_temperature`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'TOA outgoing longwave flux (2 days forecast)',
    layer: 'twoDaysForecast:toa_outgoing_longwave_flux',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:toa_outgoing_longwave_flux`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'Visibility (7 days forecast)',
    layer: 'mogreps:visibility_in_air',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=mogreps:visibility_in_air`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: sevenDays,
    unit: 'K'
  }, {
    name: 'Baseflow',
    layer: 'hidrology:OUT_BASEFLOW',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_BASEFLOW`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'Evapotranspiration',
    layer: 'hidrology:OUT_EVAP',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_EVAP`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'Surface runoff',
    layer: 'hidrology:OUT_RUNOFF',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_RUNOFF`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'NDVI',
    layer: 'env_sys:ndvi',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=env_sys:ndvi`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'BAI',
    layer: 'env_sys:bai',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=env_sys:bai`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'Land surface temperature',
    layer: 'pixalytics:land_surface_temperature',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=pixalytics:land_surface_temperature`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }, {
    name: 'Soil moisture content',
    layer: 'pixalytics:soil_moisture_content',
    legend: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=pixalytics:soil_moisture_content`,
    statistics: 'http://demo.dfms.co.uk/data/:type/:name/air_temperature',
    times: twoDays,
    unit: 'K'
  }
]
const defaultFormat = {
  'name': 'Air temperature (2 days forecast)',
  'description': 'MetOffice model ....',
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
  getAllParams () {
    return parameters.map(this.getParameterInfos)
  },
  getParameterInfos (p) {
    return {...defaultFormat,
      ...{
        name: p.name,
        config: {
          layer: {
            link: `${process.env.GEOSERVER_URL}/wms`,
            layerName: p.layer,
            params: {
              date: p.times
            }
          },
          statistics: {
            link: p.statistics
          },
          legend: {
            link: p.legend
          }
        }
      }
    }
  },
  searchByName (name) {
    return parameters.map(this.getParameterInfos).find(p => p.name === name)
  }
}
