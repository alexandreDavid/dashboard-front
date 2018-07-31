import { shallowMount } from '@vue/test-utils'
import WidgetMap from '@/components/Dashboard/Widgets/WidgetMap.vue'

import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import DisplayedLayer from '@/store/displayedLayer'

const mockMap = jest.fn()
jest.mock('@/store/map', () => {
  return jest.fn().mockImplementation(() => {
    return mockMap
  })
})

const mockAreaLayer = jest.fn()
jest.mock('@/store/areaLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockAreaLayer
  })
})

const mockDisplayedLayer = {
  setDisplayedLayer: jest.fn()
}
jest.mock('@/store/displayedLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockDisplayedLayer
  })
})

describe('WidgetMap.vue', () => {
  let wrapper
  beforeEach(async () => {
    wrapper = shallowMount(WidgetMap, {
      propsData: {
        parameter: {
          layerUrl: 'layerUrl',
          layerParameters: 'layerParameters'
        },
        area: 'area',
        widgetKey: 'widgetKey'
      }
    })
  })

  it('Mount with good data', () => {
    const mapId = 'map-container-widgetwidgetKey'
    expect(wrapper.find(`#${mapId}`).exists()).toBe(true)
    expect(MapObj).toBeCalledWith(mapId)
    expect(AreaLayer).toBeCalledWith(mockMap, 'area')
    expect(AreaLayer).toBeCalledWith(mockMap, 'area')
    expect(DisplayedLayer).toBeCalledWith(mockMap, wrapper.vm.parameter)
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('On watch parameter', () => {
    wrapper.setProps({
      parameter: {
        layerUrl: 'layerUrl2',
        layerParameters: 'layerParameters2'
      }
    })
    expect(mockDisplayedLayer.setDisplayedLayer).toBeCalledWith(wrapper.vm.parameter)
  })

  it('Providers are correct', async () => {
    expect(wrapper.vm.getMap()).toBe(mockMap)
    expect(wrapper.vm.getDisplayedLayer()).toBe(mockDisplayedLayer)
  })
})
