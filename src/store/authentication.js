import auth0 from 'auth0-js'
import router from '@/router'

let webAuth

export default {
  init (domain, clientID) {
    webAuth = new auth0.WebAuth({
      domain: domain,
      clientID: clientID,
      redirectUri: window.location.origin + '/',
      audience: `https://${domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid'
    })
  },
  login (username, password) {
    return new Promise((resolve, reject) => {
      webAuth.login({
        realm: 'Username-Password-Authentication',
        username,
        password,
        scope: 'openid'
      }, function (err, resp) {
        if (err) {
          console.log(err)
          reject(err.error_description)
        } else {
          resolve(resp)
        }
      })
    })
  },

  signUp (email, password) {
    return new Promise((resolve, reject) => {
      webAuth.signup({
        connection: 'Username-Password-Authentication',
        email,
        password
      }, function (err, resp) {
        if (err) {
          reject(err.description)
        } else {
          resolve(resp)
        }
      })
    })
  },

  resetPassword (email) {
    return new Promise((resolve, reject) => {
      webAuth.changePassword({
        connection: 'Username-Password-Authentication',
        email
      }, function (err, resp) {
        if (err) {
          reject(err.code)
        } else {
          resolve(resp)
        }
      })
    })
  },

  handleAuthentication () {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err)
        } else if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
          router.go()
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  },

  setSession (authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
  },

  logout () {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // navigate to the home route
    router.go()
  },

  isAuthenticated () {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

}
