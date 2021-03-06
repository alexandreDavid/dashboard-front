// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/utils/fontAwesome'
import VueTour from 'vue-tour'
import VueMq from 'vue-mq'
import VueAnalytics from 'vue-analytics'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Vue.config.productionTip = (process.env.NODE_ENV === 'production')

Vue.use(VueTour)

Vue.use(VueAnalytics, {
  id: process.env.GOOGLE_ANALYTICS_KEY,
  router
})

// Based on Bootstrap grid breakpoints
Vue.use(VueMq, {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
})

// Logging the errors
if (process.env.SENTRY) {
  Sentry.init({
    dsn: process.env.SENTRY,
    integrations: [new Integrations.Vue({Vue, attachProps: true})]
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
