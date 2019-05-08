import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import AuthentifiedRoot from '@/components/AuthentifiedRoot/AuthentifiedRoot'

import UserConfiguration from '@/store/userConfiguration'
import GeoResources from '@/store/geoResources'

import WelcomeModal from '@/components/WelcomeModal/WelcomeModal'

import updates from '@/updates'

const localVue = createLocalVue()

localVue.use(Vuex)

jest.mock('@/store/userConfiguration', () => ({
  getDisplayHelp: jest.fn()
}))

jest.mock('@/store/geoResources', () => ({
  getAllResources: jest.fn()
}))

jest.mock('@/updates', () => {
  return jest.fn()
})

describe('AuthentifiedRoot.spec.js', () => {
  it('Init with welcome modal', async () => {
    UserConfiguration.getDisplayHelp.mockReturnValue(true)

    const wrapper = shallowMount(AuthentifiedRoot, {
      mocks: {
        $store: {
          dispatch: jest.fn(),
          state: {
            dashboards: {all: []},
            areas: {all: []}
          }
        }
      },
      stubs: {
        WelcomeModal: WelcomeModal
      },
      localVue
    })
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(updates).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isLoaded).toBe(false)
    expect(wrapper.vm.showModalWelcome).toBe(true)
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.find(WelcomeModal).exists()).toBe(true)
  })

  it('Init without welcome modal', async () => {
    GeoResources.getAllResources.mockClear()
    updates.mockClear()

    UserConfiguration.getDisplayHelp.mockReturnValue(false)

    const wrapper = shallowMount(AuthentifiedRoot, {
      mocks: {
        $store: {
          dispatch: jest.fn(),
          state: {
            dashboards: {all: ['dashboard']},
            areas: {all: ['area']}
          }
        }
      },
      stubs: {
        WelcomeModal: WelcomeModal
      }
    })

    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(updates).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isLoaded).toBe(false)
    expect(wrapper.vm.showModalWelcome).toBe(false)
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.find(WelcomeModal).exists()).toBe(false)
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })
})
