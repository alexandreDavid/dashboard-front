import axios from 'axios'
import Auth from '@/authentication'

const token = Auth.getToken()
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

const urlRoot = '/data'

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
  }
}
