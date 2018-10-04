// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Tracking from './tracking'
import Authentication from './store/authentication'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faCheck, faPlus, faEdit, faSave, faSpinner, faGlobeAfrica, faBars, faLocationArrow, faCircle, faInfo, faPlay, faPause, faMinus, faCaretDown, faCaretLeft, faCaretRight, faTachometerAlt, faForward, faUser, faInfoCircle, faWindowMaximize, faWindowRestore, faMap, faHistory, faChartBar, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faCheck, faPlus, faEdit, faSave, faSpinner, faGlobeAfrica, faBars, faLocationArrow, faCaretDown, faCaretLeft, faCaretRight, faCircle, faInfo, faPlay, faPause, faMinus, faTachometerAlt, faForward, faUser, faInfoCircle, faWindowMaximize, faWindowRestore, faMap, faHistory, faChartBar, faLayerGroup)

Vue.component('font-awesome-icon', FontAwesomeIcon)

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
