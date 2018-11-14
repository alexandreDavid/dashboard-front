import axios from 'axios'
import { GeoJSON, Circle } from 'leaflet'

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
    this.remove()
    if (!area) {
      return
    }
    if (area.type === 'custom') {
      if (area.radius) {
        this._areaLayer = new Circle([area.geom.geometry.coordinates[1], area.geom.geometry.coordinates[0]], {radius: area.radius})
        this._areaLayer.setStyle(AreaLayer.getAreaLayerStyle())
      } else {
        this._areaLayer = new GeoJSON(area.geom, AreaLayer.getAreaLayerStyle())
      }
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
      this._areaLayer = new GeoJSON(areaData.data, AreaLayer.getAreaLayerStyle())
    }
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
  add () {
    if (this._areaLayer) {
      this._areaLayer.addTo(this._map)
    }
    if (this._subAreasLayer) {
      this._subAreasLayer.addTo(this._map)
    }
  }
  remove () {
    if (this._areaLayer) {
      this._areaLayer.remove()
      this._areaLayer = false
    }
    if (this._subAreasLayer) {
      this._subAreasLayer.remove()
      this._subAreasLayer = false
    }
  }
  toGeoJSON () {
    let geoJSON
    if (this._areaLayer) {
      geoJSON = this._areaLayer.toGeoJSON()
      // Non-official GeoJSON format for the Circle: https://gist.github.com/virtualandy/1233401
      if (this._areaLayer.getRadius) {
        geoJSON.geometry.type = 'Circle'
        geoJSON.geometry.radius = this._areaLayer.getRadius()
      }
    }
    return geoJSON
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
