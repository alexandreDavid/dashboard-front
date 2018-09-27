import Data from '@/store/data'

let parameters = []
let displayedParameter = false

function getDaysModelsForForecast () {
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
  return [
    {
      value: 2,
      label: '2 days',
      times: twoDays,
      type: 'interval'
    }, {
      value: 10,
      label: '7 days',
      times: sevenDays,
      type: 'interval'
    }, {
      value: 90,
      label: '90 days',
      times: sevenDays,
      type: 'interval'
    }
  ]
}

function getDaysModelsForNdvi () {
  let sevenDays = []
  let initDate = new Date()
  initDate.setHours(23, 59, 59, 0)
  initDate = initDate / 1000 - 30 * 86400
  for (let i = 0; i < 16; i++) {
    sevenDays.push(initDate + i * 172800)
  }
  return [
    {
      times: sevenDays,
      dateFormat: 'days',
      type: 'date'
    }
  ]
}

export default {
  async getAllParameters () {
    // let structure = await Data.getStructure()
    // parameters = structure.parameters.filter(p => p.isActive).map(this.getParameterInfos)

    parameters = [
      {
        displayName: 'Air pressure at sea level',
        groupingId: 0,
        paramDescription: 'Air pressure at sea level',
        paramName: 'air_pressure_at_sea_level',
        workspaceName: 'twoDaysForecast',
        unit: 'Pa',
        hasGraph: true,
        hasTimeFrame: true,
        timeModels: getDaysModelsForForecast()
      }, {
        displayName: 'Air temperature',
        groupingId: 0,
        paramDescription: 'Air temperature',
        paramName: 'air_temperature',
        workspaceName: 'twoDaysForecast',
        unit: 'K',
        hasGraph: true,
        hasTimeFrame: true,
        interactiveLegend: true,
        timeModels: getDaysModelsForForecast()
      }, {
        displayName: 'Relative humidity',
        groupingId: 0,
        paramDescription: 'Relative humidity',
        paramName: 'relative_humidity',
        workspaceName: 'twoDaysForecast',
        unit: '%',
        hasGraph: true,
        hasTimeFrame: true,
        timeModels: getDaysModelsForForecast()
      }, {
        displayName: 'Total precipitation rate',
        groupingId: 0,
        paramDescription: 'Stratiform rainfall rate 0',
        paramName: 'stratiform_rainfall_rate_0',
        workspaceName: 'twoDaysForecast',
        unit: 'Kg/m2/s',
        hasGraph: true,
        hasTimeFrame: true,
        timeModels: getDaysModelsForForecast()
      }, {
        displayName: 'Surface downwelling longwave flux',
        groupingId: 0,
        paramDescription: 'Surface downwelling longwave flux',
        paramName: 'surface_downwelling_longwave_flux',
        workspaceName: 'twoDaysForecast',
        unit: 'W/m2',
        hasGraph: true,
        hasTimeFrame: true,
        timeModels: getDaysModelsForForecast()
      }, {
        displayName: 'Surface atmospheric temperature',
        groupingId: 0,
        paramDescription: 'Surface temperature',
        paramName: 'surface_temperature',
        workspaceName: 'twoDaysForecast',
        unit: 'K',
        hasGraph: true,
        hasTimeFrame: true,
        timeModels: getDaysModelsForForecast()
      }, {
        displayName: 'TOA outgoing longwave flux',
        groupingId: 0,
        paramDescription: 'TOA outgoing longwave flux',
        paramName: 'toa_outgoing_longwave_flux',
        workspaceName: 'twoDaysForecast',
        unit: 'W/m2',
        hasGraph: true,
        hasTimeFrame: true,
        timeModels: getDaysModelsForForecast()
      }, {
        displayName: 'Baseflow',
        groupingId: 1,
        paramDescription: 'OUT_BASEFLOW',
        paramName: 'OUT_BASEFLOW',
        workspaceName: 'hidrology',
        unit: 'mm',
        hasGraph: false,
        hasTimeFrame: false
      }, {
        displayName: 'Evapotranspiration',
        groupingId: 1,
        paramDescription: 'OUT_EVAP',
        paramName: 'OUT_EVAP',
        workspaceName: 'hidrology',
        unit: 'mm',
        hasGraph: false,
        hasTimeFrame: false
      }, {
        displayName: 'Surface runoff',
        groupingId: 1,
        paramDescription: 'OUT_RUNOFF',
        paramName: 'OUT_RUNOFF',
        workspaceName: 'hidrology',
        unit: 'mm',
        hasGraph: false,
        hasTimeFrame: false
      }, {
        displayName: 'NDVI',
        groupingId: 2,
        paramDescription: 'NDVI',
        paramName: 'ndvi',
        workspaceName: 'env_sys',
        unit: 'NO_UNIT_SPECIFIED',
        hasGraph: false,
        hasTimeFrame: true,
        timeModels: getDaysModelsForNdvi()
      }, {
        displayName: 'BAI',
        groupingId: 2,
        paramDescription: 'BAI',
        paramName: 'bai',
        workspaceName: 'env_sys',
        unit: 'NO_UNIT_SPECIFIED',
        hasGraph: false,
        hasTimeFrame: false,
        timeModels: getDaysModelsForNdvi()
      }, {
        displayName: 'Land surface temperature',
        groupingId: 2,
        paramDescription: 'Land surface temperature',
        paramName: 'land_surface_temperature',
        workspaceName: 'pixalytics',
        unit: 'K',
        hasGraph: false,
        hasTimeFrame: false,
        timeModels: getDaysModelsForNdvi()
      }, {
        displayName: 'Soil moisture content',
        groupingId: 2,
        paramDescription: 'Vertical integral from the surface down to the bottom of the soil model',
        paramName: 'soil_moisture_content',
        workspaceName: 'pixalytics',
        unit: 'Kg/m2',
        hasGraph: false,
        hasTimeFrame: false
      }
    ].map(this.getParameterInfos)
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
  setDisplayedParameter (parameter) {
    displayedParameter = parameter
  },
  getDisplayedParameter () {
    return displayedParameter
  },
  getParams () {
    return parameters
  }
}
