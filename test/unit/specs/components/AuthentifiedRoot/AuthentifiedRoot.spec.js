import AuthentifiedRoot from '@/components/AuthentifiedRoot/AuthentifiedRoot'
import { shallowMount } from '@vue/test-utils'

import UserConfiguration from '@/store/userConfiguration'
import Settings from '@/store/settings'
import GeoResources from '@/store/geoResources'

jest.mock('@/store/userConfiguration', () => ({
  getDisplayHelp: jest.fn()
}))

jest.mock('@/store/settings', () => ({
  init: jest.fn()
}))

jest.mock('@/store/geoResources', () => ({
  getAllResources: jest.fn()
}))

UserConfiguration.getDisplayHelp.mockReturnValue(true)

describe('AuthentifiedRoot.spec.vue', () => {
  it('On init ok', async () => {
    Settings.init.mockClear()
    Settings.init.mockReturnValue(Promise.resolve())

    const wrapper = shallowMount(AuthentifiedRoot)

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(Settings.init).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('On init nok', async () => {
    Settings.init.mockClear()
    Settings.init.mockReturnValue(Promise.reject(new Error()))

    const wrapper = shallowMount(AuthentifiedRoot)

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(Settings.init).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(false)
  })
})
