import DisplayedLayerControl from '@/components/Map/DisplayedLayer/DisplayedLayerControl'
import { shallowMount } from '@vue/test-utils'
import Area from '@/store/area'
import GraphModal from '@/components/Graph/GraphModal'

function getMap () {
  return {}
}

const mockParameter = {
  hasGraph: true
}

const mockGetSelectedArea = 'getSelectedArea'
jest.mock('@/store/area', () => ({
  getSelectedArea: jest.fn()
}))
Area.getSelectedArea.mockReturnValue(mockGetSelectedArea)

const mockDisplayedLayer = {
  setDisplayedLayer: jest.fn(),
  setZIndex: jest.fn(),
  setOpacity: jest.fn(),
  setTime: jest.fn()
}
jest.mock('@/store/displayedLayer.js', () => {
  return jest.fn().mockImplementation(() => {
    return mockDisplayedLayer
  })
})

describe('DisplayedLayerControl.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(DisplayedLayerControl, {
      provide: {
        getMap: getMap
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
