// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'go to auth': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#auth0-lock-container-1', 5000)
      .end()
  },
  'is authenticated': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#auth0-lock-container-1 input[type="email"]', 5000)
      .setValue('#auth0-lock-container-1 input[type="email"]', 'testdfms@rheagroup.com')
      .setValue('#auth0-lock-container-1 input[type="password"]', 'testdfms2018&')
      .click('#auth0-lock-container-1 .auth0-lock-submit')
      .waitForElementVisible('#app', 5000)
      .end()
  }
}
