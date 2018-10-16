// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Tracking from './tracking'
import Authentication from './store/authentication'
import '@/utils/fontAwesome'

Vue.config.productionTip = false

if (process.env.TRACKER_URL && process.env.TRACKER_SITE_ID) {
  Tracking.init(process.env.TRACKER_URL, process.env.TRACKER_SITE_ID)
}

if (process.env.AUTH.domain && process.env.AUTH.clientID) {
  Authentication.init(process.env.AUTH.domain, process.env.AUTH.clientID)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
