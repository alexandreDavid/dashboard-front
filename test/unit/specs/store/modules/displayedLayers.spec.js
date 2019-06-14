// displayedLayers.spec.js

import displayedLayers from '@/store/modules/displayedLayers'
import api from '@/api/resources'

jest.mock('@/api/resources', () => ({
  getAll: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}))

describe('displayedLayers.js', () => {
  beforeEach(() => {
    api.getAll.mockClear()
    api.add.mockClear()
    api.update.mockClear()
    api.delete.mockClear()
  })

  // Actions
  it('Call setAll', async () => {
    const commit = jest.fn()
    const mockGetAll = 'mockGetAll'
    api.getAll.mockResolvedValue(mockGetAll)
    await displayedLayers.actions.setAll({ commit })
    expect(commit).toBeCalledWith('setAll', mockGetAll)
  })

  it('Call addDisplayed', async () => {
    const commit = jest.fn()
    const resource = 'addedResource'
    const mockGetAll = 'mockGetAll'
    api.getAll.mockResolvedValue(mockGetAll)
    await displayedLayers.actions.addDisplayed({ commit }, resource)
    expect(api.add).toBeCalledWith(resource)
    expect(commit).toBeCalledWith('setAll', mockGetAll)
  })

  it('Call updateDisplayed', async () => {
    const commit = jest.fn()
    const resource = 'updatedResource'
    const mockGetAll = 'mockGetAll'
    api.getAll.mockResolvedValue(mockGetAll)
    await displayedLayers.actions.updateDisplayed({ commit }, resource)
    expect(api.update).toBeCalledWith(resource)
    expect(commit).toBeCalledWith('setAll', mockGetAll)
  })

  it('Call deleteDisplayed', async () => {
    const commit = jest.fn()
    const resource = 'deletedResource'
    const mockGetAll = 'mockGetAll'
    api.getAll.mockResolvedValue(mockGetAll)
    await displayedLayers.actions.deleteDisplayed({ commit }, resource)
    expect(api.delete).toBeCalledWith(resource)
    expect(commit).toBeCalledWith('setAll', mockGetAll)
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
    displayedLayers.mutations.setAll(state, updatedAll)
    expect(state.all).toEqual(updatedAll)
  })
})
