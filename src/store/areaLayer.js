import MapObj from '@/store/map'
import axios from 'axios'
import { GeoJSON } from 'leaflet'

let areaLayer

export default {
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
    MapObj.getMap()
    if (areaLayer) {
      areaLayer.remove()
    }
    areaLayer = new GeoJSON(areaData.data, {
      weight: 2,
      width: 2,
      color: 'black',
      fillOpacity: 0.0
    }).addTo(MapObj.getMap())

    this.zoomToArea()
  },
  zoomToArea () {
    MapObj.getMap().fitBounds(areaLayer.getBounds())
  }
}
