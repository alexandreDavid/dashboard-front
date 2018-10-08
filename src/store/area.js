import axios from 'axios'
import UserConfiguration from '@/store/userConfiguration'

const urlRoot = `${process.env.API_URL}/areas`
let selectedArea

export default {
  async searchAreas (areaName) {
    try {
      const response = await axios.get(
        `${urlRoot}/search`, {
          params: {
            name: areaName
          }
        }
      )
      return response.data
    } catch (e) {
      return []
    }
  },
  setSelectedArea (area) {
    UserConfiguration.setActiveArea(area)
    selectedArea = area
  },
  getSelectedArea () {
    return selectedArea
  },
  async getAreaInfos (area) {
    try {
      const response = await axios.get(
        `${urlRoot}/mock/area.json`, {
          params: {
            area: area
          }
        }
      )
      return response.data
    } catch (e) {
      return false
    }
  }
}
