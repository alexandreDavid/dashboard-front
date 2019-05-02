import displayedResources from '@/api/resources'

// initial state
const state = {
  all: []
}

// actions
const actions = {
  async setAll ({ commit }) {
    commit('setAll', await displayedResources.getAll())
  },
  async addDisplayed ({ commit }, resource) {
    await displayedResources.add(resource)
    commit('setAll', await displayedResources.getAll())
  },
  async updateDisplayed ({ commit }, resource) {
    await displayedResources.update(resource)
    commit('setAll', await displayedResources.getAll())
  },
  async deleteDisplayed ({ state, commit }, resource) {
    await displayedResources.delete(resource)
    commit('setAll', await displayedResources.getAll())
  }
}

// mutations
const mutations = {
  setAll (state, all) {
    state.all = all
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
