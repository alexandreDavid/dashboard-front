import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import GraphPage from '@/components/Graph/GraphPage.vue'
// import Parameter from '@/store/parameter'
// import DefinedAreas from '@/store/definedAreas'

const localVue = createLocalVue()

localVue.use(Vuex)

// import flushPromises from 'flush-promises'
// jest.mock('@/store/parameter', () => ({
//   getAllParameters: jest.fn()
// }))
// jest.mock('@/store/definedAreas', () => ({
//   getActiveArea: jest.fn()
// }))

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('GraphPage.vue', () => {
  beforeEach(() => {
    // Parameter.getAllParameters.mockClear()
    // Parameter.getAllParameters.mockReturnValue(Promise.resolve({}))
    // DefinedAreas.getActiveArea.mockClear()
    // DefinedAreas.getActiveArea.mockReturnValue({})
  })

  // Inspect the raw component options
  it('has a created hook', () => {
    expect(typeof GraphPage.created).toBe('function')
  })

  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof GraphPage.data).toBe('function')
    const defaultData = GraphPage.data()
    expect(defaultData.isLoaded).toBe(false)
  })

  // Inspect the component instance on mount
  it('correctly sets the values when created', async () => {
    const getters = {
      activeArea: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        areas: {
          namespaced: true,
          getters
        }
      }
    })
    const wrapper = shallowMount(GraphPage, {
      store,
      localVue
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  // Mount an instance and inspect the render output
  it('renders the correct adding serie', async () => {
    // DefinedAreas.getActiveArea.mockReturnValue({})
    const getters = {
      activeArea: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        areas: {
          namespaced: true,
          getters
        }
      }
    })
    getters.activeArea.mockReturnValue('activeArea')
    const wrapper = shallowMount(GraphPage, {
      store,
      localVue
    })
    await wrapper.vm.$nextTick()

    const button = wrapper.find('#addSerie')

    // when
    button.trigger('click')

    // then
    expect(wrapper.vm.series.length).toBe(1)

    wrapper.vm.addSerie()
    expect(wrapper.vm.series.length).toBe(2)

    wrapper.vm.removeSerie(0)
    expect(wrapper.vm.series.length).toBe(1)
  })
})
