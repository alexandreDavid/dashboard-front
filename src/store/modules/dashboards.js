import dashboards from '@/api/dashboards'

// initial state
const state = {
  all: []
}

// actions
const actions = {
  init ({ dispatch }) {
    dispatch('getAll')
  },
  async getAll ({ commit }) {
    const allDashboards = await dashboards.getAll()
    commit('setAll', allDashboards)
  },
  async add ({ commit }, area) {
    commit('setActive', area)
  },
  async setDashboard ({ dispatch }, dashboard) {
    if (dashboard.id) {
      await dashboards.update(dashboard)
    } else {
      await dashboards.add(dashboard)
    }
    dispatch('getAll')
  },
  async removeDashboard ({ dispatch }, dashboard) {
    await dashboards.delete(dashboard)
    dispatch('getAll')
  }
}

// mutations
const mutations = {
  setAll (state, dashboards) {
    state.all = dashboards
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
