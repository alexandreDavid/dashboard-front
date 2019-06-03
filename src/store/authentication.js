import router from '@/router'
import user from '@/api/user'

export default {
  async login (username, password) {
    const response = await user.login(username, password)
    this.setSession(response)
    router.go('/')
  },

  async signUp (email, password, metadata, hash) {
    return user.signup(email, password, metadata, hash)
  },

  async forgotPassword (email) {
    return user.forgotPassword(email)
  },

  async changePassword (current, password, passwordConfirmation) {
    return user.changePassword(current, password, passwordConfirmation)
  },

  async deleteUser () {
    await user.deleteUser()
    this.logout()
  },

  setSession (authResult) {
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', authResult.expiresAt)
  },

  logout (error) {
    // Clear ID Token from local storage
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // navigate to the home route
    router.push({ name: 'login', params: {error} })
  },

  isAuthenticated () {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

}
