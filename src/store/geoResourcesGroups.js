import axios from 'axios'

const urlRoot = process.env.CATALOGUE_API_URL

export default {
  async getAllGroups () {
    const response = await axios.get(
      `${urlRoot}/groups`
    )
    return response.data
  }
}
