import Data from '@/data'
import MapObj from '@/map'

let parameters = []
let displayedParameter = {}

export default {
  async getAllParameters () {
    let structure = await Data.getStructure()
    parameters = structure.parameters.filter(p => p.isActive).map(p => {
      p.layerUrl = `${process.env.GEOSERVER_URL}/wms`
      p.layerParameters = {
        layers: `${p.workspaceName}:${p.paramName}`,
        format: 'image/png',
        transparent: true
      }
      p.legendUrl = `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${p.workspaceName}:${p.paramName}&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;`
      return p
    })
    return parameters
  },
  async getAllParameterGroupings () {
    let structure = await Data.getStructure()
    return structure.parameterGroupings
  },
  setDisplayedParameter (parameter) {
    displayedParameter = parameter
    MapObj.setDisplayedLayer(displayedParameter.layerUrl, displayedParameter.layerParameters)
  },
  getDisplayedParameter () {
    return displayedParameter
  }
}
