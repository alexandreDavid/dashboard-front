// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { apolloProvider } from './Apollo'
import Tracking from './tracking'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  provide: apolloProvider.provide(),
  components: { App },
  template: '<App/>'
})

if (process.env.TRACKER_URL && process.env.TRACKER_SITE_ID) {
  Tracking.init(process.env.TRACKER_URL, process.env.TRACKER_SITE_ID)
}
