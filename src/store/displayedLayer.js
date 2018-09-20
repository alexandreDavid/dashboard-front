import {
  TileLayer
} from 'leaflet'
import axios from 'axios'
import Unit from '@/utils/unit'
import Settings from '@/store/settings'

export default class {
  _displayedLayer = false
  _parameter = false
  _map = false
  _defaultUnit = false
  _activeUnit = false
  _hasInteractiveLegend = false
  _legendUrl = false
  constructor (map, layerUrl, options = {}) {
    this._map = map
    this.setDisplayedLayer(layerUrl)
  }
  setDisplayedLayer (parameter) {
    this._parameter = parameter
    // Remove and add to activate the addlayer event
    if (this._displayedLayer) {
      this._displayedLayer.remove()
    }
    if (this._map && this._parameter && this._parameter.layerUrl) {
      this._displayedLayer = new TileLayer.WMS(this._parameter.layerUrl, this._parameter.layerParameters).addTo(this._map)
      this._defaultUnit = this._parameter.unit
      this._activeUnit = Settings.getActiveKeyById(Unit.getFamilyUnit(this._defaultUnit)) || this._defaultUnit
      this._hasInteractiveLegend = this._parameter.interactiveLegend
      this._legendUrl = this._parameter.legendUrl
    }
  }
  setDate (min, max) {
    const minFormatedDate = min && new Date(min * 1000).toISOString()
    const maxFormatedDate = max && new Date(max * 1000).toISOString()
    this._displayedLayer.setParams({
      time: `${minFormatedDate}/${maxFormatedDate}`
    })
  }
  setUnit (unit) {
    this._activeUnit = unit
  }
  getDefaultUnit (unit) {
    return this._defaultUnit
  }
  getUnit () {
    return this._activeUnit
  }
  async getFeatureInfo (evt) {
    if (this._displayedLayer) {
      let point = this._map.latLngToContainerPoint(evt.latlng, this._map.getZoom())
      let size = this._map.getSize()

      let params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        styles: this._displayedLayer.options.styles,
        transparent: this._displayedLayer.options.transparent,
        version: this._displayedLayer.options.version,
        format: this._displayedLayer.options.format,
        time: this._displayedLayer.wmsParams.time,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this._displayedLayer.options.layers,
        query_layers: this._displayedLayer.options.layers,
        info_format: 'application/json'
      }

      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y

      const featureInfo = await axios.get(this._displayedLayer._url, {
        params
      })

      return featureInfo.data.features
    }
  }
}
