import MiniMap from '@/components/Map/MiniMap'
import { shallowMount } from '@vue/test-utils'
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer.js'
import DisplayedLayer from '@/store/displayedLayer.js'

const mockMap = {
  invalidateSize: jest.fn(),
  remove: jest.fn(),
  boxZoom: {
    enable: jest.fn(),
    disable: jest.fn()
  }
}
jest.mock('@/store/map.js', () => {
  return jest.fn().mockImplementation(() => {
    return mockMap
  })
})

const mockAreaLayer = {
  isReady: jest.fn(),
  zoomToArea: jest.fn()
}
jest.mock('@/store/areaLayer.js', () => {
  return jest.fn().mockImplementation(() => {
    return mockAreaLayer
  })
})

const mockDisplayedLayer = {
  setDisplayedLayer: jest.fn()
}
jest.mock('@/store/displayedLayer.js', () => {
  return jest.fn().mockImplementation(() => {
    return mockDisplayedLayer
  })
})

describe('Map.vue', () => {
  let wrapper
  beforeEach(() => {
    MapObj.mockClear()
    mockMap.invalidateSize.mockClear()
    mockAreaLayer.isReady.mockClear()
    mockAreaLayer.zoomToArea.mockClear()
    wrapper = shallowMount(MiniMap, {
      propsData: {
        area: 'area',
        parameter: 'parameter',
        minimapKey: 'minimapKey',
        interactive: false
      }
    })
  })

  it('Mounted correctly', async () => {
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(MapObj).toBeCalledWith('minimap-container-minimapKey')
    expect(AreaLayer).toBeCalledWith(mockMap, {id: 7552})
    expect(DisplayedLayer).toBeCalledWith(mockMap, 'parameter')
    expect(mockMap.boxZoom.disable).toHaveBeenCalledTimes(1)
  })

  it('Providers are correct', async () => {
    expect(wrapper.vm.getMap()).toBe(mockMap)
    expect(wrapper.vm.getDisplayedLayer()).toBe(mockDisplayedLayer)
  })

  it('on interactive prop changes', () => {
    wrapper.setProps({interactive: true})
    expect(mockMap.invalidateSize).toHaveBeenCalledTimes(1)
    expect(mockAreaLayer.zoomToArea).toHaveBeenCalledTimes(1)
    expect(mockMap.boxZoom.enable).toHaveBeenCalledTimes(1)
  })

  it('on parameter prop changes and areaLayer not ready', () => {
    wrapper.setProps({parameter: 'newParam'})
    expect(mockDisplayedLayer.setDisplayedLayer).toHaveBeenLastCalledWith('newParam')
    expect(mockAreaLayer.isReady).toHaveBeenCalledTimes(1)
    expect(mockMap.invalidateSize).toHaveBeenCalledTimes(0)
    expect(mockAreaLayer.zoomToArea).toHaveBeenCalledTimes(0)
  })

  it('on parameter prop changes and areaLayer ready', () => {
    mockAreaLayer.isReady.mockReturnValue(true)
    wrapper.setProps({parameter: 'newParam2'})
    expect(mockDisplayedLayer.setDisplayedLayer).toHaveBeenLastCalledWith('newParam2')
    expect(mockAreaLayer.isReady).toHaveBeenCalledTimes(1)
    expect(mockMap.invalidateSize).toHaveBeenCalledTimes(1)
    expect(mockAreaLayer.zoomToArea).toHaveBeenCalledTimes(1)
  })

  it('On destroy', () => {
    wrapper.destroy()
    expect(mockMap.remove).toHaveBeenCalledTimes(1)
  })
})
