import MapObj from '@/store/map'
import L from 'leaflet'

let mockBaseLayer = {
  addTo: jest.fn().mockReturnThis(),
  setUrl: jest.fn(),
  setParams: jest.fn()
}

L.TileLayer.WMS = jest.fn().mockImplementation(() => mockBaseLayer)

const mockCircleMarker = {
  addTo: jest.fn().mockReturnThis(),
  getLatLng: jest.fn().mockReturnValue(new L.LatLng(45, 40))
}
L.CircleMarker = jest.fn().mockImplementation(() => mockCircleMarker)

const defaultParams = MapObj.getDefaultParams()

describe('map.js', () => {
  let map
  beforeEach(function () {
    L.TileLayer.WMS.mockClear()
    mockBaseLayer.addTo.mockClear()

    map = new MapObj(document.createElement('div'))
    // check disable default controls
    expect(map.options.zoomControl).toBeFalsy()
    expect(map.options.attributionControl).toBeFalsy()

    // create auto baseLayer
    expect(L.TileLayer.WMS).toHaveBeenCalledTimes(1)
    expect(mockBaseLayer.addTo).toHaveBeenCalledTimes(1)

    // check default params
    expect(map.getZoom()).toBe(defaultParams.view.zoom)
    expect(map.getCenter()).toEqual(new L.LatLng(defaultParams.view.location[0], defaultParams.view.location[1]))
  })
  it('Calls setBaseMapLayer', () => {
    map.setBaseMapLayer('layerUrl')
    // Called only the first time
    expect(L.TileLayer.WMS).toHaveBeenCalledTimes(1)
    expect(mockBaseLayer.addTo).toHaveBeenCalledTimes(1)
    // Update baseLayer
    expect(mockBaseLayer.setUrl).toBeCalledWith('layerUrl', true)
    expect(mockBaseLayer.setParams).toBeCalledWith({})
  })

  it('Calls setCurrentLocationLayer without navigation location', () => {
    map.setCurrentLocationLayer().then(data => {
      expect(data).toBe(false)
    })
  })

  it('Calls setCurrentLocationLayer with navigation location', done => {
    navigator.geolocation = {
      getCurrentPosition: callbackPosition => {
        return callbackPosition({
          coords: {
            latitude: 45,
            longitude: 40
          }
        })
      }
    }
    map.setCurrentLocationLayer().then(data => {
      expect(L.CircleMarker).toBeCalledWith([45, 40], MapObj.getCurrentPositionMarkerStyle())
      expect(mockCircleMarker.addTo).toBeCalledWith(map)
      expect(data).toBe(true)

      map.zoomToCurrentLocation()
      expect(mockCircleMarker.getLatLng).toHaveBeenCalledTimes(1)
      expect(map.getCenter()).toEqual(mockCircleMarker.getLatLng())
      done()
    })
  })
})
