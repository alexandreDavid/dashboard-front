import axios from 'axios'

const urlRoot = process.env.MANAGEMENT_API_URL

export default function () {
  return axios.create({
    baseURL: urlRoot,
    timeout: 1000,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('id_token')}`,
      'Content-Type': 'application/json'
    }
  })
}
