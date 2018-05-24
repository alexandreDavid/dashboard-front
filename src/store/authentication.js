import auth0 from 'auth0-js'
import router from '@/router'

let webAuth = new auth0.WebAuth({
  domain: 'testada.eu.auth0.com',
  clientID: 'qZ5DC0FX2jQJLAesP93f6YZW0EM1GZk5',
  redirectUri: 'http://localhost:8081/authcallback',
  audience: 'https://testada.eu.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
})

export default {
  login () {
    webAuth.authorize()
  },

  handleAuthentication () {
    webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('/')
      } else if (err) {
        router.replace('error')
      }
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
