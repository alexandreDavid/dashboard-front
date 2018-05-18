import {
  TileLayer
} from 'leaflet'
import MapObj from '@/store/map'
import axios from 'axios'

let displayedLayer

export default {
  _map: false,
  setDisplayedLayer (layerUrl, options = {}) {
    // Remove and add to activate the addlayer event
    if (displayedLayer) {
      displayedLayer.remove()
    }
    displayedLayer = new TileLayer.WMS(layerUrl, options).addTo(MapObj.getMap())
  },
  async getFeatureInfo (evt) {
    if (displayedLayer) {
      let point = MapObj.getMap().latLngToContainerPoint(evt.latlng, MapObj.getMap().getZoom())
      let size = MapObj.getMap().getSize()

      let params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        styles: displayedLayer.options.styles,
        transparent: displayedLayer.options.transparent,
        version: displayedLayer.options.version,
        format: displayedLayer.options.format,
        bbox: MapObj.getMap().getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: displayedLayer.options.layers,
        query_layers: displayedLayer.options.layers,
        info_format: 'application/json'
      }

      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y

      const featureInfo = await axios.get(displayedLayer._url, {
        params: params
      })

      return featureInfo.data.features
    }
  }
}
