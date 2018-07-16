import OverMap from '@/components/Map/OverMap/OverMap'
import { shallowMount } from '@vue/test-utils'
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import AreaLayer from '@/store/areaLayer'
import Parameter from '@/store/parameter'
import Area from '@/store/area'
import Modal from '@/components/Modal/Modal'

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
  getSelectedArea: jest.fn().mockReturnValue('getSelectedArea')
}))

describe('OverMap.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(OverMap, {
      provide: {
        getMap: getMapMock()
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
        getMap: getMapMock()
      }
    })
    expect(wrapper.vm.hasCurrentLocation).toBe(false)
    expect(wrapper.find('#zoom-current-location').exists()).toBe(false)
  })

  it('Mounted correctly', () => {
    expect(mockMap.on).toBeCalled()
    expect(AreaLayer).toBeCalledWith(mockMap)
  })

  it('Click on reset map', () => {
    const buttonResetMap = wrapper.find('#reset-map')
    buttonResetMap.trigger('click')
    expect(mockMap.setDefaultMap).toBeCalled()
  })

  it('Display SearchLocationResult with result', () => {
    const locationFound = 'SearchLocationResult'
    wrapper.find(SearchLocation).vm.$emit('input', locationFound)
    expect(wrapper.vm.searchLocationResult).toBe(locationFound)
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith(locationFound)
  })

  it('Display SearchLocationResult without result', () => {
    wrapper.find(SearchLocation).vm.$emit('input')
    expect(wrapper.vm.searchLocationResult).toBeUndefined()
  })

  it('Toggle graph modal', () => {
    wrapper.find('.open-graph-modal').trigger('click')
    expect(Area.getSelectedArea).toBeCalled()
    expect(Parameter.getDisplayedParameter).toBeCalled()
    expect(wrapper.vm.selectedArea).toBe('getSelectedArea')
    expect(wrapper.vm.selectedParameter).toBe('getDisplayedParameter')
    expect(wrapper.vm.showModal).toBe(true)

    wrapper.find(Modal).vm.$emit('close')
    expect(wrapper.vm.showModal).toBe(false)
  })

  it('On layer add', () => {
    mockMap.layeradd()
    expect(wrapper.vm.selectedParameter).toBe('getDisplayedParameter')
  })
})
