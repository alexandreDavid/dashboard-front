import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BaseMapSidebar from '@/components/BaseMap/BaseMapSidebar'
import AreaLayer from '@/store/areaLayer'
import SideBar from '@/components/SideBar/SideBar'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockAreaLayer = {
  setSelectedArea: jest.fn()
}
jest.mock('@/store/areaLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockAreaLayer
  })
})

describe('BaseMapSidebar.vue', () => {
  let state
  let actions
  let store

  beforeEach(() => {
    state = {
      all: [{ id: 'id' }],
      active: 'active'
    }
    actions = {
      setActive: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        baseMaps: {
          namespaced: true,
          state,
          actions
        }
      }
    })
  })

  it('On create', async () => {
    const wrapper = shallowMount(BaseMapSidebar, {
      store,
      localVue
    })
    expect(AreaLayer).toBeCalled()
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith({idArea: 7552})
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('On select basemap', () => {
    const wrapper = shallowMount(BaseMapSidebar, {
      store,
      localVue
    })
    wrapper.vm.$store = { dispatch: jest.fn() }
    wrapper.vm.selectBaseMap('selectedBaseMap')
    expect(wrapper.vm.$store.dispatch).toBeCalledWith('baseMaps/setActive', 'selectedBaseMap')
  })

  it('On close', () => {
    const wrapper = shallowMount(BaseMapSidebar, {
      store,
      localVue
    })
    wrapper.find(SideBar).vm.$emit('close')
    expect(wrapper.emitted().close[0]).toBeTruthy()
  })
})
