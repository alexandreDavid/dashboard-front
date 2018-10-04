import axios from 'axios'
import { GeoJSON } from 'leaflet'

let ugandaArea = false
let ugandaSubAreas = false

let AreaLayer = class {
  _area = false
  _areaLayer = false
  _subAreasLayer = false
  _map = false
  _isReady = false

  constructor (map, area) {
    this._map = map
    if (area) {
      this.setSelectedArea(area)
    }
  }
  async setSelectedArea (area) {
    this._area = area
    if (this._areaLayer) {
      this._areaLayer.remove()
    }
    if (this._subAreasLayer) {
      this._subAreasLayer.remove()
    }
    let geom
    if (area.type === 'custom') {
      geom = area.geom.toGeoJSON()
    } else {
      let areaData
      if (area.id !== 7552 || !ugandaArea) {
        areaData = await axios.get(
          `http://18.130.18.23:8180/geoserver/boundaries/ows`, {
            params: AreaLayer.getAreaRequestParams(area)
          }
        )
        if (area.id === 7552) {
          ugandaArea = areaData
        }
      } else {
        areaData = ugandaArea
      }
      await this.setSubAreas(area)
      geom = areaData.data
    }
    this._areaLayer = new GeoJSON(geom, AreaLayer.getAreaLayerStyle())
    if (this._map) {
      this._areaLayer.addTo(this._map)
      this.zoomToArea()
    }
    this._isReady = true
  }
  async setSubAreas (area) {
    let areaData
    if (area.id !== 7552 || !ugandaSubAreas) {
      areaData = await axios.get(
        `http://18.130.18.23:8180/geoserver/boundaries/ows`, {
          params: {
            service: 'WFS',
            version: '1.1.1',
            request: 'GetFeature',
            typeName: `boundaries:area`,
            outputFormat: 'application/json',
            cql_filter: `idparent = ${area.id}`
          }
        }
      )
      if (area.id === 7552) {
        ugandaSubAreas = areaData
      }
    } else {
      areaData = ugandaSubAreas
    }
    this._subAreasLayer = new GeoJSON(areaData.data, AreaLayer.getSubAreaLayerStyle())
    if (this._map) {
      this._subAreasLayer.addTo(this._map)
    }
  }
  zoomToArea () {
    if (this._areaLayer && this._areaLayer.getBounds().isValid()) {
      this._map.fitBounds(this._areaLayer.getBounds())
    }
  }
  isReady () {
    return this._isReady
  }
  addTo (map) {
    this._areaLayer.addTo(map)
    this._subAreasLayer.addTo(map)
    this.zoomTo(map)
  }
  zoomTo (map) {
    map.fitBounds(this._areaLayer.getBounds())
  }
  getSelectedArea () {
    return this._area
  }
  show () {
    if (this._areaLayer) {
      this._areaLayer.addTo(this._map)
      this._subAreasLayer.addTo(this._map)
    }
  }
  hide () {
    if (this._areaLayer) {
      this._areaLayer.remove()
      this._subAreasLayer.remove()
    }
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
    color: '#888',
    fillOpacity: 0.0,
    interactive: false
  }
}

AreaLayer.getSubAreaLayerStyle = () => {
  return {
    weight: 2,
    color: '#aaa',
    dashArray: '10,15',
    fillOpacity: 0.0,
    interactive: false
  }
}

export default AreaLayer
