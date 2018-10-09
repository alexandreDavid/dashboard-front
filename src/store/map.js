import { Map, TileLayer, CircleMarker } from 'leaflet'
import UserConfiguration from '@/store/userConfiguration'

let defaultParams = {
  bounds: [
    [4.23136927, 35.00105353],
    [-1.48153053, 29.57346534]
  ]
}
let MapObj = Map.extend({
  options: Object.assign({
    attributionControl: false,
    zoomControl: false
  }, Map.options),
  _baseLayer: false,
  _baseLayerUrl: false,
  _currentLocationMarker: false,
  setDefaultMap () {
    this.fitBounds(defaultParams.bounds)

    this.setBaseMapLayer(UserConfiguration.getActiveBaseMapLayer())
  },
  setBaseMapLayer (layerUrl) {
    this._baseLayerUrl = layerUrl
    if (!this._baseLayer) {
      this._baseLayer = new TileLayer.WMS(layerUrl).addTo(this)
    } else {
      this._baseLayer.setUrl(layerUrl)
    }
  },
  getBaseMapLayerUrl () {
    return this._baseLayerUrl
  },
  setCurrentLocationLayer () {
    let that = this
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          that._currentLocationMarker = new CircleMarker(
            [position.coords.latitude, position.coords.longitude],
            MapObj.getCurrentPositionMarkerStyle()
          ).addTo(that)
          resolve(true)
        })
      } else {
        resolve(false)
      }
    })
  },
  zoomToCurrentLocation () {
    this.setView(this._currentLocationMarker.getLatLng())
  }
})

MapObj.addInitHook(function () {
  this.setDefaultMap()
})

MapObj.setDefaultParams = function (params) {
  Object.assign(defaultParams, params)
}

MapObj.getDefaultParams = () => {
  return defaultParams
}

MapObj.getCurrentPositionMarkerStyle = () => {
  return {
    radius: 5,
    color: '#FFF',
    weight: 1,
    fillColor: '#3388ff',
    fillOpacity: 1
  }
}

export default MapObj
