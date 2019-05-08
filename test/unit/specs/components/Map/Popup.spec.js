import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Popup from '@/components/Map/Popup'
import L from 'leaflet'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockPopup = {
  setLatLng: jest.fn().mockReturnThis(),
  setContent: jest.fn().mockReturnThis(),
  openOn: jest.fn()
}

L.Popup = jest.fn().mockImplementation(() => mockPopup)

const mockMap = {
  on: jest.fn(),
  off: jest.fn(),
  closePopup: jest.fn()
}

function getMapMock () {
  return function () {
    return mockMap
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
  let getters
  let store

  beforeEach(() => {
    getters = {
      getLabel: (state) => (id) => {
        return `getLabel ${id}`
      }
    }

    store = new Vuex.Store({
      modules: {
        settings: {
          namespaced: true,
          getters
        }
      }
    })

    wrapper = shallowMount(Popup, {
      provide: {
        getMap: getMapMock(),
        getDisplayedLayer: getDisplayedLayer()
      },
      store,
      localVue
    })
    expect(wrapper.vm.value).toBe(false)
    expect(mockMap.on).toBeCalled()
    L.Popup.mockClear()
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
    expect(wrapper.vm.value).toBe('mockGetFeatureInfo')
    expect(L.Popup).toBeCalledWith({
      maxWidth: 800
    })
    expect(mockPopup.setLatLng).toBeCalledWith('latlng')
    expect(mockPopup.setContent).toBeCalledWith('<p>mockGetFeatureInfo getLabel getUnit</p>')
    expect(mockPopup.openOn).toBeCalled()
  })

  it('With feature and no label', async () => {
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
    mockDisplayedLayer.getFeatureInfo.mockResolvedValue([])
    await wrapper.vm.getFeatureInfo(mockEvt)
    expect(mockDisplayedLayer.getFeatureInfo).toBeCalledWith(mockEvt, wrapper.vm.getMap())
    expect(wrapper.vm.value).toBe(false)
    expect(L.Popup).not.toBeCalled()
  })

  it('On destroy', () => {
    wrapper.destroy()
    expect(mockMap.off).toHaveBeenCalledTimes(1)
    expect(mockMap.closePopup).toHaveBeenCalledTimes(1)
    expect(mockMap.closePopup).toHaveBeenCalledWith(wrapper.vm.popup)
  })
})
