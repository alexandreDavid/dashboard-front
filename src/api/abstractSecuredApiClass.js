import securedInstance from './securedInstance'

export default class {
  constructor (path) {
    this.path = path
  }
  async getAll () {
    try {
      const response = await securedInstance().get(`/${this.path}`)
      return response.data
    } catch (e) {
      return false
    }
  }
  async getById (id) {
    try {
      const response = await securedInstance().get(
        `/${this.path}/${id}`
      )
      return response.data
    } catch (e) {
      return false
    }
  }
  async add (obj) {
    try {
      const response = await securedInstance().post(`/${this.path}`, obj)
      return response.data
    } catch (e) {
      return false
    }
  }
  async update (obj) {
    try {
      const response = await securedInstance().put(`/${this.path}/${obj.id}`, obj)
      return response.data
    } catch (e) {
      return false
    }
  }
  async delete (obj) {
    try {
      const response = await securedInstance().delete(`/${this.path}/${obj.id}`)
      return response.data
    } catch (e) {
      return false
    }
  }
}
