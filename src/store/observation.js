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
  },
  async getObservationTimeSeries (type, id, start, end, variable) {
    try {
      const response = await axios.get(`${urlRoot}/${type}/${id}/${start}/${end}?${variable}`)
      return response.data[variable].timeseries_data
    } catch (e) {
      return []
    }
  }
}
