import Graph from '@/components/Graph/Graph.vue'
import Data from '@/store/data'
import { shallowMount } from '@vue/test-utils'
// import flushPromises from 'flush-promises'
jest.mock('@/store/data', () => ({
  getAreaParameterData: jest.fn()
}))

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('Graph.vue', () => {
  let wrapper
  beforeEach(async () => {
    Data.getAreaParameterData.mockClear()
    Data.getAreaParameterData.mockReturnValue(Promise.resolve({
      unit: 'unit'
    }))
    wrapper = shallowMount(Graph, {
      propsData: {
        parameter: {
          displayName: 'displayName'
        }
      }
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
    expect(wrapper.vm.graphType).toBe('LineChart')
    expect(Data.getAreaParameterData).toBeCalled()
    wrapper.vm.options.scales.yAxes[0].scaleLabel.labelString = 'displayName unit'
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  // Inspect the component instance on mount
  it('On watch parameter', async () => {
    wrapper.setProps({
      parameter: {
        displayName: 'displayName2'
      }
    })
    await wrapper.vm.$nextTick()
    expect(Data.getAreaParameterData).toBeCalled()
    wrapper.vm.options.scales.yAxes[0].scaleLabel.labelString = 'displayName2 unit'
    expect(wrapper.vm.isLoaded).toBe(true)
  })
})
