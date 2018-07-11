import {
  TileLayer
} from 'leaflet'
import axios from 'axios'

export default class {
  _displayedLayer = false
  constructor (map, layerUrl, options = {}) {
    this.setDisplayedLayer(map, layerUrl, options)
  }
  setDisplayedLayer (map, layerUrl, options = {}) {
    // Remove and add to activate the addlayer event
    if (this._displayedLayer) {
      this._displayedLayer.remove()
    }
    if (map && layerUrl) {
      this._displayedLayer = new TileLayer.WMS(layerUrl, options).addTo(map)
    }
  }
  async getFeatureInfo (evt, map) {
    if (this._displayedLayer) {
      let point = map.latLngToContainerPoint(evt.latlng, map.getZoom())
      let size = map.getSize()

      let params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        styles: this._displayedLayer.options.styles,
        transparent: this._displayedLayer.options.transparent,
        version: this._displayedLayer.options.version,
        format: this._displayedLayer.options.format,
        bbox: map.getBounds().toBBoxString(),
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
