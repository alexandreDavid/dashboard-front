import axios from 'axios'
import { GeoJSON } from 'leaflet'

export default class {
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
      `${process.env.GEOSERVER_URL}/${area.workspaceName}/ows`, {
        params: {
          service: 'WFS',
          version: '1.1.1',
          request: 'GetFeature',
          typeName: `${area.workspaceName}:${area.paramName}`,
          outputFormat: 'application/json'
        }
      }
    )
    if (this._areaLayer) {
      this._areaLayer.remove()
    }
    this._areaLayer = new GeoJSON(areaData.data, {
      weight: 2,
      width: 2,
      color: 'black',
      fillOpacity: 0.0
    }).addTo(this._map)

    this.zoomToArea()
  }
  zoomToArea () {
    this._map.fitBounds(this._areaLayer.getBounds())
  }
}
