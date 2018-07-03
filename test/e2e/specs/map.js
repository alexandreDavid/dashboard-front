const util = require('../util/util')

module.exports = {
  beforeEach: function (browser) {
    util.beforeEach(browser)
    util.authentifie(browser)
    browser
      .waitForElementVisible('#dashboard', 10000)
      .click('#nav-map a')
      .waitForElementVisible('#map-container', 2000)
  },
  'go to map': function (browser) {
    browser.end()
  },
  'open graph from map': function (browser) {
    browser
      .waitForElementVisible('#search-location input[type="text"]', 2000)
      .pause(3000)
      .setValue('#search-location input[type="text"]', 'ab')
      .waitForElementVisible('#autocomplete-results', 5000)
      .keys(browser.Keys.ENTER)
      .click('#managing .row:first-child a')
      .waitForElementVisible('#forecast-selection', 5000)
      .click('#forecast-selection .card:first-child a')
      .waitForElementVisible('#forecast-selection .card:first-child .list-group', 5000)
      .click('#forecast-selection .card:first-child .list-group .list-group-item-action:first-child')
      .waitForElementNotPresent('#forecast-selection', 1000)
      .click('.over-map-left-bottom .open-graph-modal')
      .waitForElementVisible('.graph-modal-content .chart-container', 2000)
      .end()
  }
}
