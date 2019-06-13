// areas.spec.js

import areas from '@/store/modules/areas'
import api from '@/api/areas'

jest.mock('@/api/areas', () => ({
  getAll: jest.fn()
}))

// Actions

test('Call init', () => {
  const dispatch = jest.fn()
  areas.actions.init({ dispatch })
  expect(dispatch).toBeCalledWith('getAll')
})

test('Call getAll', async () => {
  const commit = jest.fn()
  api.getAll.mockResolvedValue(43)
  await areas.actions.getAll({ commit })
  expect(commit).toBeCalledWith('setAll', 43)
})

// Mutations

test('Change the active state', () => {
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

test('Set existing area', () => {
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

test('Set new area', () => {
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

test('Set all', () => {
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
