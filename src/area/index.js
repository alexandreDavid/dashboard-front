import Data from '@/data'
import MapObj from '@/map'
import axios from 'axios'

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
  },
  getSelectedArea () {
    return selectedArea
  }
}
