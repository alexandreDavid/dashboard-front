import Map from '@/components/Map/Map'
import { shallowMount } from '@vue/test-utils'
import MapObj from '@/store/map'
import DisplayedLayer from '@/store/displayedLayer.js'
import OverMap from '@/components/Map/OverMap/OverMap'

const mockMap = jest.fn()
jest.mock('@/store/map.js', () => {
  return jest.fn().mockImplementation(() => {
    return mockMap
  })
})

const mockDisplayedLayer = jest.fn()
jest.mock('@/store/displayedLayer.js', () => {
  return jest.fn().mockImplementation(() => {
    return mockDisplayedLayer
  })
})

describe('Map.vue', () => {
  let wrapper
  beforeEach(() => {
    MapObj.mockClear()
    wrapper = shallowMount(Map)
  })

  it('Mounted correctly', async () => {
    expect(wrapper.vm.mapInitialised).toBe(true)
    expect(MapObj).toBeCalledWith('map-container')
    expect(DisplayedLayer).toBeCalledWith(mockMap)
  })

  it('Providers are correct', async () => {
    expect(wrapper.vm.getMap()).toBe(mockMap)
    expect(wrapper.vm.getDisplayedLayer()).toBe(mockDisplayedLayer)
    wrapper.vm.selectedReportedLayer = 'selectedReportedLayer'
    expect(wrapper.vm.getSelectedReportedLayer()).toBe('selectedReportedLayer')
  })

  it('On selectedReportedLayer', () => {
    wrapper.find(OverMap).vm.$emit('selectedReportedLayer', 'selectedReportedLayerVal')
    expect(wrapper.vm.selectedReportedLayer).toBe('selectedReportedLayerVal')
  })
})
