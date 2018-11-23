'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AUTH: {
    domain: '"testada.eu.auth0.com"',
    clientID: '"qZ5DC0FX2jQJLAesP93f6YZW0EM1GZk5"'
  },
  GOOGLE_ANALYTICS_KEY: '"UA-129728715-1"'
})
