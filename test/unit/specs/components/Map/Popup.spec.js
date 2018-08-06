import Popup from '@/components/Map/Popup'
import { mount } from '@vue/test-utils'
import L from 'leaflet'
import Unit from '@/utils/unit'

const mockPopup = {
  setLatLng: jest.fn().mockReturnThis(),
  setContent: jest.fn().mockReturnThis(),
  openOn: jest.fn()
}

L.Popup = jest.fn().mockImplementation(() => mockPopup)

jest.mock('@/utils/unit', () => ({
  convert: jest.fn().mockReturnValue(42),
  getLabel: jest.fn().mockReturnValue('getLabel')
}))

const mockMapOn = jest.fn()

function getMapMock () {
  return function () {
    return {
      on: mockMapOn
    }
  }
}

const mockDisplayedLayer = {
  getFeatureInfo: jest.fn(),
  getUnit: jest.fn(),
  getDefaultUnit: jest.fn()
}
function getDisplayedLayer () {
  return function () {
    return mockDisplayedLayer
  }
}

describe('Popup.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Popup, {
      provide: {
        getMap: getMapMock(),
        getDisplayedLayer: getDisplayedLayer()
      }
    })
    expect(wrapper.vm.value).toBe(false)
    expect(mockMapOn).toBeCalled()
    L.Popup.mockClear()
    Unit.convert.mockClear()
    mockDisplayedLayer.getUnit.mockClear()
    mockDisplayedLayer.getDefaultUnit.mockClear()
  })

  it('With feature and label', async () => {
    const mockEvt = {latlng: 'latlng'}
    mockDisplayedLayer.getFeatureInfo.mockResolvedValue([{
      properties: {
        GDAL_Band_Number_1: 'mockGetFeatureInfo'
      }
    }])
    mockDisplayedLayer.getUnit.mockReturnValue('getUnit')
    mockDisplayedLayer.getDefaultUnit.mockReturnValue('getDefaultUnit')

    await wrapper.vm.getFeatureInfo(mockEvt)
    expect(mockDisplayedLayer.getFeatureInfo).toBeCalledWith(mockEvt, wrapper.vm.getMap())
    expect(Unit.convert).toBeCalledWith('getDefaultUnit', 'getUnit', 'mockGetFeatureInfo')
    expect(wrapper.vm.value).toBe('42getLabel')
    expect(L.Popup).toBeCalledWith({
      maxWidth: 800
    })
    expect(mockPopup.setLatLng).toBeCalledWith('latlng')
    expect(mockPopup.setContent).toBeCalled()
    expect(mockPopup.openOn).toBeCalled()
  })

  it('With feature and no label', async () => {
    Unit.getLabel.mockReturnValue('')
    const mockEvt = {latlng: 'latlng'}
    mockDisplayedLayer.getFeatureInfo.mockResolvedValue([{
      properties: {
        GDAL_Band_Number_1: 'mockGetFeatureInfo'
      }
    }])
    mockDisplayedLayer.getUnit.mockReturnValue('getUnit')
    mockDisplayedLayer.getDefaultUnit.mockReturnValue('getDefaultUnit')

    await wrapper.vm.getFeatureInfo(mockEvt)
    expect(mockDisplayedLayer.getFeatureInfo).toBeCalledWith(mockEvt, wrapper.vm.getMap())
    expect(Unit.convert).toBeCalledWith('getDefaultUnit', 'getUnit', 'mockGetFeatureInfo')
    expect(wrapper.vm.value).toBe(42)
    expect(L.Popup).toBeCalledWith({
      maxWidth: 800
    })
    expect(mockPopup.setLatLng).toBeCalledWith('latlng')
    expect(mockPopup.setContent).toBeCalled()
    expect(mockPopup.openOn).toBeCalled()
  })

  it('Without feature', async () => {
    const mockEvt = {latlng: 'latlng'}
    mockDisplayedLayer.getFeatureInfo.mockResolvedValue([])
    await wrapper.vm.getFeatureInfo(mockEvt)
    expect(mockDisplayedLayer.getFeatureInfo).toBeCalledWith(mockEvt, wrapper.vm.getMap())
    expect(Unit.convert).not.toBeCalled()
    expect(wrapper.vm.value).toBe(false)
    expect(L.Popup).not.toBeCalled()
  })
})
