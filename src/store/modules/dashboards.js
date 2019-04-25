import dashboards from '@/api/dashboards'

// initial state
const state = {
  all: [],
  active: {}
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
  },
  setWidget ({ state, dispatch, commit }, widget) {
    commit('setWidget', widget)
    dispatch('setDashboard', state.active)
  },
  orderWidgets ({ state, dispatch, commit }, {colIndex, widgetId, addedIndex}) {
    commit('orderWidgets', {colIndex, widgetId, addedIndex})
    dispatch('setDashboard', state.active)
  }
}

// mutations
const mutations = {
  setAll (state, dashboards) {
    state.all = dashboards
  },
  setActive (state, dashboard) {
    state.active = dashboard
  },
  setWidget (state, widget) {
    let dashboard = state.active
    if (widget.id) {
      Object.assign(dashboard.widgets.find(w => w.id === widget.id), widget)
    } else {
      widget.id = Math.max(...dashboard.widgets.map(w => {
        return w.id
      }), 0) + 1
      widget.description = widget.description || ''
      widget.colIndex = 0
      dashboard.widgets.push(widget)
    }
  },
  orderWidgets (state, {colIndex, widgetId, addedIndex}) {
    let list = state.active.widgets
    let from = list.findIndex(w => w.id === widgetId)
    list[from].colIndex = colIndex
    // Calculate the destination
    let to = 0
    // If no addedIndex ==> first
    if (addedIndex) {
      let curIndex = -1
      to = list.findIndex(w => {
        if (w.colIndex === colIndex) {
          curIndex++
        }
        return curIndex === addedIndex
      })
      if (to === -1) {
        to = list.length
      }
    }
    list.splice(to, 0, list.splice(from, 1)[0])
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}