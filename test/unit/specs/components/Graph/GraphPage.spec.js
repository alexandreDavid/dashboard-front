import GraphPage from '@/components/Graph/GraphPage.vue'
import Parameter from '@/store/parameter'
import Area from '@/store/area'
import { shallowMount } from '@vue/test-utils'
// import flushPromises from 'flush-promises'
jest.mock('@/store/parameter', () => ({
  getAllParameters: jest.fn()
}))
jest.mock('@/store/area', () => ({
  getSelectedArea: jest.fn()
}))

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('GraphPage.vue', () => {
  beforeEach(() => {
    Parameter.getAllParameters.mockClear()
    Parameter.getAllParameters.mockReturnValue(Promise.resolve({}))
    Area.getSelectedArea.mockClear()
    Area.getSelectedArea.mockReturnValue({})
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
    const wrapper = shallowMount(GraphPage)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  // Mount an instance and inspect the render output
  it('renders the correct adding serie', async () => {
    Area.getSelectedArea.mockReturnValue({})
    const wrapper = shallowMount(GraphPage)
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
