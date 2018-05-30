'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TRACKER_URL: '"//127.0.0.1:8888/piwik/"',
  TRACKER_SITE_ID: '1',
  AUTH: {
    domain: '"testada.eu.auth0.com"',
    clientID: '"qZ5DC0FX2jQJLAesP93f6YZW0EM1GZk5"',
    redirectUri: '"http://localhost:8081/authcallback"',
  }
})
