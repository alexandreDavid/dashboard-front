import securedInstance from './securedInstance'

export default {
  async getOrganisation () {
    try {
      const response = await securedInstance().get('/organisation')
      return response.data
    } catch (e) {
      return false
    }
  },
  async getOrganisationByHash (hash) {
    try {
      const response = await securedInstance().get(`/organisation/hash/${hash}`)
      return response.data
    } catch (e) {
      return false
    }
  },
  async setOrganisation (obj) {
    try {
      const response = await securedInstance().put('/organisation', obj)
      return response.data
    } catch (e) {
      return false
    }
  },
  async getOrganisationUsers () {
    try {
      const response = await securedInstance().get(`/organisation/users`)
      return response.data
    } catch (e) {
      return false
    }
  }
}
