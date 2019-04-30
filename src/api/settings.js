import securedInstance from './securedInstance'

export default {
  async getAll () {
    try {
      const response = await securedInstance().get('/settings')
      return response.data
    } catch (e) {
      return false
    }
  },
  async getActive () {
    try {
      const response = await securedInstance().get('/settings/active')
      return response.data
    } catch (e) {
      return false
    }
  },
  async setActive (id, key) {
    try {
      const response = await securedInstance().put(`/settings/active/${id}`, { key })
      return response.data
    } catch (e) {
      return false
    }
  }
}
