import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import baseMaps from './modules/baseMaps'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  modules: {
    baseMaps
  },
  strict: debug
})

export default store
