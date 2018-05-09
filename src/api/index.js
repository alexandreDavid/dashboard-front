import axios from 'axios'
import Auth from '@/authentication'
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
      return true
    } catch (e) {
      return false
    }
  }
}
