import axios from 'axios'
import { GeoJSON } from 'leaflet'

let AreaLayer = class {
  _areaLayer = false
  _map = false

  constructor (map, area) {
    this._map = map
    if (area) {
      this.setSelectedArea(area)
    }
  }
  async setSelectedArea (area) {
    const areaData = await axios.get(
      `http://18.130.18.23:8180/geoserver/boundaries/ows`, {
        params: AreaLayer.getAreaRequestParams(area)
      }
    )
    if (this._areaLayer) {
      this._areaLayer.remove()
    }
    this._areaLayer = new GeoJSON(areaData.data, AreaLayer.getAreaLayerStyle()).addTo(this._map)
    this.zoomToArea()
  }
  zoomToArea () {
    this._map.fitBounds(this._areaLayer.getBounds())
  }
}

AreaLayer.getAreaRequestParams = (area) => {
  return {
    service: 'WFS',
    version: '1.1.1',
    request: 'GetFeature',
    typeName: `boundaries:area`,
    outputFormat: 'application/json',
    featureid: area.id
  }
}

AreaLayer.getAreaLayerStyle = () => {
  return {
    weight: 2,
    width: 2,
    color: 'black',
    fillOpacity: 0.0,
    interactive: false
  }
}

export default AreaLayer
