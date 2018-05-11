import axios from 'axios'
import Auth from '@/authentication'

const token = Auth.getToken()
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

const urlRoot = '/data'

let structureCache
async function getStructure () {
  if (!structureCache) {
    try {
      const response = await axios.get(
        `${urlRoot}/structure`
      )
      structureCache = response.data
      return structureCache
    } catch (e) {
      return false
    }
  } else {
    return structureCache
  }
}

export default {
  async getAllLayers () {
    try {
      const response = await axios.get(
        `/api/layers/`
      )
      return response.data.objects
    } catch (e) {
      return false
    }
  },
  async getAllParameters () {
    let structure = await getStructure()
    return structure.parameters.filter(p => p.isActive).map(p => {
      p.layerUrl = 'http://demo.dfms.co.uk/geoserver/wms'
      p.layerParameters = {
        layers: `${p.workspaceName}:${p.paramName}`,
        format: 'image/png',
        transparent: true
      }
      p.legendUrl = `http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${p.workspaceName}:${p.paramName}&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;`
      return p
    })
  }
}
