import axios from 'axios'

const urlRoot = 'http://localhost:3000'

const instance = axios.create({
  baseURL: urlRoot,
  timeout: 1000,
  headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
})

export default {
  async getAll () {
    try {
      const response = await axios.get(
        `${urlRoot}/basemaps`
      )
      return response.data
    } catch (e) {
      return false
    }
  },
  async getActive () {
    try {
      const response = await instance.get(
        `${urlRoot}/basemaps/active`
      )
      return response.data
    } catch (e) {
      return false
    }
  },
  async setActive (id) {
    try {
      const response = await instance.put(
        `${urlRoot}/basemaps/active/${id}`
      )
      return response.data
    } catch (e) {
      return false
    }
  }
}
