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
  async getUser () {
    const response = await securedInstance().get('/user')
    return response.data
  },
  async setUser (user) {
    const response = await securedInstance().put('/user', user)
    return response.data
  },
  async login (username, password) {
    return checkResponse('/user/login', { username, password })
  },
  async forgotPassword (email) {
    if (!email) {
      const user = await this.getUser()
      email = user.email
    }
    return checkResponse('/user/forgot_password', { email })
  },
  async changePassword (current, password, passwordConfirmation) {
    return checkResponse('/user/change_password', { current, password, passwordConfirmation })
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
  },
  async isSuperAdmin () {
    try {
      const response = await securedInstance().get('/user/is_super_admin')
      return response.data
    } catch (e) {
      return false
    }
  },
  async deleteUser () {
    const response = await securedInstance().delete('/user')
    return response.data
  }
}
