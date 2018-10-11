import DisplayedLayerControl from '@/components/Map/DisplayedLayer/DisplayedLayerControl'
import { shallowMount } from '@vue/test-utils'
import Area from '@/store/area'
import GraphModal from '@/components/Graph/GraphModal'

const mockDisplayedLayer = {
  setDisplayedLayer: jest.fn(),
  setTime: jest.fn(),
  formatTime: jest.fn(),
  setOpacity: jest.fn()
}
function getDisplayedLayer () {
  return mockDisplayedLayer
}

const mockParameter = {
  hasGraph: true
}

const mockGetSelectedArea = 'getSelectedArea'
jest.mock('@/store/area', () => ({
  getSelectedArea: jest.fn()
}))
Area.getSelectedArea.mockReturnValue(mockGetSelectedArea)

describe('DisplayedLayerControl.vue', () => {
  let wrapper
  beforeEach(() => {
    mockDisplayedLayer.setDisplayedLayer.mockClear()
    wrapper = shallowMount(DisplayedLayerControl, {
      provide: {
        getDisplayedLayer: getDisplayedLayer
      },
      propsData: {
        parameter: mockParameter
      }
    })
  })

  it('On open graph modal', () => {
    wrapper.find('#open-graph-modal').trigger('click')
    expect(wrapper.vm.showModalGraph).toBe(true)
    expect(wrapper.vm.selectedArea).toBe(mockGetSelectedArea)

    wrapper.find(GraphModal).vm.$emit('close')
    expect(wrapper.vm.showModalGraph).toBe(false)
  })
})
