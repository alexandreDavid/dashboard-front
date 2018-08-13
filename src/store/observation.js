import axios from 'axios'

const urlRoot = `${process.env.API_URL}/observation`

export default {
  async getAllObservationsType (type) {
    try {
      const response = await axios.get(`${urlRoot}/${type}`)
      return response.data
    } catch (e) {
      return []
    }
  }
}
