import UserConfiguration from '@/store/userConfiguration'
import basemaps from '@/api/basemaps'

// initial state
const state = {
  all: [],
  active: {}
}

// actions
const actions = {
  async init ({ dispatch }) {
    dispatch('setAll')
    const activeBasemap = await basemaps.getActive()
    dispatch('setActive', activeBasemap)
  },
  async setAll ({ commit }) {
    const allBasemaps = await basemaps.getAll()
    commit('setAll', allBasemaps)
  },
  async setActive ({ commit }, baseMap) {
    commit('setActive', baseMap)
    await basemaps.setActive(baseMap.id)
    UserConfiguration.setActiveBaseMapLayer(baseMap)
  }
}

// mutations
const mutations = {
  setAll (state, all) {
    state.all = all
  },
  setActive (state, baseMap) {
    state.active = baseMap
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
