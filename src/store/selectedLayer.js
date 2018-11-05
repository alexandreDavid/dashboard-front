import {
  TileLayer
} from 'leaflet'
import axios from 'axios'

export default class {
  geoRessource = false
  _layer = false
  _availableTimes = []
  constructor (geoRessource) {
    this.setLayer(geoRessource)
  }
  setLayer (geoRessource) {
    this.geoRessource = geoRessource
    // Remove and add to activate the addlayer event
    if (this._layer) {
      this._layer.remove()
    }
    if (this.geoRessource) {
      this._layer = new TileLayer.WMS(this.geoRessource.config.layer.link, {
        layers: this.geoRessource.config.layer.layerName,
        format: 'image/png',
        transparent: true
      })
      this._availableTimes = this.geoRessource.config.layer.params.date
      // Date
      this.setTime(this.geoRessource.time)
      // Opacity
      this.setOpacity(this.geoRessource.opacity)
      // zIndex
      if (this.geoRessource.zIndex) {
        this.setZIndex(this.geoRessource.zIndex)
      }
    }
  }
  addTo (map) {
    this._layer.addTo(map)
  }
  formatTime (time) {
    return time && new Date(time * 1000).toISOString()
  }
  setTime (time) {
    if (this._availableTimes && this._availableTimes.length) {
      if (!(time && this._availableTimes.indexOf(time) > -1)) {
        time = this._availableTimes[0]
      }
      this.geoRessource.time = time
      this._layer.setParams({
        time: this.formatTime(time)
      })
    }
  }
  setOpacity (opacity) {
    opacity = Number.isInteger(opacity) ? opacity : 80
    this.geoRessource.opacity = opacity
    this._layer && this._layer.setOpacity(opacity / 100)
    return opacity
  }
  remove () {
    this._layer.remove()
  }
  setZIndex (idx) {
    this.geoRessource.zIndex = idx
    this._layer.setZIndex(idx)
  }
  async getFeatureInfo (evt, map) {
    if (this._layer) {
      let point = map.latLngToContainerPoint(evt.latlng, map.getZoom())
      let size = map.getSize()

      let params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        styles: this._layer.options.styles,
        transparent: this._layer.options.transparent,
        version: this._layer.options.version,
        format: this._layer.options.format,
        time: this._layer.wmsParams.time,
        bbox: map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this._layer.options.layers,
        query_layers: this._layer.options.layers,
        info_format: 'application/json'
      }

      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y

      const featureInfo = await axios.get(this._layer._url, {
        params
      })

      return featureInfo.data.features
    }
  }
  async getLegend () {
    return {
      type: 'raster',
      values: [
        {
          color: '#2c7bb6',
          value: 281,
          name: '281'
        }, {
          color: '#abd9e9',
          value: 286.1,
          name: '286.1'
        }, {
          color: '#ffffbf',
          value: 291.2,
          name: '291.2'
        }, {
          color: '#fdae61',
          value: 296.2,
          name: '296.2'
        }, {
          color: '#d7191c',
          value: 301.3,
          name: '301.3'
        }
      ]
    }
  }
}
