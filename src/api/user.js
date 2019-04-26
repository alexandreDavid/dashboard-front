import securedInstance from './securedInstance'

async function checkResponse (url, body) {
  try {
    const response = await securedInstance().post(url, body)
    return response.data
  } catch (error) {
    let errorMessage = 'Something went wrong'
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        errorMessage = `${error.response.data.message} ${error.response.data.policy}`
      } else if (error.response.data.description) {
        errorMessage = error.response.data.description
      }
    }
    throw errorMessage
  }
}
export default {
  async login (username, password) {
    return checkResponse('/user/login', { username, password })
  },
  async changePassword (email) {
    return checkResponse('/user/change_password', { email })
  },
  async signup (email, password, metadata, hash) {
    return checkResponse('/user/signup', { email, password, metadata, hash })
  },
  async isAdmin () {
    try {
      const response = await securedInstance().get('/user/is_admin')
      return response.data
    } catch (e) {
      return false
    }
  }
}
