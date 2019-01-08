import axios from 'axios'
import { GeoJSON, Circle, FeatureGroup } from 'leaflet'

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
      let featureGroup = new FeatureGroup()
      new GeoJSON(area.geom).eachLayer((layer) => {
        if (layer.feature.properties.radius) {
          layer = new Circle([layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]], {radius: layer.feature.properties.radius})
        }
        layer.setStyle(AreaLayer.getAreaLayerStyle())
        featureGroup.addLayer(layer)
      })
      this._areaLayer = featureGroup
    } else {
      let areaData
      if (area.id !== 7552 || !ugandaArea) {
        areaData = await axios.get(
          `${process.env.GEOSERVER_URL}/boundaries/ows`, {
            params: AreaLayer.getAreaRequestParams(area)
          }
        )
        if (area.id === 7552) {
          ugandaArea = areaData
        }
      } else {
        areaData = ugandaArea
      }
      this.setSubAreas(area)
      this._areaLayer = new GeoJSON(areaData.data, AreaLayer.getAreaLayerStyle())
    }
    if (this._map) {
      this._areaLayer.addTo(this._map)
      this.zoomToArea()
    }
    this._isReady = true
  }
  async setSubAreas (area) {
    try {
      let areaData
      if (area.id !== 7552 || !ugandaSubAreas) {
        areaData = await axios.get(
          `${process.env.GEOSERVER_URL}/boundaries/ows`, {
            params: {
              service: 'WFS',
              version: '1.1.0',
              request: 'GetFeature',
              typeName: `boundaries:boundaries_uganda`,
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
    } catch (error) {
      console.error(`Sub-area error: ${error}`)
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
    let features = []
    if (this._areaLayer) {
      this._areaLayer.eachLayer((layer) => {
        let geoJSON = layer.toGeoJSON()
        // Non-official GeoJSON format for the Circle: https://gist.github.com/virtualandy/1233401
        if (layer.getRadius) {
          geoJSON.geometry.type = 'Circle'
          geoJSON.geometry.radius = layer.getRadius()
        }
        features.push(geoJSON)
      })
    }
    return {
      type: 'FeatureCollection',
      features
    }
  }
}

AreaLayer.getAreaRequestParams = (area) => {
  return {
    service: 'WFS',
    version: '1.1.0',
    request: 'GetFeature',
    typeName: `boundaries:boundaries_uganda`,
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
