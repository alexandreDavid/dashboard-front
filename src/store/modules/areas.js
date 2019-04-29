import areas from '@/api/areas'

// initial state
const state = {
  all: []
}

const getters = {
  activeArea: (state) => {
    return state.all.find(a => a.active) || state.all[0] || {}
  },
  getArea: (state) => (id) => {
    return state.all.find(o => o.id === id)
  }
}

// actions
const actions = {
  async init ({ dispatch }) {
    await dispatch('getAll')
  },
  async getAll ({ commit }) {
    const allAreas = await areas.getAll()
    commit('setAll', allAreas)
  },
  setActiveArea ({ commit }, area) {
    commit('setActive', area)
  },
  async addArea ({ state, dispatch, commit }, area) {
    await areas.add(area)
    await dispatch('getAll')
  },
  async setArea ({ dispatch, commit }, area) {
    if (area.id) {
      await areas.update(area)
      await dispatch('getAll')
    } else {
      await dispatch('addArea', area)
    }
  },
  async removeArea ({ state, commit }, area) {
    await areas.delete(area)
    commit('setAll', state.all.filter(a => a.id !== area.id))
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
