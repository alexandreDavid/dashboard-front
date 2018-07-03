const util = require('../util/util')

module.exports = {
  beforeEach: function (browser) {
    util.beforeEach(browser)
    util.authentifie(browser)
    browser
      .waitForElementVisible('#dashboard', 10000)
      .click('#map a')
      .waitForElementVisible('#map-container', 2000)
  },
  'go to map': function (browser) {
    browser.end()
  },
  'zoom to location': function (browser) {
    browser
      .waitForElementVisible('#search-location input[type="text"]', 2000)
      .click('#search-location input[type="text"]')
      .setValue('#search-location input[type="text"]', 'ab')
      .click('#search-location input[type="text"]')
      .waitForElementVisible('#autocomplete-results', 5000)
      .end()
  }
}
