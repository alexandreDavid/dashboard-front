import { Map, TileLayer, Control, CircleMarker } from 'leaflet'

let map
let displayedLayer
let currentLocationMarker
let defaultParams = {
  view: {
    location: [1.384226, 32.640962],
    zoom: 8
  },
  baseLayer: {
    url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    options: {
      maxZoom: 18
    }
  },
  displayedLayer: {
    url: 'http://localhost:8080/geoserver/geonode/wms',
    options: {
      layers: 'geonode:uganda_regions_2014_shp',
      format: 'image/png',
      transparent: true
    }
  }
}
export default {
  setDefaultParams (params) {
    Object.assign(defaultParams, params)
  },
  init (id) {
    map = new Map(id, {
      attributionControl: false,
      zoomControl: false
    }).setView(defaultParams.view.location, defaultParams.view.zoom)

    new TileLayer(defaultParams.baseLayer.url, defaultParams.baseLayer.options).addTo(map)

    this.setDisplayedLayer(defaultParams.displayedLayer.url, defaultParams.displayedLayer.options)

    new Control.Zoom({
      position: 'bottomleft'
    }).addTo(map)
  },
  setDisplayedLayer (layerUrl, options = {}) {
    if (!displayedLayer) {
      displayedLayer = new TileLayer.WMS(layerUrl, options).addTo(map)
    } else {
      displayedLayer.setUrl(layerUrl, true)
      displayedLayer.setParams(options)
    }
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
  zoomToCurrentLocation () {
    map.setView(currentLocationMarker.getLatLng())
  }
}
