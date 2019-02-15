import AuthentifiedRoot from '@/components/AuthentifiedRoot/AuthentifiedRoot'
import { shallowMount } from '@vue/test-utils'

import UserConfiguration from '@/store/userConfiguration'
import Settings from '@/store/settings'
import GeoResources from '@/store/geoResources'

import WelcomeModal from '@/components/WelcomeModal/WelcomeModal'

jest.mock('@/store/userConfiguration', () => ({
  getDisplayHelp: jest.fn()
}))

jest.mock('@/store/settings', () => ({
  init: jest.fn()
}))

jest.mock('@/store/geoResources', () => ({
  getAllResources: jest.fn()
}))

describe('AuthentifiedRoot.spec.js', () => {
  it('Init with welcome modal', async () => {
    Settings.init.mockClear()
    Settings.init.mockReturnValue(Promise.resolve())

    UserConfiguration.getDisplayHelp.mockReturnValue(true)

    const wrapper = shallowMount(AuthentifiedRoot, {
      mocks: {
        $mq: 'notsm'
      }
    })
    expect(wrapper.vm.$mq).toBe('notsm')

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(Settings.init).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.find(WelcomeModal).exists()).toBe(true)
  })

  it('Init without welcome modal by user config', async () => {
    Settings.init.mockClear()
    Settings.init.mockReturnValue(Promise.resolve())
    GeoResources.getAllResources.mockClear()

    UserConfiguration.getDisplayHelp.mockReturnValue(false)

    const wrapper = shallowMount(AuthentifiedRoot)

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(Settings.init).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.find(WelcomeModal).exists()).toBe(false)
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })

  it('Init without welcome modal by mq', async () => {
    Settings.init.mockClear()
    Settings.init.mockReturnValue(Promise.resolve())
    GeoResources.getAllResources.mockClear()

    UserConfiguration.getDisplayHelp.mockReturnValue(true)

    const wrapper = shallowMount(AuthentifiedRoot, {
      mocks: {
        $mq: 'sm'
      }
    })

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(Settings.init).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()

    expect(wrapper.find(WelcomeModal).exists()).toBe(false)
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })
})
