'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // MANAGEMENT_API_URL: '"http://localhost:3000"',
  GOOGLE_ANALYTICS_KEY: '"UA-129728715-1"'
})
