import dashboards from '@/api/dashboards'

// initial state
const state = {
  all: [],
  active: {},
  shared: []
}

// actions
const actions = {
  async init ({ dispatch }) {
    await dispatch('getAll')
    await dispatch('getShared')
  },
  async getAll ({ commit }) {
    const allDashboards = await dashboards.getAll()
    commit('setAll', allDashboards)
  },
  async getShared ({ commit }) {
    const allSharedDashboards = await dashboards.getShared()
    allSharedDashboards.forEach(element => { element.readOnly = true })
    commit('setSharedDashboards', allSharedDashboards)
  },
  async addDashboard ({ state, dispatch, commit }, dashboard) {
    const newDashboard = await dashboards.add(dashboard)
    await dispatch('getAll')
    commit('setActive', state.all.find(d => d.id === newDashboard.id))
  },
  async setDashboard ({ dispatch }, dashboard) {
    if (dashboard.id) {
      await dashboards.update(dashboard)
      dispatch('getAll')
    } else {
      await dispatch('addDashboard', dashboard)
    }
  },
  async removeDashboard ({ dispatch, commit }, dashboard) {
    await dashboards.delete(dashboard)
    commit('setActive', false)
    dispatch('getAll')
  },
  async setSharedDashboard ({ state, dispatch, commit }, shared) {
    await dashboards.setShared(state.active, shared)
    commit('setShared', shared)
    dispatch('getAll')
  },
  setWidget ({ state, dispatch, commit }, widget) {
    commit('setWidget', widget)
    dispatch('setDashboard', state.active)
  },
  orderWidgets ({ state, dispatch, commit }, {colIndex, widgetId, addedIndex}) {
    commit('orderWidgets', {colIndex, widgetId, addedIndex})
    dispatch('setDashboard', state.active)
  },
  removeWidget ({ state, dispatch, commit }, widget) {
    commit('removeWidget', widget)
    dispatch('setDashboard', state.active)
  }
}

// mutations
const mutations = {
  setAll (state, dashboards) {
    state.all = dashboards
  },
  setSharedDashboards (state, sharedDashboards) {
    state.shared = sharedDashboards
  },
  setActive (state, dashboard) {
    state.active = dashboard
  },
  setShared (state, shared) {
    state.active.shared = shared
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
  },
  removeWidget (state, widget) {
    let dashboard = state.active
    dashboard.widgets.splice(dashboard.widgets.findIndex(w => w.id === widget.id), 1)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
