import AuthentifiedRoot from '@/components/AuthentifiedRoot/AuthentifiedRoot'
import { shallowMount } from '@vue/test-utils'

import UserConfiguration from '@/store/userConfiguration'
import GeoResources from '@/store/geoResources'

import WelcomeModal from '@/components/WelcomeModal/WelcomeModal'

jest.mock('@/store/userConfiguration', () => ({
  getDisplayHelp: jest.fn()
}))

jest.mock('@/store/geoResources', () => ({
  getAllResources: jest.fn()
}))

const $store = {
  dispatch: jest.fn()
}

describe('AuthentifiedRoot.spec.js', () => {
  it('Init with welcome modal', async () => {
    $store.dispatch.mockClear()

    UserConfiguration.getDisplayHelp.mockReturnValue(true)

    const wrapper = shallowMount(AuthentifiedRoot, {
      mocks: {
        $mq: 'notsm',
        $store
      },
      stubs: {
        WelcomeModal: WelcomeModal
      }
    })
    expect(wrapper.vm.$mq).toBe('notsm')

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledTimes(1)

    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.find(WelcomeModal).exists()).toBe(true)
  })

  it('Init without welcome modal by user config', async () => {
    GeoResources.getAllResources.mockClear()
    $store.dispatch.mockClear()

    UserConfiguration.getDisplayHelp.mockReturnValue(false)

    const wrapper = shallowMount(AuthentifiedRoot, {
      mocks: {
        $store
      }
    })

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledTimes(1)

    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.find(WelcomeModal).exists()).toBe(false)
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })

  it('Init without welcome modal by mq', async () => {
    GeoResources.getAllResources.mockClear()
    $store.dispatch.mockClear()

    UserConfiguration.getDisplayHelp.mockReturnValue(true)

    const wrapper = shallowMount(AuthentifiedRoot, {
      mocks: {
        $mq: 'sm',
        $store: {
          dispatch: jest.fn()
        }
      }
    })

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledTimes(1)

    expect(wrapper.find(WelcomeModal).exists()).toBe(false)
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })
})
