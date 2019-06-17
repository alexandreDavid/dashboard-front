// updates/baseMaps.spec.js

import BaseMaps from '@/updates/baseMaps'
import UserConfiguration from '@/store/userConfiguration'

jest.mock('@/store/userConfiguration', () => ({
  getActiveBaseMapLayer: jest.fn(),
  removeActiveBaseMapLayer: jest.fn()
}))

describe('updates/baseMaps.js', () => {
  beforeEach(() => {
    UserConfiguration.getActiveBaseMapLayer.mockClear()
    UserConfiguration.removeActiveBaseMapLayer.mockClear()
  })

  it('Call without active basemap', async () => {
    const firstBaseMap = 'firstBaseMap'
    const store = {
      state: {
        baseMaps: {
          all: [ firstBaseMap ]
        }
      },
      dispatch: jest.fn()
    }
    await BaseMaps(store)

    expect(UserConfiguration.getActiveBaseMapLayer).toBeCalled()
    expect(store.dispatch).toBeCalledWith('baseMaps/setAll')
    expect(store.dispatch).toBeCalledWith('baseMaps/setActive', firstBaseMap)
    expect(UserConfiguration.removeActiveBaseMapLayer).toBeCalled()
  })

  it('Call with active basemap as string', async () => {
    const mockActiveBaseMapLayer = 'mockActiveBaseMapLayer'
    const firstBaseMap = { url: mockActiveBaseMapLayer }
    const store = {
      state: {
        baseMaps: {
          all: [ firstBaseMap ]
        }
      },
      dispatch: jest.fn()
    }
    UserConfiguration.getActiveBaseMapLayer.mockReturnValue(mockActiveBaseMapLayer)
    await BaseMaps(store)

    expect(UserConfiguration.getActiveBaseMapLayer).toBeCalled()
    expect(store.dispatch).toBeCalledWith('baseMaps/setAll')
    expect(store.dispatch).toBeCalledWith('baseMaps/setActive', firstBaseMap)
    expect(UserConfiguration.removeActiveBaseMapLayer).toBeCalled()
  })

  it('Call with active basemap as object valid', async () => {
    const mockActiveBaseMapLayer = { url: 'mockActiveBaseMapLayer' }
    const store = {
      state: {
        baseMaps: {
          all: []
        }
      },
      dispatch: jest.fn()
    }
    UserConfiguration.getActiveBaseMapLayer.mockReturnValue(mockActiveBaseMapLayer)
    await BaseMaps(store)

    expect(UserConfiguration.getActiveBaseMapLayer).toBeCalled()
    expect(store.dispatch).toBeCalledWith('baseMaps/setAll')
    expect(store.dispatch).toBeCalledWith('baseMaps/setActive', mockActiveBaseMapLayer)
    expect(UserConfiguration.removeActiveBaseMapLayer).toBeCalled()
  })

  it('Call with active basemap as object invalid', async () => {
    const mockActiveBaseMapLayer = { noturl: 'mockActiveBaseMapLayer' }
    const firstBaseMap = 'firstBaseMap'
    const store = {
      state: {
        baseMaps: {
          all: [ firstBaseMap ]
        }
      },
      dispatch: jest.fn()
    }
    UserConfiguration.getActiveBaseMapLayer.mockReturnValue(mockActiveBaseMapLayer)
    await BaseMaps(store)

    expect(UserConfiguration.getActiveBaseMapLayer).toBeCalled()
    expect(store.dispatch).toBeCalledWith('baseMaps/setAll')
    expect(store.dispatch).toBeCalledWith('baseMaps/setActive', firstBaseMap)
    expect(UserConfiguration.removeActiveBaseMapLayer).toBeCalled()
  })
})
