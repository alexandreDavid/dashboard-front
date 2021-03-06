import MiniMap from '@/components/Map/MiniMap'
import { shallowMount } from '@vue/test-utils'
import MapObj from '@/store/map'
import DisplayedLayer from '@/store/displayedLayer.js'

const mockMap = {
  invalidateSize: jest.fn(),
  remove: jest.fn(),
  boxZoom: {
    enable: jest.fn(),
    disable: jest.fn()
  },
  setBaseMapLayer: jest.fn()
}
jest.mock('@/store/map.js', () => {
  return jest.fn().mockImplementation(() => {
    return mockMap
  })
})

const mockAreaLayer = {
  isReady: jest.fn(),
  addTo: jest.fn(),
  zoomTo: jest.fn()
}

const mockDisplayedLayer = {
  setDisplayedLayer: jest.fn()
}
jest.mock('@/store/displayedLayer.js', () => {
  return jest.fn().mockImplementation(() => {
    return mockDisplayedLayer
  })
})

describe('MiniMap.vue', () => {
  let wrapper
  beforeEach(() => {
    MapObj.mockClear()
    mockMap.invalidateSize.mockClear()
    mockMap.setBaseMapLayer.mockClear()
    mockAreaLayer.isReady.mockClear()
    mockAreaLayer.addTo.mockClear()
    mockAreaLayer.zoomTo.mockClear()
    mockDisplayedLayer.setDisplayedLayer.mockClear()
    wrapper = shallowMount(MiniMap, {
      propsData: {
        area: 'area',
        parameter: 'parameter',
        minimapKey: 'minimapKey',
        baseLayer: 'baseLayer',
        interactive: false,
        areaLayer: mockAreaLayer
      }
    })
  })

  it('Mounted correctly', () => {
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(MapObj).toBeCalledWith('minimap-container-minimapKey', {scaleControl: false})
    expect(mockAreaLayer.addTo).toBeCalledWith(mockMap)
    expect(DisplayedLayer).toBeCalledWith(mockMap)
    expect(mockDisplayedLayer.setDisplayedLayer).toBeCalledWith('parameter')
    expect(mockMap.boxZoom.disable).toHaveBeenCalledTimes(1)
    expect(mockMap.setBaseMapLayer).toHaveBeenCalledWith('baseLayer')
  })

  it('Mounted without baseMap and displayedLayer', () => {
    mockDisplayedLayer.setDisplayedLayer.mockClear()
    mockMap.setBaseMapLayer.mockClear()
    mockMap.boxZoom.disable.mockClear()
    let wrapper = shallowMount(MiniMap, {
      propsData: {
        area: 'area',
        minimapKey: 'minimapKey',
        interactive: false,
        areaLayer: mockAreaLayer
      }
    })
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(MapObj).toBeCalledWith('minimap-container-minimapKey', {scaleControl: false})
    expect(mockAreaLayer.addTo).toBeCalledWith(mockMap)
    expect(DisplayedLayer).toBeCalled()
    expect(mockDisplayedLayer.setDisplayedLayer).not.toBeCalled()
    expect(mockMap.boxZoom.disable).toHaveBeenCalledTimes(1)
    expect(mockMap.setBaseMapLayer).not.toHaveBeenCalled()
  })

  it('Providers are correct', () => {
    expect(wrapper.vm.getMap()).toBe(mockMap)
    expect(wrapper.vm.getDisplayedLayer()).toBe(mockDisplayedLayer)
  })

  it('on interactive prop changes', () => {
    wrapper.setProps({interactive: true})
    expect(mockMap.invalidateSize).toHaveBeenCalledTimes(1)
    expect(mockAreaLayer.zoomTo).toHaveBeenCalledTimes(1)
    expect(mockMap.boxZoom.enable).toHaveBeenCalledTimes(1)
  })

  it('on parameter prop changes and areaLayer not ready', () => {
    wrapper.setProps({parameter: 'newParam'})
    expect(mockDisplayedLayer.setDisplayedLayer).toHaveBeenLastCalledWith('newParam')
    expect(mockAreaLayer.isReady).toHaveBeenCalledTimes(1)
    expect(mockMap.invalidateSize).toHaveBeenCalledTimes(0)
    expect(mockAreaLayer.zoomTo).toHaveBeenCalledTimes(0)
  })

  it('on parameter prop changes and areaLayer ready', () => {
    mockAreaLayer.isReady.mockReturnValue(true)
    wrapper.setProps({parameter: 'newParam2'})
    expect(mockDisplayedLayer.setDisplayedLayer).toHaveBeenLastCalledWith('newParam2')
    expect(mockAreaLayer.isReady).toHaveBeenCalledTimes(1)
    expect(mockMap.invalidateSize).toHaveBeenCalledTimes(1)
    expect(mockAreaLayer.zoomTo).toHaveBeenCalledTimes(1)
  })

  it('On destroy', () => {
    wrapper.destroy()
    expect(mockMap.remove).toHaveBeenCalledTimes(1)
  })
})
