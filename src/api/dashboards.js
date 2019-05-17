import securedInstance from './securedInstance'

export default {
  async getAll () {
    try {
      const response = await securedInstance().get('/dashboards')
      return response.data
    } catch (e) {
      return false
    }
  },
  async getById (id) {
    try {
      const response = await securedInstance().get(
        `/dashboards/${id}`
      )
      return response.data
    } catch (e) {
      return false
    }
  },
  async add (dashboard) {
    try {
      const response = await securedInstance().post('/dashboards',
        dashboard
      )
      return response.data
    } catch (e) {
      return false
    }
  },
  async update (dashboard) {
    try {
      const response = await securedInstance().put(
        `/dashboards/${dashboard.id}`,
        dashboard
      )
      return response.data
    } catch (e) {
      return false
    }
  },
  async delete (dashboard) {
    try {
      const response = await securedInstance().delete(
        `/dashboards/${dashboard.id}`
      )
      return response.data
    } catch (e) {
      return false
    }
  },
  async getShared () {
    try {
      const response = await securedInstance().get('/dashboards/shared')
      return response.data
    } catch (e) {
      return false
    }
  },
  async setShared (dashboard, shared) {
    try {
      const response = await securedInstance().patch(`/dashboards/${dashboard.id}`, { shared })
      return response.data
    } catch (e) {
      return false
    }
  }
}
