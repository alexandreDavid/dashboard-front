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
  constructor (map, layer) {
    this._map = map
    this.setDisplayedLayer(layer)
  }
  setDisplayedLayer (parameter) {
    this._parameter = parameter
    // Remove and add to activate the addlayer event
    if (this._displayedLayer) {
      this._displayedLayer.remove()
    }
    if (this._map && this._parameter) {
      if (this._parameter.layerUrl) {
        this._displayedLayer = new TileLayer.WMS(this._parameter.layerUrl, this._parameter.layerParameters)
      } else if (this._parameter.activeLayer && this._parameter.activeTime) {
        this._displayedLayer = new TileLayer.WMS(
          `${process.env.GEOSERVER_URL}/wms`, {
            layers: this._parameter.activeLayer,
            format: 'image/png',
            transparent: true,
            time: this.formatTime(this._parameter.activeTime)
          }
        )
      } else {
        this._displayedLayer = new TileLayer.WMS(
          `${process.env.GEOSERVER_URL}/wms`,
          this.findDefaultParam(this._parameter)
        )
      }
      this._displayedLayer.addTo(this._map)
      this.setOpacity(this._parameter.opacity)
      if (this._parameter.zIndex) {
        this.setZIndex(this._parameter.zIndex)
      }
      this._defaultUnit = this._parameter.unit
      this._activeUnit = Settings.getActiveKeyById(Unit.getFamilyUnit(this._defaultUnit)) || this._defaultUnit
      this._hasInteractiveLegend = this._parameter.interactiveLegend
      this._legendUrl = this._parameter.legendUrl
    }
  }
  findDefaultParam (param) {
    if (param.layer) {
      let defaultParam = {
        layers: param.layer,
        format: 'image/png',
        transparent: true
      }
      if (param.type === 'interval') {
        let nowIndex = param.times.findIndex(time => (Date.now() / 1000) < time.endTime)
        defaultParam.time = this.formatTime(param.times[(nowIndex > -1 ? nowIndex : 0)])
      } else if (param.type === 'date') {
        defaultParam.time = this.formatTime(param.times[param.times.length - 1])
      }
      return defaultParam
    }
    return param.data && this.findDefaultParam(param.data[0])
  }
  formatTime (time) {
    let formattedTime
    if (time && time.startTime) {
      const startFormatedDate = time.startTime && new Date(time.startTime * 1000).toISOString()
      const endFormatedDate = time.endTime && new Date(time.endTime * 1000).toISOString()
      formattedTime = `${startFormatedDate}/${endFormatedDate}`
    } else {
      formattedTime = time && new Date(time * 1000).toISOString()
    }
    return formattedTime
  }
  setTime (time) {
    this._displayedLayer.setParams({
      time: this.formatTime(time)
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
  getTimeModels () {
    return this._parameter.timeModels
  }
  setOpacity (opacity) {
    opacity = isNaN(opacity) ? 80 : opacity
    this._displayedLayer && this._displayedLayer.setOpacity(opacity / 100)
    return opacity
  }
  remove () {
    this._displayedLayer.remove()
  }
  setZIndex (idx) {
    this._displayedLayer.setZIndex(idx)
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
