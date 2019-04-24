import securedInstance from './securedInstance'

export default {
  async getAll () {
    try {
      const response = await securedInstance().get('/basemaps')
      return response.data
    } catch (e) {
      return false
    }
  },
  async getActive () {
    try {
      const response = await securedInstance().get('/basemaps/active')
      return response.data
    } catch (e) {
      return false
    }
  },
  async setActive (id) {
    try {
      const response = await securedInstance().put(`/basemaps/active/${id}`)
      return response.data
    } catch (e) {
      return false
    }
  }
}
