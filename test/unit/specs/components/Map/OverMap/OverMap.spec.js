import OverMap from '@/components/Map/OverMap/OverMap'
import { shallowMount } from '@vue/test-utils'
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import AreaSelectionModal from '@/components/Area/AreaSelectionModal'
import Area from '@/store/area'
import MapControlBar from '@/components/Map/MapControlBar'

const mockMap = {
  setCurrentLocationLayer: jest.fn().mockResolvedValue(true),
  on: jest.fn().mockImplementation((evtName, callback) => {
    mockMap[evtName] = callback
  }),
  zoomToCurrentLocation: jest.fn(),
  setDefaultMap: jest.fn()
}

function getMapMock () {
  return function () {
    return mockMap
  }
}

const mockDisplayedLayer = {
  setDisplayedLayer: jest.fn()
}
function getDisplayedLayer () {
  return function () {
    return mockDisplayedLayer
  }
}

const mockAreaLayer = {
  setSelectedArea: jest.fn(),
  zoomToArea: jest.fn()
}
function getAreaLayer () {
  return function () {
    return mockAreaLayer
  }
}

jest.mock('@/store/area', () => ({
  getSelectedArea: jest.fn().mockReturnValue('getSelectedArea'),
  setSelectedArea: jest.fn()
}))

describe('OverMap.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(OverMap, {
      provide: {
        getMap: getMapMock(),
        getDisplayedLayer: getDisplayedLayer(),
        getAreaLayer: getAreaLayer()
      }
    })
  })

  it('Mounted correctly', () => {
    expect(Area.getSelectedArea).toBeCalled()
    expect(wrapper.vm.selectedArea).toBe('getSelectedArea')
  })

  it('Display SearchLocationResult with result', () => {
    const locationFound = 'SearchLocationResult'
    wrapper.find(AreaSelectionControl).vm.$emit('openSelectionModal')
    wrapper.find(AreaSelectionModal).vm.$emit('input', locationFound)
    expect(wrapper.vm.selectedArea).toBe(locationFound)
    expect(Area.setSelectedArea).toBeCalledWith(locationFound)
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith(locationFound)
  })

  it('Display SearchLocationResult without result', () => {
    wrapper.find(AreaSelectionControl).vm.$emit('openSelectionModal')
    wrapper.find(AreaSelectionModal).vm.$emit('input')
    expect(wrapper.vm.searchLocationResult).toBeUndefined()
  })

  it('On select reported parameter', () => {
    const selectedReportedParameter = {
      layerUrl: 'layerUrl',
      layerParameters: 'layerParameters'
    }
    wrapper.vm.showSidebar = true
    wrapper.find(MapControlBar).vm.$emit('selectedReportedLayer', selectedReportedParameter)
    expect(wrapper.emitted().selectedReportedLayer).toEqual([[selectedReportedParameter]])
  })
})
