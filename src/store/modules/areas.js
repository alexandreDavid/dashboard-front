import UserConfiguration from '@/store/userConfiguration'

// initial state
const state = {
  all: []
}

const getters = {
  activeArea: (state) => {
    return state.all.find(a => a.active) || state.all[0]
  },
  getArea: (state) => (id) => {
    return state.all.find(o => o.id === id)
  }
}

// actions
const actions = {
  async init ({ commit }) {
    commit('setAll', UserConfiguration.getDefinedAreas())
  },
  setAll ({ commit }, areas) {
    commit('setAll', areas)
    UserConfiguration.setDefinedAreas(areas)
  },
  setActiveArea ({ commit }, area) {
    commit('setActive', area)
  },
  setArea ({ state, commit }, area) {
    commit('setArea', area)
    UserConfiguration.setDefinedAreas(state.all)
  },
  removeArea ({ state, dispatch }, area) {
    dispatch('setAll', state.all.filter(a => a.id !== area.id))
  }
}

// mutations
const mutations = {
  setActive (state, area) {
    state.all.forEach((a, idx) => {
      a.active = (a.id === area.id)
      state.all[idx] = a
    })
  },
  setArea (state, area) {
    let idx = state.all.findIndex(a => a.id === area.id)
    if (idx !== -1) {
      state.all[idx] = area
    } else {
      area.id = ((state.all.length && state.all.sort((a, b) => b.id - a.id)[0].id) || 0) + 1
      state.all.push(area)
    }
  },
  setAll (state, areas) {
    state.all = areas
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
