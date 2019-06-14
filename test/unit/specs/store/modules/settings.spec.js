// displayedLayers.spec.js

import settings from '@/store/modules/settings'
import api from '@/api/settings'

jest.mock('@/api/settings', () => ({
  getAll: jest.fn(),
  getActive: jest.fn(),
  setActive: jest.fn()
}))

describe('displayedLayers.js', () => {
  beforeEach(() => {
    api.getAll.mockClear()
    api.getActive.mockClear()
    api.setActive.mockClear()
  })

  // Getters
  it('Get active key by id', () => {
    const state = {
      active: { value1: 1, value2: 2 }
    }
    expect(settings.getters.getActiveKeyById(state)('value1')).toBe(1)
  })

  it('Get settings by type', () => {
    const state = {
      all: [
        {
          id: 'value1',
          type: 'type1'
        },
        {
          id: 'value2',
          type: 'type1'
        },
        {
          id: 'value3',
          type: 'type2'
        }
      ]
    }
    expect(settings.getters.getSettingsByType(state)('type1')).toEqual([
      {
        id: 'value1',
        type: 'type1'
      },
      {
        id: 'value2',
        type: 'type1'
      }
    ])
  })

  it('Get id by key', () => {
    const state = {
      all: [
        {
          id: 'value1',
          values: [
            { key: 'key1' },
            { key: 'key2' }
          ]
        },
        {
          id: 'value2',
          values: [
            { key: 'key3' },
            { key: 'key4' }
          ]
        },
        {
          id: 'value3',
          values: [
            { key: 'key5' },
            { key: 'key3' }
          ]
        }
      ]
    }
    expect(settings.getters.getIdByKey(state)('key4')).toBe('value2')
  })

  it('Get label', () => {
    const state = {
      all: [
        {
          id: 'value1',
          values: [
            { key: 'key1' },
            { key: 'key2' }
          ]
        },
        {
          id: 'value2',
          values: [
            { key: 'key3' },
            { key: 'key4', label: 'label4' }
          ]
        },
        {
          id: 'value3',
          values: [
            { key: 'key5' },
            { key: 'key3' }
          ]
        }
      ]
    }
    expect(settings.getters.getLabel(state)('key4')).toBe('label4')
    expect(settings.getters.getLabel(state)('fakeKey')).toBe('fakeKey')
  })

  // Actions
  it('Call init', async () => {
    const commit = jest.fn()
    const mockGetAll = 'mockGetAll'
    const mockGetActive = 'mockGetActive'
    api.getAll.mockResolvedValue(mockGetAll)
    api.getActive.mockResolvedValue(mockGetActive)
    await settings.actions.init({ commit })
    expect(commit).toBeCalledWith('setAll', mockGetAll)
    expect(commit).toBeCalledWith('setActive', mockGetActive)
  })

  it('Call setActiveKeyById', async () => {
    const commit = jest.fn()
    const id = 'id'
    const key = 'key'
    await settings.actions.setActiveKeyById({ commit }, {id, key})
    expect(api.setActive).toBeCalledWith(id, key)
    expect(commit).toBeCalledWith('setActiveById', { id, key })
  })

  // Mutations
  it('Set active', () => {
    const state = {
      all: [
        {
          id: 'value1',
          values: [
            { key: 'key1', isdefault: true }
          ]
        },
        {
          id: 'value2',
          values: [
            { key: 'key2', isdefault: true }
          ]
        },
        {
          id: 'value3',
          values: [
            { key: 'key3' },
            { key: 'key4', isdefault: true }
          ]
        }
      ]
    }
    const newSettings = [
      { setting_id: 'value1', key: 'changedKey1' },
      { setting_id: 'value2', key: 'changedKey2' }
    ]
    settings.mutations.setActive(state, newSettings)
    expect(state.active).toEqual({
      value1: 'changedKey1',
      value2: 'changedKey2',
      value3: 'key4'
    })
  })

  it('Set active by id', () => {
    const state = {
      active: {
        value: 'notChanged'
      }
    }
    const key = 'changed'
    settings.mutations.setActiveById(state, { id: 'value', key })
    expect(state.active.value).toBe(key)
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
    settings.mutations.setAll(state, updatedAll)
    expect(state.all).toEqual(updatedAll)
  })
})
