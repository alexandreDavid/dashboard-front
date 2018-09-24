import Data from '@/store/data'

let parameters = []
let displayedParameter = false

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
        hasTimeFrame: true
      }, {
        displayName: 'Air temperature',
        groupingId: 0,
        paramDescription: 'Air temperature',
        paramName: 'air_temperature',
        workspaceName: 'twoDaysForecast',
        unit: 'K',
        hasGraph: true,
        hasTimeFrame: true
      }, {
        displayName: 'Relative humidity',
        groupingId: 0,
        paramDescription: 'Relative humidity',
        paramName: 'relative_humidity',
        workspaceName: 'twoDaysForecast',
        unit: '%',
        hasGraph: true,
        hasTimeFrame: true
      }, {
        displayName: 'Total precipitation rate',
        groupingId: 0,
        paramDescription: 'Stratiform rainfall rate 0',
        paramName: 'stratiform_rainfall_rate_0',
        workspaceName: 'twoDaysForecast',
        unit: 'Kg/m2/s',
        hasGraph: true,
        hasTimeFrame: true
      }, {
        displayName: 'Surface downwelling longwave flux',
        groupingId: 0,
        paramDescription: 'Surface downwelling longwave flux',
        paramName: 'surface_downwelling_longwave_flux',
        workspaceName: 'twoDaysForecast',
        unit: 'W/m2',
        hasGraph: true,
        hasTimeFrame: true
      }, {
        displayName: 'Surface atmospheric temperature',
        groupingId: 0,
        paramDescription: 'Surface temperature',
        paramName: 'surface_temperature',
        workspaceName: 'twoDaysForecast',
        unit: 'K',
        hasGraph: true,
        hasTimeFrame: true
      }, {
        displayName: 'TOA outgoing longwave flux',
        groupingId: 0,
        paramDescription: 'TOA outgoing longwave flux',
        paramName: 'toa_outgoing_longwave_flux',
        workspaceName: 'twoDaysForecast',
        unit: 'W/m2',
        hasGraph: true,
        hasTimeFrame: true
      }, {
        displayName: 'Baseflow',
        groupingId: 1,
        paramDescription: 'OUT_BASEFLOW',
        paramName: 'OUT_BASEFLOW',
        workspaceName: 'hidrology',
        unit: 'mm',
        hasGraph: false,
        hasTimeFrame: true
      }, {
        displayName: 'Evapotranspiration',
        groupingId: 1,
        paramDescription: 'OUT_EVAP',
        paramName: 'OUT_EVAP',
        workspaceName: 'hidrology',
        unit: 'mm',
        hasGraph: false,
        hasTimeFrame: true
      }, {
        displayName: 'Surface runoff',
        groupingId: 1,
        paramDescription: 'OUT_RUNOFF',
        paramName: 'OUT_RUNOFF',
        workspaceName: 'hidrology',
        unit: 'mm',
        hasGraph: false,
        hasTimeFrame: true
      }, {
        displayName: 'NDVI',
        groupingId: 2,
        paramDescription: 'NDVI',
        paramName: 'ndvi',
        workspaceName: 'env_sys',
        unit: 'NO_UNIT_SPECIFIED',
        hasGraph: false,
        hasTimeFrame: false
      }, {
        displayName: 'BAI',
        groupingId: 2,
        paramDescription: 'BAI',
        paramName: 'bai',
        workspaceName: 'env_sys',
        unit: 'NO_UNIT_SPECIFIED',
        hasGraph: false,
        hasTimeFrame: false
      }, {
        displayName: 'Land surface temperature',
        groupingId: 2,
        paramDescription: 'Land surface temperature',
        paramName: 'land_surface_temperature',
        workspaceName: 'pixalytics',
        unit: 'K',
        hasGraph: false,
        hasTimeFrame: false
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
