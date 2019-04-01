import axios from 'axios'

const urlRoot = process.env.CATALOGUE_API_URL

let groups = []

export default {
  async getAllGroups () {
    const response = await axios.get(
      `${urlRoot}/groups`
    )
    groups = response.data
    return groups
  },
  getAll () {
    return groups
  }
}
