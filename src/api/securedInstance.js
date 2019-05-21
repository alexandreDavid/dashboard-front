import axios from 'axios'
import auth from '@/store/authentication'

const urlRoot = process.env.MANAGEMENT_API_URL

export default function () {
  const instance = axios.create({
    baseURL: urlRoot,
    timeout: 1000,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('id_token')}`,
      'Content-Type': 'application/json'
    }
  })
  instance.interceptors.response.use(response => {
    return response
  }, error => {
    if (error.response.status === 401) {
      auth.logout(error.response.statusText)
    }
    return error
  })
  return instance
}
