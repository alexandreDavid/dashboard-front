// updates/displayedLayers.spec.js

import DisplayedLayers from '@/updates/displayedLayers'
import UserConfiguration from '@/store/userConfiguration'

jest.mock('@/store/userConfiguration', () => ({
  getSelectedLayers: jest.fn(),
  removeSelectedLayers: jest.fn()
}))

describe('updates/displayedLayers.js', () => {
  beforeEach(() => {
    UserConfiguration.getSelectedLayers.mockClear()
    UserConfiguration.removeSelectedLayers.mockClear()
  })

  it('Call with diplayed layers', async () => {
    const store = {
      state: {
        displayedLayers: {
          all: ['ok']
        }
      },
      dispatch: jest.fn()
    }
    await DisplayedLayers(store)

    expect(UserConfiguration.getSelectedLayers).not.toBeCalled()
    expect(UserConfiguration.removeSelectedLayers).toBeCalled()
  })

  it('Call without displayed layers', async () => {
    const firstDisplayedLayer = 'firstDisplayedLayer'
    const secondDisplayedLayer = 'secondDisplayedLayer'
    const store = {
      state: {
        displayedLayers: {
          all: []
        }
      },
      dispatch: jest.fn()
    }
    UserConfiguration.getSelectedLayers.mockReturnValue([ firstDisplayedLayer, secondDisplayedLayer ])
    await DisplayedLayers(store)

    expect(UserConfiguration.getSelectedLayers).toBeCalled()
    expect(store.dispatch).toBeCalledWith('displayedLayers/addDisplayed', firstDisplayedLayer)
    expect(store.dispatch).toBeCalledWith('displayedLayers/addDisplayed', secondDisplayedLayer)
    expect(UserConfiguration.removeSelectedLayers).toBeCalled()
  })
})
