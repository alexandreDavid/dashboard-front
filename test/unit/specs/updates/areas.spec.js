// updates/areas.spec.js

import Areas from '@/updates/areas'
import UserConfiguration from '@/store/userConfiguration'

jest.mock('@/store/userConfiguration', () => ({
  getDefinedAreas: jest.fn(),
  getActiveArea: jest.fn(),
  removeActiveArea: jest.fn(),
  removeDefinedAreas: jest.fn()
}))

describe('updates/areas.js', () => {
  const area1 = 'area1'
  const area2 = 'area2'

  beforeEach(() => {
    UserConfiguration.getDefinedAreas.mockClear()
    UserConfiguration.getActiveArea.mockClear()
    UserConfiguration.removeActiveArea.mockClear()
    UserConfiguration.removeDefinedAreas.mockClear()
  })

  it('Call with areas', async () => {
    const store = {
      state: {
        areas: {
          all: ['ok']
        }
      }
    }
    await Areas(store)

    expect(UserConfiguration.removeActiveArea).toBeCalled()
    expect(UserConfiguration.removeDefinedAreas).toBeCalled()
  })

  it('Call with areas from defined areas user configuration', async () => {
    const store = {
      state: {
        areas: {
          all: []
        }
      },
      dispatch: jest.fn()
    }
    UserConfiguration.getDefinedAreas.mockReturnValue([
      area1,
      area2
    ])
    await Areas(store)

    expect(UserConfiguration.getDefinedAreas).toBeCalled()
    expect(UserConfiguration.getActiveArea).not.toBeCalled()
    expect(store.dispatch).toHaveBeenCalledTimes(2)
    expect(store.dispatch).toHaveBeenLastCalledWith('areas/setArea', area2)
    expect(UserConfiguration.removeActiveArea).toBeCalled()
    expect(UserConfiguration.removeDefinedAreas).toBeCalled()
  })

  it('Call with areas from active area user configuration', async () => {
    const store = {
      state: {
        areas: {
          all: []
        }
      },
      dispatch: jest.fn()
    }
    UserConfiguration.getDefinedAreas.mockReturnValue([])
    UserConfiguration.getActiveArea.mockReturnValue(area1)
    await Areas(store)

    expect(UserConfiguration.getDefinedAreas).toBeCalled()
    expect(store.dispatch).toHaveBeenCalledWith('areas/setArea', area1)
    expect(UserConfiguration.removeActiveArea).toBeCalled()
    expect(UserConfiguration.removeDefinedAreas).toBeCalled()
  })

  it('Call without anything', async () => {
    const store = {
      state: {
        areas: {
          all: []
        }
      },
      dispatch: jest.fn()
    }
    UserConfiguration.getDefinedAreas.mockReturnValue([])
    UserConfiguration.getActiveArea.mockReturnValue()
    await Areas(store)

    expect(UserConfiguration.getDefinedAreas).toBeCalled()
    expect(store.dispatch).not.toBeCalled()
    expect(UserConfiguration.removeActiveArea).toBeCalled()
    expect(UserConfiguration.removeDefinedAreas).toBeCalled()
  })
})
