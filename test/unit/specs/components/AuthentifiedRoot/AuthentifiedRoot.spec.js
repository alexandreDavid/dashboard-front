import AuthentifiedRoot from '@/components/AuthentifiedRoot/AuthentifiedRoot'
import { shallowMount } from '@vue/test-utils'

import Area from '@/store/area'
import UserConfiguration from '@/store/userConfiguration'
import Settings from '@/store/settings'
import GeoResources from '@/store/geoResources'

jest.mock('@/store/area', () => ({
  setSelectedArea: jest.fn()
}))

jest.mock('@/store/userConfiguration', () => ({
  getActiveArea: jest.fn(),
  getDisplayHelp: jest.fn()
}))

jest.mock('@/store/settings', () => ({
  init: jest.fn()
}))

jest.mock('@/store/geoResources', () => ({
  getAllResources: jest.fn()
}))

const mockArea = 'mockArea'
UserConfiguration.getActiveArea.mockReturnValue(mockArea)
UserConfiguration.getDisplayHelp.mockReturnValue(mockArea)

describe('App.vue', () => {
  it('On init ok', async () => {
    Settings.init.mockClear()
    Settings.init.mockReturnValue(Promise.resolve())
    UserConfiguration.getActiveArea.mockClear()

    const wrapper = shallowMount(AuthentifiedRoot)

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(Settings.init).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()

    expect(UserConfiguration.getActiveArea).toHaveBeenCalledTimes(1)
    expect(Area.setSelectedArea).toHaveBeenCalledWith(mockArea)
    expect(wrapper.vm.isLoaded).toBe(true)
  })
  it('On init nok', async () => {
    Settings.init.mockClear()
    Settings.init.mockReturnValue(Promise.reject(new Error()))
    UserConfiguration.getActiveArea.mockClear()

    const wrapper = shallowMount(AuthentifiedRoot)

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(Settings.init).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(UserConfiguration.getActiveArea).not.toBeCalled()
    expect(wrapper.vm.isLoaded).toBe(false)
  })
})
