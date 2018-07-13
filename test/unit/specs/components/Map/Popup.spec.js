import Popup from '@/components/Map/Popup'
import { mount } from '@vue/test-utils'
import L from 'leaflet'

const mockPopup = {
  setLatLng: jest.fn().mockReturnThis(),
  setContent: jest.fn().mockReturnThis(),
  openOn: jest.fn()
}

L.Popup = jest.fn().mockImplementation(() => mockPopup)

const mockMapOn = jest.fn()

function getMapMock () {
  return function () {
    return {
      on: mockMapOn
    }
  }
}

const mockGetFeatureInfo = jest.fn()
function getDisplayedLayer () {
  return function () {
    return {
      getFeatureInfo: mockGetFeatureInfo
    }
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
  })

  it('With feature', async () => {
    const mockEvt = {latlng: 'latlng'}
    mockGetFeatureInfo.mockResolvedValue([{
      properties: {
        GDAL_Band_Number_1: 'mockGetFeatureInfo'
      }
    }])
    await wrapper.vm.getFeatureInfo(mockEvt)
    expect(mockGetFeatureInfo).toBeCalledWith(mockEvt, wrapper.vm.getMap())
    expect(wrapper.vm.value).toBe('mockGetFeatureInfo')
    expect(L.Popup).toBeCalledWith({
      maxWidth: 800
    })
    expect(mockPopup.setLatLng).toBeCalledWith('latlng')
    expect(mockPopup.setContent).toBeCalled()
    expect(mockPopup.openOn).toBeCalled()
  })

  it('Without feature', async () => {
    const mockEvt = {latlng: 'latlng'}
    mockGetFeatureInfo.mockResolvedValue([])
    await wrapper.vm.getFeatureInfo(mockEvt)
    expect(mockGetFeatureInfo).toBeCalledWith(mockEvt, wrapper.vm.getMap())
    expect(wrapper.vm.value).toBe(false)
    expect(L.Popup).not.toBeCalled()
  })
})
