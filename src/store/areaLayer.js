import axios from 'axios'
import { GeoJSON } from 'leaflet'

let areaLayer

export default {
  async setSelectedArea (area, map) {
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
    if (areaLayer) {
      areaLayer.remove()
    }
    areaLayer = new GeoJSON(areaData.data, {
      weight: 2,
      width: 2,
      color: 'black',
      fillOpacity: 0.0
    }).addTo(map)

    this.zoomToArea(map)
  },
  zoomToArea (map) {
    map.fitBounds(areaLayer.getBounds())
  }
}
