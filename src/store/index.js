import Vue from 'vue'
import Vuex from 'vuex'
import baseMaps from './modules/baseMaps'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    baseMaps
  },
  strict: debug
})
