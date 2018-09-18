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
        hasTimeFrame: true
      }, {
        displayName: 'Air temperature',
        groupingId: 0,
        paramDescription: 'Air temperature',
        paramName: 'air_temperature',
        workspaceName: 'twoDaysForecast',
        unit: 'K',
        hasTimeFrame: true
      }, {
        displayName: 'Relative humidity',
        groupingId: 0,
        paramDescription: 'Relative humidity',
        paramName: 'relative_humidity',
        workspaceName: 'twoDaysForecast',
        unit: '%',
        hasTimeFrame: true
      }, {
        displayName: 'Stratiform rainfall rate 0',
        groupingId: 0,
        paramDescription: 'Stratiform rainfall rate 0',
        paramName: 'stratiform_rainfall_rate_0',
        workspaceName: 'twoDaysForecast',
        unit: 'Kg/m^2*s',
        hasTimeFrame: true
      }, {
        displayName: 'Surface downwelling longwave flux',
        groupingId: 0,
        paramDescription: 'Surface downwelling longwave flux',
        paramName: 'surface_downwelling_longwave_flux',
        workspaceName: 'twoDaysForecast',
        unit: 'W/m^2',
        hasTimeFrame: true
      }, {
        displayName: 'Surface temperature',
        groupingId: 0,
        paramDescription: 'Surface temperature',
        paramName: 'surface_temperature',
        workspaceName: 'twoDaysForecast',
        unit: 'K',
        hasTimeFrame: true
      }, {
        displayName: 'TOA outgoing longwave flux',
        groupingId: 0,
        paramDescription: 'TOA outgoing longwave flux',
        paramName: 'toa_outgoing_longwave_flux',
        workspaceName: 'twoDaysForecast',
        unit: 'W/m^2',
        hasTimeFrame: true
      }, {
        displayName: 'OUT BASEFLOW',
        groupingId: 1,
        paramDescription: 'OUT_BASEFLOW',
        paramName: 'OUT_BASEFLOW',
        workspaceName: 'hidrology',
        unit: 'NO_UNIT_SPECIFIED',
        hasTimeFrame: true
      }, {
        displayName: 'OUT EVAP',
        groupingId: 1,
        paramDescription: 'OUT_EVAP',
        paramName: 'OUT_EVAP',
        workspaceName: 'hidrology',
        unit: 'NO_UNIT_SPECIFIED',
        hasTimeFrame: true
      }, {
        displayName: 'OUT RUNOFF',
        groupingId: 1,
        paramDescription: 'OUT_RUNOFF',
        paramName: 'OUT_RUNOFF',
        workspaceName: 'hidrology',
        unit: 'NO_UNIT_SPECIFIED',
        hasTimeFrame: true
      }, {
        displayName: 'NDVI',
        groupingId: 2,
        paramDescription: 'NDVI',
        paramName: 'ndvi',
        workspaceName: 'env_sys',
        unit: 'NO_UNIT_SPECIFIED',
        hasTimeFrame: false
      }, {
        displayName: 'BAI',
        groupingId: 2,
        paramDescription: 'BAI',
        paramName: 'bai',
        workspaceName: 'env_sys',
        unit: 'NO_UNIT_SPECIFIED',
        hasTimeFrame: false
      }, {
        displayName: 'Land surface temperature',
        groupingId: 2,
        paramDescription: 'Land surface temperature',
        paramName: 'land_surface_temperature',
        workspaceName: 'pixalytics',
        unit: 'K',
        hasTimeFrame: false
      }, {
        displayName: 'Soil moisture content',
        groupingId: 2,
        paramDescription: 'Soil moisture content',
        paramName: 'soil_moisture_content',
        workspaceName: 'pixalytics',
        unit: 'NO_UNIT_SPECIFIED',
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
    p.legendUrl = `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${p.workspaceName}:${p.paramName}&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;`
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
