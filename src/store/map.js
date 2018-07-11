import { Map, TileLayer, CircleMarker } from 'leaflet'

let defaultParams = {
  view: {
    location: [1.384226, 32.640962],
    zoom: 8
  },
  baseLayer: {
    layerUrl: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
    options: {
      maxZoom: 18
    }
  }
}
let MapObj = Map.extend({
  options: Object.assign({
    attributionControl: false,
    zoomControl: false
  }, Map.options),
  _baseLayer: false,
  _currentLocationMarker: false,
  setDefaultMap () {
    this.setView(defaultParams.view.location, defaultParams.view.zoom)

    this.setBaseMapLayer(defaultParams.baseLayer.layerUrl, defaultParams.baseLayer.options)
  },
  setBaseMapLayer (layerUrl, options = {}) {
    if (!this._baseLayer) {
      this._baseLayer = new TileLayer.WMS(layerUrl, options).addTo(this)
    } else {
      this._baseLayer.setUrl(layerUrl, true)
      this._baseLayer.setParams(options)
    }
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
