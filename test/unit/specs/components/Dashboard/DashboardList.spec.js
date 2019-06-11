import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import DashboardList from '@/components/Dashboard/DashboardList'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('DashboardList.vue', () => {
  let wrapper
  let state
  let mutations
  let store

  beforeEach(() => {
    state = {
      all: [{id: 1}],
      shared: [{id: 2}],
      active: {id: 2}
    }
    mutations = {
      setActive: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        dashboards: {
          namespaced: true,
          state,
          mutations
        }
      }
    })
    wrapper = shallowMount(DashboardList, {
      store,
      localVue
    })
  })

  it('Click on add dashboard', async () => {
    wrapper.find('#add-dashboard-button').trigger('click')
    expect(wrapper.emitted().newDashboard).toBeTruthy()
  })

  it('Select a dashboard', async () => {
    const firstItem = wrapper.find('.nav-item')
    firstItem.trigger('click')
    expect(mutations.setActive).toHaveBeenCalled()
  })
})
