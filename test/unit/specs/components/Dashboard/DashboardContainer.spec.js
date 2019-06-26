import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import GeoResources from '@/store/geoResources'
import ConfirmModal from '@/components/Modal/ConfirmModal'
import Dashboard from '@/store/dashboard'
import EditableInput from '@/components/EditableField/EditableInput'
import EditableTextArea from '@/components/EditableField/EditableTextArea'
import DashboardCustomiseModal from '@/components/Dashboard/DashboardCustomiseModal'
import DragDropWidgets from '@/components/Dashboard/DragDropWidgets'
import DashboardCardModal from '@/components/Dashboard/DashboardCardModal'

const localVue = createLocalVue()

localVue.use(Vuex)

jest.mock('@/store/geoResources', () => ({
  getAllResources: jest.fn()
}))

const mockDashboard = {
  setLayout: jest.fn()
}
jest.mock('@/store/dashboard', () => {
  return jest.fn().mockImplementation(() => {
    return mockDashboard
  })
})

describe('DashboardContainer.vue', () => {
  let state
  let actions
  let mutations
  let store
  let wrapper

  beforeEach(() => {
    GeoResources.getAllResources.mockClear()

    state = {
      all: [],
      shared: [],
      active: 'active'
    }
    actions = {
      setDashboard: jest.fn(),
      setWidget: jest.fn(),
      removeWidget: jest.fn(),
      setSharedDashboard: jest.fn(),
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
    wrapper = shallowMount(DashboardContainer, {
      store,
      localVue
    })
  })
  it('On create', async () => {
    expect(GeoResources.getAllResources).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(Dashboard).toBeCalledWith('active')
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('On click on delete and cancel', () => {
    expect(wrapper.vm.showConfirmDeleteDashboard).toBe(false)
    wrapper.find('.delete').trigger('click')
    expect(wrapper.vm.showConfirmDeleteDashboard).toBe(true)
    expect(wrapper.find(ConfirmModal).exists()).toBe(true)
    wrapper.find(ConfirmModal).vm.$emit('close')
    expect(wrapper.vm.showConfirmDeleteDashboard).toBe(false)
    expect(wrapper.find(ConfirmModal).exists()).toBe(false)
  })

  it('On click on delete and validate', () => {
    expect(wrapper.vm.showConfirmDeleteDashboard).toBe(false)
    wrapper.find('.delete').trigger('click')
    expect(wrapper.vm.showConfirmDeleteDashboard).toBe(true)
    expect(wrapper.find(ConfirmModal).exists()).toBe(true)
    wrapper.find(ConfirmModal).vm.$emit('confirm')
    expect(wrapper.vm.showConfirmDeleteDashboard).toBe(false)
    expect(wrapper.find(ConfirmModal).exists()).toBe(false)
    expect(actions.removeDashboard).toBeCalled()
  })

  it('On click on save title', () => {
    const title = 'title'
    wrapper.find(EditableInput).vm.$emit('input', title)
    expect(wrapper.vm.dashboard.title).toBe(title)
    expect(actions.setDashboard).toBeCalled()
  })

  it('On click on save description', () => {
    const description = 'description'
    wrapper.find(EditableTextArea).vm.$emit('input', description)
    expect(wrapper.vm.dashboard.description).toBe(description)
    expect(actions.setDashboard).toBeCalled()
  })

  it('On click on save customisation', () => {
    const customisation = {
      layout: 'layout'
    }
    expect(wrapper.vm.showCustomiseModal).toBe(false)
    wrapper.find('.customise').trigger('click')
    expect(wrapper.vm.showCustomiseModal).toBe(true)
    expect(wrapper.find(DashboardCustomiseModal).exists()).toBe(true)
    wrapper.find(DashboardCustomiseModal).vm.$emit('validate', customisation)
    expect(mockDashboard.setLayout).toBeCalledWith('layout')
    expect(actions.setDashboard).toBeCalled()
  })

  it('On click on save widget', () => {
    const editedWidget = {
      layout: 'layout'
    }
    wrapper.find(DragDropWidgets).vm.$emit('edit', editedWidget)
    expect(wrapper.vm.editedCard).toEqual(editedWidget)
    expect(wrapper.find(DashboardCardModal).exists()).toBe(true)
    expect(wrapper.vm.showCardModal).toBe(true)
    wrapper.find(DashboardCardModal).vm.$emit('input', editedWidget)
    expect(wrapper.vm.showCardModal).toBe(false)
    expect(actions.setWidget).toBeCalled()
  })
})
