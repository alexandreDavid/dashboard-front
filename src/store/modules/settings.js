import UserConfiguration from '@/store/userConfiguration'
import Api from '@/store/api'

// initial state
const state = {
  active: {},
  all: []
}

const getters = {
  getActiveKeyById: (state) => (id) => {
    return state.active[id]
  },
  getSettingsByType: (state) => (type) => {
    return state.all.filter(s => s.type === type)
  }
}

// actions
const actions = {
  async init ({ dispatch, commit }) {
    const settings = await Api.getSettings()
    commit('setAll', settings)
    dispatch('setActive', UserConfiguration.getActiveSettings())
  },
  setActive ({ commit }, settings) {
    commit('setActive', settings)
    UserConfiguration.setActiveSettings(settings)
  },
  setActiveKeyById ({ state, dispatch, commit }, payload) {
    commit('setActiveById', payload)
    dispatch('setActive', state.active)
  },
  getSettingsByType ({state}, type) {
    console.log('getSettingsByType', type)
    console.log(state.all.filter(s => s.type === type))
    return state.all.filter(s => s.type === type)
  }
}

// mutations
const mutations = {
  setActive (state, settings) {
    state.active = settings
  },
  setActiveById (state, {id, value}) {
    state.active[id] = value
  },
  setAll (state, all) {
    state.all = all
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
