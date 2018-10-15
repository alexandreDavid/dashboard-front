import Data from '@/store/data'

let parameters = []
let displayedParameters = []

export default {
  async getAllParameters () {
    // let structure = await Data.getStructure()
    // parameters = structure.parameters.filter(p => p.isActive).map(this.getParameterInfos)

    let twoDays = []
    let sevenDays = []
    // Try to find value to display to be removed for a smart service
    const initDate = new Date()
    // initDate.setDate(18)
    // initDate.setMonth(6)
    initDate.setHours(0, 0, 0, 0)
    for (let i = 0; i < 16; i++) {
      let startTime = initDate / 1000 + i * 10800
      let endTime = initDate / 1000 + (i + 1) * 10800
      twoDays.push({startTime, endTime})
    }
    for (let i = 0; i < 28; i++) {
      let startTime = initDate / 1000 + i * 21600
      let endTime = initDate / 1000 + (i + 1) * 21600
      sevenDays.push({startTime, endTime})
    }
    let twoDaysHrWallingford = []
    // Try to find value to display to be removed for a smart service
    // const initDate = new Date()
    initDate.setDate(3)
    initDate.setMonth(1)
    initDate.setFullYear(2014)
    initDate.setHours(0, 0, 0, 0)
    for (let i = 0; i < 16; i++) {
      let startTime = initDate / 1000 + i * 10800
      let endTime = initDate / 1000 + (i + 1) * 10800
      twoDaysHrWallingford.push({startTime, endTime})
    }

    let sevenDaysSatellite = []
    let initDateSatellite = new Date()
    initDateSatellite.setHours(23, 59, 59, 0)
    initDateSatellite = initDateSatellite / 1000 - 30 * 86400
    for (let i = 0; i < 16; i++) {
      sevenDaysSatellite.push(initDateSatellite + i * 172800)
    }

    parameters = [
      {
        label: 'Air pressure at sea level',
        paramName: 'air_pressure_at_sea_level',
        type: 'interval',
        family: 'weather',
        times: twoDays,
        groupingId: 0,
        unit: 'Pa',
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level`,
        hasGraph: true,
        hasTimeFrame: true,
        data: [
          {
            label: '2 days',
            layer: 'twoDaysForecast:air_pressure_at_sea_level',
            type: 'interval',
            times: twoDays
          }, {
            label: '7 days',
            layer: 'mogreps:air_pressure_at_sea_level',
            type: 'interval',
            times: sevenDays
          }
        ]
      }, {
        label: 'Air temperature',
        paramName: 'air_temperature',
        groupingId: 0,
        hasTimeFrame: true,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature`,
        family: 'weather',
        unit: 'K',
        data: [
          {
            label: '2 days',
            layer: 'twoDaysForecast:air_temperature',
            type: 'interval',
            times: twoDays
          }, {
            label: '7 days',
            data: [
              {
                label: 'min',
                layer: 'mogreps:air_temperature_0',
                type: 'interval',
                times: sevenDays
              }, {
                label: 'avg',
                layer: 'mogreps:air_temperature',
                type: 'interval',
                times: sevenDays
              }, {
                label: 'max',
                layer: 'mogreps:air_temperature_1',
                type: 'interval',
                times: sevenDays
              }
            ]
          }
        ]
      }, {
        label: 'Dewpoint temperature',
        groupingId: 0,
        paramDescription: 'Dewpoint at 1.5m',
        paramName: 'dew_point_temperature',
        unit: 'K',
        hasGraph: false,
        hasTimeFrame: true,
        layer: 'mogreps:dew_point_temperature',
        type: 'interval',
        family: 'weather',
        times: sevenDays,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=mogreps:dew_point_temperature`
      }, {
        label: 'High cloud amount',
        groupingId: 0,
        paramDescription: 'High cloud amount',
        paramName: 'high_type_cloud_area_fraction',
        unit: 'NO_UNIT_SPECIFIED',
        hasGraph: false,
        hasTimeFrame: true,
        layer: 'mogreps:high_type_cloud_area_fraction',
        type: 'interval',
        family: 'weather',
        times: sevenDays,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=mogreps:high_type_cloud_area_fraction`
      }, {
        label: 'Low cloud amount',
        groupingId: 0,
        paramDescription: 'Low cloud amount',
        paramName: 'low_type_cloud_area_fraction',
        unit: 'NO_UNIT_SPECIFIED',
        hasGraph: false,
        hasTimeFrame: true,
        layer: 'mogreps:low_type_cloud_area_fraction',
        type: 'interval',
        family: 'weather',
        times: sevenDays,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=mogreps:low_type_cloud_area_fraction`
      }, {
        label: 'Relative humidity',
        groupingId: 0,
        paramDescription: 'Relative humidity',
        paramName: 'relative_humidity',
        workspaceName: 'twoDaysForecast',
        unit: '%',
        hasGraph: true,
        hasTimeFrame: true,
        family: 'weather',
        data: [
          {
            label: '2 days',
            layer: 'twoDaysForecast:relative_humidity',
            type: 'interval',
            times: twoDays
          }, {
            label: '7 days',
            layer: 'mogreps:relative_humidity',
            type: 'interval',
            times: sevenDays
          }
        ],
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:relative_humidity`
      }, {
        label: 'Total cloud amount',
        groupingId: 0,
        paramDescription: 'Total cloud amount - Random overlap',
        paramName: 'cloud_area_fraction_assuming_maximum_random_overlap',
        unit: 'NO_UNIT_SPECIFIED',
        hasGraph: false,
        hasTimeFrame: true,
        layer: 'mogreps:cloud_area_fraction_assuming_maximum_random_overlap',
        type: 'interval',
        family: 'weather',
        times: sevenDays,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=cloud_area_fraction_assuming_maximum_random_overlap`
      }, {
        label: 'Total precipitation rate',
        groupingId: 0,
        paramDescription: 'Stratiform rainfall rate 0',
        paramName: 'stratiform_rainfall_rate_0',
        workspaceName: 'twoDaysForecast',
        unit: 'Kg/m2/s',
        hasGraph: true,
        hasTimeFrame: true,
        layer: 'twoDaysForecast:stratiform_rainfall_rate_0',
        type: 'interval',
        family: 'weather',
        times: twoDays,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:stratiform_rainfall_rate_0`
      }, {
        label: 'Surface downwelling longwave flux',
        groupingId: 0,
        paramDescription: 'Surface downwelling longwave flux',
        paramName: 'surface_downwelling_longwave_flux',
        workspaceName: 'twoDaysForecast',
        unit: 'W/m2',
        hasGraph: true,
        hasTimeFrame: true,
        layer: 'twoDaysForecast:surface_downwelling_longwave_flux',
        type: 'interval',
        family: 'weather',
        times: twoDays,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_downwelling_longwave_flux`
      }, {
        label: 'Surface atmospheric temperature',
        groupingId: 0,
        paramDescription: 'Surface temperature',
        paramName: 'surface_temperature',
        workspaceName: 'twoDaysForecast',
        unit: 'K',
        hasGraph: true,
        hasTimeFrame: true,
        layer: 'twoDaysForecast:surface_temperature',
        type: 'interval',
        family: 'weather',
        times: twoDays,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_temperature`
      }, {
        label: 'TOA outgoing longwave flux',
        groupingId: 0,
        paramDescription: 'TOA outgoing longwave flux',
        paramName: 'toa_outgoing_longwave_flux',
        workspaceName: 'twoDaysForecast',
        unit: 'W/m2',
        hasGraph: true,
        hasTimeFrame: true,
        layer: 'twoDaysForecast:toa_outgoing_longwave_flux',
        type: 'interval',
        family: 'weather',
        times: twoDays,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:toa_outgoing_longwave_flux`
      }, {
        label: 'Visibility',
        groupingId: 0,
        paramDescription: 'Visibility at 1.5m (incl precip)',
        paramName: 'visibility_in_air',
        unit: 'm',
        hasGraph: false,
        hasTimeFrame: true,
        layer: 'mogreps:visibility_in_air',
        type: 'interval',
        family: 'weather',
        times: sevenDays,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=mogreps:visibility_in_air`
      }, {
        label: 'Baseflow',
        groupingId: 1,
        paramDescription: 'OUT_BASEFLOW',
        paramName: 'OUT_BASEFLOW',
        workspaceName: 'hidrology',
        unit: 'mm',
        hasGraph: false,
        hasTimeFrame: true,
        layer: 'hidrology:OUT_BASEFLOW',
        type: 'interval',
        family: 'hydrology',
        times: twoDaysHrWallingford,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_BASEFLOW`
      }, {
        label: 'Evapotranspiration',
        groupingId: 1,
        paramDescription: 'OUT_EVAP',
        paramName: 'OUT_EVAP',
        workspaceName: 'hidrology',
        unit: 'mm',
        hasGraph: false,
        hasTimeFrame: true,
        layer: 'hidrology:OUT_EVAP',
        type: 'interval',
        family: 'hydrology',
        times: twoDaysHrWallingford,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_EVAP`
      }, {
        label: 'Surface runoff',
        groupingId: 1,
        paramDescription: 'OUT_RUNOFF',
        paramName: 'OUT_RUNOFF',
        workspaceName: 'hidrology',
        unit: 'mm',
        hasGraph: false,
        hasTimeFrame: true,
        layer: 'hidrology:OUT_RUNOFF',
        type: 'interval',
        family: 'hydrology',
        times: twoDaysHrWallingford,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_RUNOFF`
      }, {
        label: 'NDVI',
        groupingId: 2,
        paramDescription: 'NDVI',
        paramName: 'ndvi',
        workspaceName: 'env_sys',
        unit: 'NO_UNIT_SPECIFIED',
        hasGraph: false,
        hasTimeFrame: true,
        layer: 'env_sys:ndvi',
        type: 'date',
        family: 'satellite',
        times: sevenDaysSatellite,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=env_sys:ndvi`
      }, {
        label: 'BAI',
        groupingId: 2,
        paramDescription: 'BAI',
        paramName: 'bai',
        workspaceName: 'env_sys',
        unit: 'NO_UNIT_SPECIFIED',
        hasGraph: false,
        hasTimeFrame: false,
        layer: 'env_sys:bai',
        type: 'date',
        family: 'satellite',
        times: sevenDaysSatellite,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=env_sys:bai`
      }, {
        label: 'Land surface temperature',
        groupingId: 2,
        paramDescription: 'Land surface temperature',
        paramName: 'land_surface_temperature',
        workspaceName: 'pixalytics',
        unit: 'K',
        hasGraph: false,
        hasTimeFrame: true,
        layer: 'pixalytics:land_surface_temperature',
        type: 'date',
        family: 'satellite',
        times: sevenDaysSatellite,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=pixalytics:land_surface_temperature`
      }, {
        label: 'Soil moisture content',
        groupingId: 2,
        paramDescription: 'Vertical integral from the surface down to the bottom of the soil model',
        paramName: 'soil_moisture_content',
        workspaceName: 'pixalytics',
        unit: 'm3/m3',
        hasGraph: false,
        hasTimeFrame: false,
        layer: 'pixalytics:soil_moisture_content',
        family: 'satellite',
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=pixalytics:soil_moisture_content`
      }
    ]
    // ].map(this.getParameterInfos)
    return parameters
  },
  getParameterInfos (p) {
    p.layerUrl = `${process.env.GEOSERVER_URL}/wms`
    p.layerParameters = {
      layers: `${p.workspaceName}:${p.paramName}`,
      format: 'image/png',
      transparent: true
    }
    p.legendUrl = `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${p.workspaceName}:${p.paramName}`
    return p
  },
  async getAllParameterGroupings () {
    let structure = await Data.getStructure()
    return structure.parameterGroupings
  },
  setDisplayedParameters (parameters) {
    displayedParameters = parameters
  },
  getDisplayedParameters () {
    return displayedParameters
  },
  getParams () {
    return parameters
  }
}
