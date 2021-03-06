import { Map, TileLayer, CircleMarker, Control } from 'leaflet'
import BaseMaps from '@/store/modules/baseMaps'

import { NorthArrow } from '@/components/Map/OverMap/OverMapControl/Control.NorthArrow'

let defaultParams = {
  bounds: [
    [4.23136927, 35.00105353],
    [-1.48153053, 29.57346534]
  ]
}
let MapObj = Map.extend({
  options: Object.assign({
    attributionControl: false,
    zoomControl: false,
    scaleControl: true
  }, Map.options),
  _baseLayer: false,
  _baseLayerUrl: false,
  _currentLocationMarker: false,
  setDefaultMap () {
    this.fitBounds(defaultParams.bounds)

    this.setBaseMapLayer(BaseMaps.state.active)
  },
  setBaseMapLayer (baseMap) {
    this._baseLayerUrl = baseMap.url
    if (!this._baseLayerUrl) {
      this._baseLayer && this._baseLayer.remove()
      this._baseLayer = false
    } else if (this._baseLayer) {
      this._baseLayer.setUrl(this._baseLayerUrl)
    } else {
      this._baseLayer = new TileLayer.WMS(this._baseLayerUrl).addTo(this)
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
  if (this.options.scaleControl) {
    const scale = new Control.Scale()
    scale.addTo(this)
    const northArrow = new NorthArrow()
    northArrow.addTo(this)
  }
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
