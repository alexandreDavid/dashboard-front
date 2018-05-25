'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TRACKER_URL: '"//127.0.0.1:8888/piwik/"',
  TRACKER_SITE_ID: '1'
})
