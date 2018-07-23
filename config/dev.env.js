'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  GEOSERVER_URL: '"http://52.56.209.230:8180/geoserver"',
  NODE_ENV: '"development"',
  TRACKER_URL: '"//127.0.0.1:8888/piwik/"',
  TRACKER_SITE_ID: '1',
  AUTH: {
    domain: '"testada.eu.auth0.com"',
    clientID: '"qZ5DC0FX2jQJLAesP93f6YZW0EM1GZk5"'
  }
})
