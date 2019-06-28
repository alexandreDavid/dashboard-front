import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BaseMapControl from '@/components/BaseMap/BaseMapControl'
import AreaLayer from '@/store/areaLayer'

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

describe('BaseMapControl.vue', () => {
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
    const wrapper = shallowMount(BaseMapControl, {
      store,
      localVue
    })
    expect(AreaLayer).toBeCalled()
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith({idArea: 7552})
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('On select basemap', () => {
    const wrapper = shallowMount(BaseMapControl, {
      store,
      localVue
    })
    wrapper.vm.selectBaseMap('selectedBaseMap')
    expect(actions.setActive).toBeCalled()
  })
})
