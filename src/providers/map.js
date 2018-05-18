import { Map, TileLayer, CircleMarker, GeoJSON } from 'leaflet'

let map
let baseLayer
let displayedLayer
let areaLayer
let currentLocationMarker
let defaultParams = {
  view: {
    location: [1.384226, 32.640962],
    zoom: 8
  },
  baseLayer: {
    layerUrl: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
    options: {
      maxZoom: 18
    }
  }
}
export default {
  setDefaultParams (params) {
    Object.assign(defaultParams, params)
  },
  getMap () {
    return map
  },
  init (id) {
    map = new Map(id, {
      attributionControl: false,
      zoomControl: false
    })
    // Need to display the baselayer
    baseLayer = false
    this.setDefaultMap()
  },
  setDefaultMap () {
    map.setView(defaultParams.view.location, defaultParams.view.zoom)

    this.setBaseMapLayer(defaultParams.baseLayer.layerUrl, defaultParams.baseLayer.options)

    if (defaultParams.displayedLayer) {
      this.setDisplayedLayer(
        defaultParams.displayedLayer.layerUrl,
        defaultParams.displayedLayer.options,
        defaultParams.displayedLayer.legendUrl
      )
    }
  },
  setBaseMapLayer (layerUrl, options = {}) {
    if (!baseLayer) {
      baseLayer = new TileLayer.WMS(layerUrl, options).addTo(map)
    } else {
      baseLayer.setUrl(layerUrl, true)
      baseLayer.setParams(options)
    }
  },
  setDisplayedLayer (layerUrl, options = {}) {
    // Remove and add to activate the addlayer event
    if (displayedLayer) {
      displayedLayer.remove()
    }
    displayedLayer = new TileLayer.WMS(layerUrl, options).addTo(map)
  },
  setAreaLayer (geoJson) {
    if (areaLayer) {
      areaLayer.remove()
    }
    areaLayer = new GeoJSON(geoJson, {
      weight: 2,
      width: 2,
      color: 'black',
      fillOpacity: 0.0
    }).addTo(map)
  },
  setCurrentLocationLayer () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          currentLocationMarker = new CircleMarker(
            [position.coords.latitude, position.coords.longitude],
            {
              radius: 5,
              color: '#FFF',
              weight: 1,
              fillColor: '#3388ff',
              fillOpacity: 1
            }
          ).addTo(map)
          resolve(true)
        })
      } else {
        resolve(false)
      }
    })
  },
  zoomToAreaLayer () {
    map.fitBounds(areaLayer.getBounds())
  },
  zoomToCurrentLocation () {
    map.setView(currentLocationMarker.getLatLng())
  }
}
