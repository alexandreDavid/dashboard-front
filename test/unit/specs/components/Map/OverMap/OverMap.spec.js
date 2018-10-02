import OverMap from '@/components/Map/OverMap/OverMap'
import { shallowMount } from '@vue/test-utils'
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import AreaSelectionModal from '@/components/Area/AreaSelectionModal'
import AreaLayer from '@/store/areaLayer'
import Parameter from '@/store/parameter'
import Area from '@/store/area'
// import Modal from '@/components/Modal/Modal'
import Managing from '@/components/Map/OverMap//OverMapControl/Managing/Managing'

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
  setSelectedArea: jest.fn()
}
jest.mock('@/store/areaLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockAreaLayer
  })
})

jest.mock('@/store/parameter', () => ({
  getDisplayedParameter: jest.fn().mockReturnValue('getDisplayedParameter')
}))
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
        getDisplayedLayer: getDisplayedLayer()
      }
    })
  })

  it('Has current location', async () => {
    expect(wrapper.vm.hasCurrentLocation).toBe(true)
    const buttonLocation = wrapper.find('#zoom-current-location')
    expect(buttonLocation.exists()).toBeDefined()

    buttonLocation.trigger('click')
    expect(mockMap.zoomToCurrentLocation).toBeCalled()
  })

  it('Hasn\'t current location', async () => {
    mockMap.setCurrentLocationLayer = jest.fn().mockResolvedValue(true)
    const wrapper = shallowMount(OverMap, {
      provide: {
        getMap: getMapMock(),
        getDisplayedLayer: getDisplayedLayer()
      }
    })
    expect(wrapper.vm.hasCurrentLocation).toBe(false)
    expect(wrapper.find('#zoom-current-location').exists()).toBe(false)
  })

  it('Mounted correctly', () => {
    expect(AreaLayer).toBeCalledWith(mockMap, 'getSelectedArea')
    expect(Parameter.getDisplayedParameter).toBeCalled()
  })

  it('Click on reset map', () => {
    const buttonResetMap = wrapper.find('#reset-map')
    buttonResetMap.trigger('click')
    expect(mockMap.setDefaultMap).toBeCalled()
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

  // it('Toggle graph modal', () => {
  //   wrapper.find('.open-graph-modal').trigger('click')
  //   expect(Area.getSelectedArea).toBeCalled()
  //   expect(Parameter.getDisplayedParameter).toBeCalled()
  //   expect(wrapper.vm.selectedArea).toBe('getSelectedArea')
  //   expect(wrapper.vm.selectedParameter).toBe('getDisplayedParameter')
  //   expect(wrapper.vm.showModal).toBe(true)

  //   wrapper.find(Modal).vm.$emit('close')
  //   expect(wrapper.vm.showModal).toBe(false)
  // })

  // it('On select parameter null', () => {
  //   mockDisplayedLayer.setDisplayedLayer.mockClear()
  //   wrapper.find(Managing).vm.$emit('selectedParameter', false)
  //   expect(mockDisplayedLayer.setDisplayedLayer).not.toBeCalled()
  // })

  // it('On select parameter', () => {
  //   const selectedParameter = {
  //     layerUrl: 'layerUrl',
  //     layerParameters: 'layerParameters'
  //   }
  //   wrapper.find(Managing).vm.$emit('selectedParameter', selectedParameter)
  //   expect(mockDisplayedLayer.setDisplayedLayer).toBeCalledWith(selectedParameter)
  // })

  it('On select reported parameter', () => {
    const selectedReportedParameter = {
      layerUrl: 'layerUrl',
      layerParameters: 'layerParameters'
    }
    wrapper.find(Managing).vm.$emit('selectedReportedParameter', selectedReportedParameter)
    expect(wrapper.emitted().selectedReportedLayer).toEqual([[selectedReportedParameter]])
  })
})
