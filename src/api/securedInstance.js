import axios from 'axios'

const urlRoot = 'http://localhost:3000'

let instance

export default function () {
  if (!instance) {
    instance = axios.create({
      baseURL: urlRoot,
      timeout: 1000,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
  }
  return instance
}
