import Data from '@/data'
import MapObj from '@/map'
import axios from 'axios'
import Api from '@/api'

let selectedArea = {}

export default {
  async getAllAreas () {
    let structure = await Data.getStructure()
    return structure.districts.map(d => {
      d.type = 'district'
      return d
    })
  },
  async setSelectedArea (area) {
    selectedArea = area
    const areaData = await axios.get(
      `/geoserver/${selectedArea.workspaceName}/ows`, {
        params: {
          service: 'WFS',
          version: '1.1.1',
          request: 'GetFeature',
          typeName: `${selectedArea.workspaceName}:${selectedArea.paramName}`,
          outputFormat: 'application/json'
        }
      }
    )
    MapObj.setAreaLayer(areaData.data)
    this.zoomToArea()
  },
  getSelectedArea () {
    return selectedArea
  },
  zoomToArea () {
    MapObj.zoomToAreaLayer()
  },
  async getAreaInfos (area) {
    const infos = await Api.getAreaInfos(area)
    return infos
  }
}
