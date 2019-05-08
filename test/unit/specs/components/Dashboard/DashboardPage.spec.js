import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import DashboardPage from '@/components/Dashboard/DashboardPage.vue'

import DashboardTemplates from '@/store/dashboardTemplates'
import GeoResources from '@/store/geoResources'

const localVue = createLocalVue()

localVue.use(Vuex)

jest.mock('@/store/geoResources', () => ({
  getAllResources: jest.fn()
}))

jest.mock('@/store/dashboardTemplates', () => ({
  getStarterDashboard: jest.fn()
}))

const mockStarterDashboard = 'getStarterDashboard'
DashboardTemplates.getStarterDashboard.mockReturnValue(mockStarterDashboard)

describe('DashboardPage.vue', () => {
  let wrapper
  let state
  let actions
  let mutations
  let store

  beforeEach(() => {
    state = {
      all: [],
      active: {}
    }
    actions = {
      getAll: jest.fn(),
      addDashboard: jest.fn(),
      removeDashboard: jest.fn()
    }

    mutations = {
      setActive: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        dashboards: {
          namespaced: true,
          state,
          actions,
          mutations
        }
      }
    })
    wrapper = shallowMount(DashboardPage, {
      store,
      localVue
    })

    GeoResources.getAllResources.mockReturnValue(Promise.resolve([
      {
        id: 1,
        displayName: 'displayName1',
        config: {
          statistics: true
        }
      }, {
        id: 2,
        displayName: 'displayName1',
        config: {
          statistics: true
        }
      }
    ]))
  })

  it('Create without dashboard', async () => {
    expect(GeoResources.getAllResources).toBeCalled()
    expect(actions.getAll).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(DashboardTemplates.getStarterDashboard).toBeCalled()
    expect(actions.addDashboard).toBeCalled()
    expect(wrapper.vm.isLoaded).toBe(true)
  })
})
