import axios from 'axios'
import { GeoJSON } from 'leaflet'

let ugandaArea = false
let ugandaSubAreas = false

let AreaLayer = class {
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
    if (this._areaLayer) {
      this._areaLayer.remove()
    }
    this._areaLayer = new GeoJSON(areaData.data, AreaLayer.getAreaLayerStyle())
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
    if (this._subAreasLayer) {
      this._subAreasLayer.remove()
    }
    this._subAreasLayer = new GeoJSON(areaData.data, AreaLayer.getSubAreaLayerStyle())
    if (this._map) {
      this._subAreasLayer.addTo(this._map)
    }
  }
  zoomToArea () {
    this._map.fitBounds(this._areaLayer.getBounds())
  }
  isReady () {
    return this._isReady
  }
  addTo (map) {
    this._areaLayer.addTo(map)
    this._subAreasLayer.addTo(map)
  }
  zoomTo (map) {
    map.fitBounds(this._areaLayer.getBounds())
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
