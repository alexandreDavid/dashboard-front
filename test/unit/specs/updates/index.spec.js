// updates/index.spec.js

import updates from '@/updates'
import store from '@/store'
import UserConfiguration from '@/store/userConfiguration'
import Areas from '@/updates/areas'
import BaseMaps from '@/updates/baseMaps'
import Dashboards from '@/updates/dashboards'
import DisplayedLayers from '@/updates/displayedLayers'

jest.mock('@/store/userConfiguration', () => ({
  removeDisplayHelp: jest.fn(),
  removeUpdateIndex: jest.fn()
}))

jest.mock('@/updates/areas')
jest.mock('@/updates/baseMaps')
jest.mock('@/updates/dashboards')
jest.mock('@/updates/displayedLayers')

describe('updates/index.js', () => {
  it('Call function', async () => {
    await updates()
    expect(Areas).toBeCalledWith(store)
    expect(BaseMaps).toBeCalledWith(store)
    expect(Dashboards).toBeCalledWith(store)
    expect(DisplayedLayers).toBeCalledWith(store)
    expect(UserConfiguration.removeDisplayHelp).toBeCalled()
    expect(UserConfiguration.removeUpdateIndex).toBeCalled()
  })
})
