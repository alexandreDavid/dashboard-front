import settings from '@/api/settings'

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
  },
  getIdByKey: (state) => (key) => {
    const setting = state.all.find(setting => {
      return !!setting.values.find(v => v.key === key)
    })
    return setting && setting.id
  },
  getLabel: () => (key) => {
    let value
    state.all.forEach(setting => {
      value = value || setting.values.find(v => v.key === key)
    })
    return value ? value.label : key
  }
}

// actions
const actions = {
  async init ({ commit }) {
    commit('setAll', await settings.getAll())
    commit('setActive', await settings.getActive())
  },
  async setActiveKeyById ({ commit }, {id, key}) {
    await settings.setActive(id, key)
    commit('setActiveById', {id, key})
  }
}

// mutations
const mutations = {
  setActive (state, settings) {
    let activeKeys = settings.reduce((obj, item) => {
      obj[item.setting_id] = item.key
      return obj
    }, {})
    // If the value is not defined, we take the default one
    state.all.forEach(element => {
      if (typeof activeKeys[element.id] === 'undefined') {
        activeKeys[element.id] = element.values.find(v => v.isdefault === true).key
      }
    })
    state.active = activeKeys
  },
  setActiveById (state, {id, key}) {
    state.active[id] = key
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
