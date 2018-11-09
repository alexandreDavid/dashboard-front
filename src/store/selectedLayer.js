import {
  TileLayer
} from 'leaflet'
import axios from 'axios'

export default class {
  geoResource = false
  _layer = false
  _availableTimes = []
  _time = false
  _opacity = false
  _layerId = false
  _legend = false
  _area = false
  constructor (geoResource) {
    this.setLayer(geoResource)
  }
  async getLayerId (params) {
    let creationInfos
    try {
      creationInfos = await axios.post(this.geoResource.config.layer_creation.link, params)
    } catch (error) {
      console.warn('Area too complex for croping the layer')
      delete params.area
      creationInfos = await axios.post(this.geoResource.config.layer_creation.link, params)
    }
    return creationInfos.data.layer_id
  }
  getAvailableTimes (geoResource) {
    return (geoResource.config.layer_creation.params && geoResource.config.layer_creation.params.date && geoResource.config.layer_creation.params.date.values) || []
  }
  getTime () {
    this.geoResource.time = this.geoResource.time || (this._availableTimes && this._availableTimes[0])
    this._time = this.geoResource.time
    return this.geoResource.time
  }
  async updateLayer () {
    this._layerId = await this.getLayerId({date: this.geoResource.time, area: this._area})
    this._layer.options.layer_id = this._layerId
    this._layer.redraw()
    this.setLegend()
  }
  async setLayer (geoResource, area) {
    this.geoResource = geoResource
    this._area = area
    // Remove and add to activate the addlayer event
    if (this._layer) {
      this._layer.remove()
    }
    if (this.geoResource) {
      this._availableTimes = this.getAvailableTimes(this.geoResource)
      this._layerId = await this.getLayerId({date: this.getTime(), area: this._area})
      this._layer = new TileLayer(this.geoResource.config.layer.link, {layer_id: this._layerId})
      // Opacity
      this.setOpacity(this.geoResource.opacity)
      // zIndex
      if (this.geoResource.zIndex) {
        this.setZIndex(this.geoResource.zIndex)
      }
      // Legend
      this.setLegend()
    }
  }
  addTo (map) {
    this._layer.addTo(map)
  }
  formatTime (time) {
    return time && new Date(time * 1000).toISOString()
  }
  async setArea (area) {
    this._area = area
    await this.updateLayer()
  }
  async setTime (time) {
    if (this._availableTimes && this._availableTimes.length) {
      if (!(time && this._availableTimes.indexOf(time) > -1)) {
        time = this._availableTimes[0]
      }
      this.geoResource.time = time
      this._time = time
      await this.updateLayer()
    }
  }
  setOpacity (opacity) {
    opacity = Number.isInteger(opacity) ? opacity : 80
    this.geoResource.opacity = opacity
    this._opacity = opacity
    this._layer && this._layer.setOpacity(opacity / 100)
    return opacity
  }
  remove () {
    this._layer.remove()
  }
  setZIndex (idx) {
    this.geoResource.zIndex = idx
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
  async setLegend () {
    const legendInfos = await axios.get(this.geoResource.config.legend.link.replace('{layer_id}', this._layerId))
    this._legend = legendInfos.data
    return this._legend
  }
}
