import axios from 'axios'
import Auth from '@/authentication'
import Settings from '@/settings'
import MapObj from '@/map'

const token = Auth.getToken()
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

const urlRoot = 'http://localhost:3000'

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
  }
}
