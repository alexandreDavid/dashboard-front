// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  beforeEach: function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    browser.url(devServer)
  },
  go2Auth: function (browser) {
    browser.waitForElementVisible('#auth0-lock-container-1 input[type="email"]', 5000)
  },
  authentifie: function (browser) {
    this.go2Auth(browser)
    browser
      .setValue('#auth0-lock-container-1 input[type="email"]', 'testdfms@rheagroup.com')
      .setValue('#auth0-lock-container-1 input[type="password"]', 'testdfms2018&')
      .click('#auth0-lock-container-1 .auth0-lock-submit')
      .waitForElementVisible('#app', 5000)
  }
}
