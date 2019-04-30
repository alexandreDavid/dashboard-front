import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Graph from '@/components/Graph/Graph.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('Graph.vue', () => {
  let wrapper
  let state
  let getters
  let store

  beforeEach(() => {
    state = {
      active: {
        curFamily: 'initVal'
      }
    }
    getters = {
      getActiveKeyById: (state) => (id) => {
        return state.active[id]
      }
    }
    store = new Vuex.Store({
      modules: {
        settings: {
          namespaced: true,
          state,
          getters,
          mutations: {
            setActiveById (state, {id, value}) {
              state.active[id] = value
            }
          }
        }
      }
    })

    let parameter = {
      getStatistics: jest.fn(),
      getUnitFamily: jest.fn(),
      setUnit: jest.fn()
    }
    parameter.getUnitFamily.mockReturnValue('curFamily')
    wrapper = shallowMount(Graph, {
      propsData: {
        parameter
      },
      store,
      localVue
    })
  })

  // Inspect the raw component options
  it('has a created hook', () => {
    expect(typeof Graph.created).toBe('function')
  })

  // Evaluate the results of functions in
  // the raw component options
  it('On created call data', () => {
    expect(typeof Graph.data).toBe('function')
    expect(wrapper.vm.graphType).toBe('BarChart')
    expect(wrapper.vm.parameter.getStatistics).toBeCalled()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  // Inspect the component instance on mount
  it('On watch parameter', async () => {
    const parameter = {
      displayName: 'displayName2',
      getStatistics: jest.fn(),
      getUnitFamily: jest.fn(),
      setUnit: jest.fn()
    }
    parameter.getUnitFamily.mockReturnValue('curFamily')
    wrapper.setProps({
      parameter
    })
    expect(wrapper.vm.parameter.getStatistics).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('On unit changes', async () => {
    store.commit('settings/setActiveById', {id: 'curFamily', key: 'updatedVal'})
    expect(wrapper.vm.parameter.setUnit).toHaveBeenCalledWith('updatedVal')
  })
})
