// areas.spec.js

import areas from '@/store/modules/areas'
import api from '@/api/areas'

jest.mock('@/api/areas', () => ({
  getAll: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}))

describe('area.js', () => {
  beforeEach(() => {
    api.getAll.mockClear()
    api.add.mockClear()
    api.update.mockClear()
    api.delete.mockClear()
  })

  // getters
  it('Get active area with active value', () => {
    const state = {
      all: [
        { id: 1 },
        { id: 2, active: true }
      ]
    }
    expect(areas.getters.activeArea(state)).toEqual({ id: 2, active: true })
  })

  it('Get active area without active value', () => {
    const state = {
      all: [
        { id: 1 },
        { id: 2 }
      ]
    }
    expect(areas.getters.activeArea(state)).toEqual({ id: 1 })
  })

  it('Get active area without any value', () => {
    const state = {
      all: []
    }
    expect(areas.getters.activeArea(state)).toEqual({})
  })

  it('Get area', () => {
    const state = {
      all: [
        { id: 1 },
        { id: 2 }
      ]
    }
    expect(areas.getters.getArea(state)(1)).toEqual({ id: 1 })
  })

  // Actions
  it('Call init', () => {
    const dispatch = jest.fn()
    areas.actions.init({ dispatch })
    expect(dispatch).toBeCalledWith('getAll')
  })

  it('Call getAll', async () => {
    const commit = jest.fn()
    const mockGetAll = 'mockGetAll'
    api.getAll.mockResolvedValue(mockGetAll)
    await areas.actions.getAll({ commit })
    expect(commit).toBeCalledWith('setAll', mockGetAll)
  })

  it('Call setActiveArea', () => {
    const commit = jest.fn()
    const area = 'newArea'
    areas.actions.setActiveArea({ commit }, area)
    expect(commit).toBeCalledWith('setActive', area)
  })

  it('Call addArea', async () => {
    const dispatch = jest.fn()
    const area = 'area'
    await areas.actions.addArea({ dispatch }, area)
    expect(api.add).toBeCalledWith(area)
    expect(dispatch).toBeCalledWith('getAll')
  })

  it('Call setArea with id', async () => {
    const dispatch = jest.fn()
    const area = {id: 1}
    await areas.actions.setArea({ dispatch }, area)
    expect(api.update).toBeCalledWith(area)
    expect(dispatch).toBeCalledWith('getAll')
  })

  it('Call setArea without id', async () => {
    const dispatch = jest.fn()
    const area = {}
    await areas.actions.setArea({ dispatch }, area)
    expect(api.update).not.toBeCalled()
    expect(dispatch).toBeCalledWith('addArea', area)
  })

  it('Call removeArea', async () => {
    const state = {
      all: [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ]
    }
    const commit = jest.fn()
    const area = {id: 1}
    await areas.actions.removeArea({ state, commit }, area)
    expect(api.delete).toBeCalledWith(area)
    expect(commit).toBeCalledWith('setAll', [
      { id: 2 },
      { id: 3 }
    ])
  })

  // Mutations
  it('Change the active state', () => {
    const state = {
      all: [
        { id: 1, active: true },
        { id: 2 }
      ]
    }
    const active = { id: 2 }
    areas.mutations.setActive(state, active)
    expect(state.all[0].active).toBe(false)
    expect(state.all[1].active).toBe(true)
  })

  it('Set existing area', () => {
    const state = {
      all: [
        { id: 1, label: 'notchanged' },
        { id: 2 }
      ]
    }
    const updatedArea = { id: 1, label: 'changed' }
    areas.mutations.setArea(state, updatedArea)
    expect(state.all[0].label).toBe('changed')
  })

  it('Set new area', () => {
    const state = {
      all: [
        { id: 1 },
        { id: 2 }
      ]
    }
    const updatedArea = { label: 'newArea' }
    areas.mutations.setArea(state, updatedArea)
    expect(state.all.length).toBe(3)
    expect(state.all[2].id).toBe(3)
    expect(state.all[2].label).toBe('newArea')
  })

  it('Set new area without state all', () => {
    const state = {
      all: []
    }
    const updatedArea = { label: 'newArea' }
    areas.mutations.setArea(state, updatedArea)
    expect(state.all.length).toBe(1)
    expect(state.all[0].id).toBe(1)
    expect(state.all[0].label).toBe('newArea')
  })

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
    areas.mutations.setAll(state, updatedAll)
    expect(state.all).toEqual(updatedAll)
  })
})
