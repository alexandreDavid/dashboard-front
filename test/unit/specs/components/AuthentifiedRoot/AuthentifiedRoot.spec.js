import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import AuthentifiedRoot from '@/components/AuthentifiedRoot/AuthentifiedRoot'

import GeoResources from '@/store/geoResources'

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

describe('AuthentifiedRoot.js', () => {
  it('Init with welcome modal', async () => {
    const areas = {
      namespaced: true,
      state: {
        all: []
      }
    }
    const dashboards = {
      namespaced: true,
      state: {
        all: []
      }
    }
    const actions = {
      init: jest.fn()
    }
    actions.init.mockReturnValue(Promise.resolve([]))
    const store = new Vuex.Store({
      actions,
      modules: {
        areas,
        dashboards
      }
    })
    const wrapper = shallowMount(AuthentifiedRoot, {
      store,
      localVue,
      stubs: {
        WelcomeModal: '<div class=\'stub\'></div>'
      }
    })
    expect(wrapper.vm.isLoaded).toBe(false)
    expect(actions.init).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(updates).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showModalWelcome).toBe(true)
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.find('.stub').exists()).toBe(true)
  })

  it('Init without welcome modal', async () => {
    GeoResources.getAllResources.mockClear()
    updates.mockClear()

    const areas = {
      namespaced: true,
      state: {
        all: ['1']
      }
    }
    const dashboards = {
      namespaced: true,
      state: {
        all: ['1']
      }
    }
    const actions = {
      init: jest.fn()
    }
    actions.init.mockReturnValue(Promise.resolve([]))
    const store = new Vuex.Store({
      actions,
      modules: {
        areas,
        dashboards
      }
    })
    const wrapper = shallowMount(AuthentifiedRoot, {
      store,
      localVue,
      stubs: {
        WelcomeModal: '<div class=\'stub\'></div>'
      }
    })

    expect(wrapper.vm.isLoaded).toBe(false)
    expect(actions.init).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(updates).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showModalWelcome).toBe(false)
    expect(GeoResources.getAllResources).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.find('.stub').exists()).toBe(false)
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })
})
