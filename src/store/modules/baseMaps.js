import UserConfiguration from '@/store/userConfiguration'

const allBaseMaps = [
  {
    label: 'Openstreetmap',
    url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }, {
    label: 'Grayscale',
    url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
  }, {
    label: 'Toner',
    url: 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png'
  }, {
    label: 'Nothing',
    url: false
  }
]

// initial state
const state = {
  active: {}
}

// getters
const getters = {
  all () {
    return allBaseMaps
  }
}

// actions
const actions = {
  init ({ dispatch }) {
    let active = UserConfiguration.getActiveBaseMapLayer()

    if (!active || !active.hasOwnProperty('url')) {
      active = allBaseMaps[1]
    }
    dispatch('setActive', active)
  },
  setActive ({ commit }, baseMap) {
    commit('setActive', baseMap)
    UserConfiguration.setActiveBaseMapLayer(baseMap)
  }
}

// mutations
const mutations = {
  setActive (state, baseMap) {
    state.active = baseMap
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}