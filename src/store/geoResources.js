import axios from 'axios'

const urlRoot = process.env.CATALOGUE_API_URL

let parameters = []

export default {
  async getAllResources () {
    const response = await axios.get(
      `${urlRoot}/resources`
    )
    parameters = response.data
    return parameters
  },
  getAll () {
    return parameters
  },
  searchById (id) {
    return parameters.find(p => p.id === id)
  }
}
