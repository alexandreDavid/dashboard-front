import axios from 'axios'
import Settings from '@/store/settings'
import MapObj from '@/store/map'

const urlRoot = process.env.API_URL
let dashboard = {
  allContents: []
}

export default {
  async getInitialEnvironmemt () {
    try {
      const response = await axios.get(
        `${urlRoot}/initialEnvironmemt`
      )
      if (response.data.map) {
        MapObj.setDefaultParams(response.data.map)
      }
      if (response.data.settings) {
        Settings.init(response.data.settings)
      }
      return true
    } catch (e) {
      return false
    }
  },
  async getSettings () {
    try {
      const response = await axios.get(
        `${urlRoot}/mock/settings.json`
      )
      return response.data
    } catch (e) {
      return false
    }
  },
  async setSettings (settings) {
    try {
      const response = await axios.post(
        `${urlRoot}/settings`, settings
      )
      return response.data
    } catch (e) {
      return false
    }
  },
  setDashboard (dashboard2Save) {
    dashboard = dashboard2Save
  },
  getDashboard () {
    return dashboard
  }
}
