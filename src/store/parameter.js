import Data from '@/store/data'

let parameters = []
let displayedParameter = {}

export default {
  async getAllParameters () {
    let structure = await Data.getStructure()
    parameters = structure.parameters.filter(p => p.isActive).map(this.getParameterInfos)
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
    if (p.paramName === 'air_temperature') {
      p.layerUrl = 'http://18.130.18.23:8180/geoserver/wms'
      p.layerUrl = `http://35.178.87.6/proxy/geoserver/metoffice/wms`
      p.layerParameters.layers = `metoffice:${p.paramName}`
      p.interactiveLegend = true
      p.legendUrl = `http://35.178.87.6/proxy/geoserver/metoffice/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${p.workspaceName}:${p.paramName}&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;`
    }
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
