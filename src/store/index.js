import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import areas from './modules/areas'
import baseMaps from './modules/baseMaps'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  modules: {
    areas,
    baseMaps,
    settings
  },
  strict: debug
})

export default store
