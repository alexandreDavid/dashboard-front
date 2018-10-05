import DisplayedLayerControl from '@/components/Map/DisplayedLayer/DisplayedLayerControl'
import { shallowMount } from '@vue/test-utils'
import TimeSerie from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSerie'
import DisplayedLayerControlParams from '@/components/Map/DisplayedLayer/DisplayedLayerControlParams'

const mockDisplayedLayer = {
  setDisplayedLayer: jest.fn(),
  setTime: jest.fn(),
  formatTime: jest.fn()
}
function getDisplayedLayer () {
  return mockDisplayedLayer
}

describe('DisplayedLayerControl.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(DisplayedLayerControl, {
      provide: {
        getDisplayedLayer: getDisplayedLayer
      },
      propsData: {
        parameter: {}
      }
    })
  })

  it('Mounted correctly', () => {
    expect(mockDisplayedLayer.setDisplayedLayer).not.toBeCalled()
  })
})
