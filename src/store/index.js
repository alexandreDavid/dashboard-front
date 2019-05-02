import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import areas from './modules/areas'
import baseMaps from './modules/baseMaps'
import dashboards from './modules/dashboards'
import displayedLayers from './modules/displayedLayers'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  modules: {
    areas,
    baseMaps,
    dashboards,
    displayedLayers,
    settings
  },
  strict: debug
})

export default store
