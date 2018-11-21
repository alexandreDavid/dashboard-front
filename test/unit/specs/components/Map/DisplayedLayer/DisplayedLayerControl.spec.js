import DisplayedLayerControl from '@/components/Map/DisplayedLayer/DisplayedLayerControl'
import { shallowMount } from '@vue/test-utils'
import Area from '@/store/area'

function getMap () {
  return {}
}

const mockLayer = {
  geoResource: {},
  hasTime: jest.fn()
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
        layer: mockLayer
      }
    })
  })

  it('On open graph modal', () => {
    wrapper.find('.up').trigger('click')
    expect(wrapper.emitted('up')).toBeTruthy()
  })
})
