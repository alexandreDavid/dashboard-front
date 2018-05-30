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
  login () {
    webAuth.authorize()
  },

  handleAuthentication () {
    const self = this
    webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('/')
      } else if (err) {
        router.replace('error')
      } else {
        self.login()
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
