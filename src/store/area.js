import Data from '@/store/data'
import Api from '@/store/api'

let selectedArea

export default {
  async getAllAreas () {
    let structure = await Data.getStructure()
    return structure.districts.map(d => {
      d.type = 'district'
      return d
    })
  },
  setSelectedArea (area) {
    selectedArea = area
  },
  getSelectedArea () {
    return selectedArea
  },
  async getAreaInfos (area) {
    const infos = await Api.getAreaInfos(area)
    return infos
  }
}
