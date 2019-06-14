// dashboards.spec.js

import dashboards from '@/store/modules/dashboards'
import api from '@/api/dashboards'

jest.mock('@/api/dashboards', () => ({
  getAll: jest.fn(),
  getShared: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  setShared: jest.fn()
}))

describe('dashboards.js', () => {
  beforeEach(() => {
    api.getAll.mockClear()
    api.getShared.mockClear()
    api.add.mockClear()
    api.update.mockClear()
    api.setShared.mockClear()
  })

  // Actions
  it('Call init', async () => {
    const dispatch = jest.fn()
    await dashboards.actions.init({ dispatch })
    expect(dispatch).toBeCalledWith('getAll')
    dispatch('getAll')
    expect(dispatch).toBeCalledWith('getShared')
  })

  it('Call getAll', async () => {
    const commit = jest.fn()
    const mockGetAll = 'mockGetAll'
    api.getAll.mockResolvedValue(mockGetAll)
    await dashboards.actions.getAll({ commit })
    expect(commit).toBeCalledWith('setAll', mockGetAll)
  })

  it('Call getShared', async () => {
    const commit = jest.fn()
    const mockAllSharedDashboards = [{ id: 1 }]
    api.getShared.mockResolvedValue(mockAllSharedDashboards)
    await dashboards.actions.getShared({ commit })
    expect(commit).toBeCalledWith('setSharedDashboards', [{ id: 1, readOnly: true }])
  })

  it('Call addDashboard', async () => {
    const state = {
      all: [
        { id: 1, label: 'label' }
      ]
    }
    const dispatch = jest.fn()
    const commit = jest.fn()
    const dashboard = 'dashboard'
    const mockAddDashboard = { id: 1 }
    api.add.mockResolvedValue(mockAddDashboard)
    await dashboards.actions.addDashboard({ state, dispatch, commit }, dashboard)
    expect(api.add).toBeCalledWith(dashboard)
    expect(dispatch).toBeCalledWith('getAll')
    expect(commit).toBeCalledWith('setActive', { id: 1, label: 'label' })
  })

  it('Call setDashboard with id', async () => {
    const dispatch = jest.fn()
    const dashboard = { id: 1 }
    await dashboards.actions.setDashboard({ dispatch }, dashboard)
    expect(api.update).toBeCalledWith(dashboard)
    expect(dispatch).toBeCalledWith('getAll')
  })

  it('Call setDashboard with id', async () => {
    const dispatch = jest.fn()
    const dashboard = { label: 'newDashboard' }
    await dashboards.actions.setDashboard({ dispatch }, dashboard)
    expect(api.update).not.toBeCalled()
    expect(dispatch).toBeCalledWith('addDashboard', dashboard)
  })

  it('Call removeDashboard', async () => {
    const dispatch = jest.fn()
    const commit = jest.fn()
    const dashboard = { id: 1 }
    await dashboards.actions.removeDashboard({ dispatch, commit }, dashboard)
    expect(api.delete).toBeCalledWith(dashboard)
    expect(commit).toBeCalledWith('setActive', false)
    expect(dispatch).toBeCalledWith('getAll')
  })

  it('Call setSharedDashboard', async () => {
    const state = { active: 'active' }
    const dispatch = jest.fn()
    const commit = jest.fn()
    const shared = 'shared'
    await dashboards.actions.setSharedDashboard({ state, dispatch, commit }, shared)
    expect(api.setShared).toBeCalledWith(state.active, shared)
    expect(commit).toBeCalledWith('setShared', shared)
    expect(dispatch).toBeCalledWith('getAll')
  })

  it('Call setWidget', () => {
    const state = { active: 'active' }
    const dispatch = jest.fn()
    const commit = jest.fn()
    const widget = 'widget'
    dashboards.actions.setWidget({ state, dispatch, commit }, widget)
    expect(commit).toBeCalledWith('setWidget', widget)
    expect(dispatch).toBeCalledWith('setDashboard', state.active)
  })

  it('Call orderWidgets', () => {
    const state = { active: 'active' }
    const dispatch = jest.fn()
    const commit = jest.fn()
    const colIndex = 'colIndex'
    const widgetId = 'widgetId'
    const addedIndex = 'addedIndex'
    dashboards.actions.orderWidgets({ state, dispatch, commit }, {colIndex, widgetId, addedIndex})
    expect(commit).toBeCalledWith('orderWidgets', {colIndex, widgetId, addedIndex})
    expect(dispatch).toBeCalledWith('setDashboard', state.active)
  })

  it('Call removeWidget', () => {
    const state = { active: 'active' }
    const dispatch = jest.fn()
    const commit = jest.fn()
    const widget = 'widget'
    dashboards.actions.removeWidget({ state, dispatch, commit }, widget)
    expect(commit).toBeCalledWith('removeWidget', widget)
    expect(dispatch).toBeCalledWith('setDashboard', state.active)
  })

  // Mutations
  it('Set all', () => {
    const state = {
      all: [
        { id: 1 },
        { id: 2 }
      ]
    }
    const updatedAll = [
      { id: 3 }
    ]
    dashboards.mutations.setAll(state, updatedAll)
    expect(state.all).toEqual(updatedAll)
  })
  it('Change the shared state', () => {
    const state = {
      sharedDashboards: 'notChanged'
    }
    const sharedDashboards = 'changed'
    dashboards.mutations.setSharedDashboards(state, sharedDashboards)
    expect(state.shared).toBe(sharedDashboards)
  })
  it('Change the active state', () => {
    const state = {
      active: 'notChanged'
    }
    const active = 'changed'
    dashboards.mutations.setActive(state, active)
    expect(state.active).toBe(active)
  })

  it('Change the active shared state', () => {
    const state = {
      active: { shared: 'notChanged' }
    }
    const shared = 'changed'
    dashboards.mutations.setShared(state, shared)
    expect(state.active.shared).toBe(shared)
  })

  it('Set an existing widget', () => {
    const state = {
      active: {
        widgets: [
          { id: 1, label: 'notChanged', otherProp: 'otherProp' },
          { id: 2 }
        ]
      }
    }
    const widget = { id: 1, label: 'changed' }
    dashboards.mutations.setWidget(state, widget)
    expect(state.active.widgets[0]).toEqual({ id: 1, label: 'changed', otherProp: 'otherProp' })
  })

  it('Set a new widget', () => {
    const state = {
      active: {
        widgets: [
          { id: 1 },
          { id: 2 }
        ]
      }
    }
    const widget = { label: 'newWidget' }
    dashboards.mutations.setWidget(state, widget)
    expect(state.active.widgets.length).toBe(3)
    expect(state.active.widgets[2]).toEqual({ id: 3, label: 'newWidget', description: '', colIndex: 0 })
  })

  it('Order widgets without adding index', () => {
    const state = {
      active: {
        widgets: [
          { id: 1, colIndex: 0 },
          { id: 2, colIndex: 1 },
          { id: 3, colIndex: 2 }
        ]
      }
    }
    const colIndex = 0
    const widgetId = 2
    const addedIndex = 0
    dashboards.mutations.orderWidgets(state, {colIndex, widgetId, addedIndex})
    expect(state.active.widgets[0]).toEqual({ id: 2, colIndex: 0 })
    expect(state.active.widgets[1]).toEqual({ id: 1, colIndex: 0 })
    expect(state.active.widgets[2]).toEqual({ id: 3, colIndex: 2 })
  })

  it('Order widgets with adding index', () => {
    const state = {
      active: {
        widgets: [
          { id: 1, colIndex: 0 },
          { id: 2, colIndex: 1 },
          { id: 3, colIndex: 2 }
        ]
      }
    }
    const colIndex = 0
    const widgetId = 2
    const addedIndex = 2
    dashboards.mutations.orderWidgets(state, {colIndex, widgetId, addedIndex})
    expect(state.active.widgets[0]).toEqual({ id: 1, colIndex: 0 })
    expect(state.active.widgets[1]).toEqual({ id: 3, colIndex: 2 })
    expect(state.active.widgets[2]).toEqual({ id: 2, colIndex: 0 })
  })

  it('Order widgets with adding index -1', () => {
    const state = {
      active: {
        widgets: [
          { id: 1, colIndex: 0 },
          { id: 2, colIndex: 1 },
          { id: 3, colIndex: 2 }
        ]
      }
    }
    const colIndex = -1
    const widgetId = 2
    const addedIndex = -1
    dashboards.mutations.orderWidgets(state, {colIndex, widgetId, addedIndex})
    expect(state.active.widgets[0]).toEqual({ id: 2, colIndex: -1 })
    expect(state.active.widgets[1]).toEqual({ id: 1, colIndex: 0 })
    expect(state.active.widgets[2]).toEqual({ id: 3, colIndex: 2 })
  })

  it('remove a widget', () => {
    const state = {
      active: {
        widgets: [
          { id: 1, colIndex: 0 },
          { id: 2, colIndex: 1 },
          { id: 3, colIndex: 2 }
        ]
      }
    }
    const widget = { id: 2 }
    dashboards.mutations.removeWidget(state, widget)
    expect(state.active.widgets).toEqual([
      { id: 1, colIndex: 0 },
      { id: 3, colIndex: 2 }
    ])
  })
})
