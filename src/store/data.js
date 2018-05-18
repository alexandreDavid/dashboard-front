import axios from 'axios'
import Auth from '@/store/authentication'

const token = Auth.getToken()
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

const urlRoot = process.env.DATA_URL

let structureCache

export default {
  async getStructure () {
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
  },
  async getAreaParameterData (area, parameter) {
    try {
      const response = await axios.get(
        `${urlRoot}/${area.type}/${area.paramName}/${parameter.paramName}`
      )
      return response.data[parameter.paramName]
    } catch (e) {
      return false
    }
  }
}
