// basemaps.spec.js

import basemaps from '@/store/modules/baseMaps'
import api from '@/api/basemaps'

jest.mock('@/api/basemaps', () => ({
  getActive: jest.fn(),
  getAll: jest.fn(),
  setActive: jest.fn()
}))

describe('basemaps.js', () => {
  beforeEach(() => {
    api.getActive.mockClear()
    api.getAll.mockClear()
    api.setActive.mockClear()
  })

  // Actions
  it('Call init', async () => {
    const dispatch = jest.fn()
    const mockActiveBasemap = 'mockActiveBasemap'
    api.getActive.mockResolvedValue(mockActiveBasemap)
    await basemaps.actions.init({ dispatch })
    expect(dispatch).toBeCalledWith('setAll')
    expect(api.getActive).toBeCalled()
    expect(dispatch).toBeCalledWith('setActive', mockActiveBasemap)
  })

  it('Call setAll', async () => {
    const commit = jest.fn()
    const mockGetAll = 'mockGetAll'
    api.getAll.mockResolvedValue(mockGetAll)
    await basemaps.actions.setAll({ commit })
    expect(commit).toBeCalledWith('setAll', mockGetAll)
  })

  it('Call setActive', async () => {
    const commit = jest.fn()
    const baseMap = {id: 1}
    await basemaps.actions.setActive({ commit }, baseMap)
    expect(commit).toBeCalledWith('setActive', baseMap)
    expect(api.setActive).toBeCalledWith(1)
  })

  // Mutations
  it('Change the active state', () => {
    const state = {
      active: 'notChanged'
    }
    const active = 'changed'
    basemaps.mutations.setActive(state, active)
    expect(state.active).toBe(active)
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
    basemaps.mutations.setAll(state, updatedAll)
    expect(state.all).toEqual(updatedAll)
  })
})
