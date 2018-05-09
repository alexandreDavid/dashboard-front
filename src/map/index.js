import { Map, TileLayer, CircleMarker } from 'leaflet'

let map
let baseLayer
let displayedLayer
let displayedLayerLegendUrl
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
  },
  displayedLayer: {
    layerUrl: 'http://localhost:8080/geoserver/geonode/wms',
    options: {
      layers: 'geonode:uganda_regions_2014_shp',
      format: 'image/png',
      transparent: true
    },
    legendUrl:
      'http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=geonode:uganda_regions_2014_shp'
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

    this.setDisplayedLayer(
      defaultParams.displayedLayer.layerUrl,
      defaultParams.displayedLayer.options,
      defaultParams.displayedLayer.legendUrl
    )
  },
  setBaseMapLayer (layerUrl, options = {}) {
    if (!baseLayer) {
      baseLayer = new TileLayer.WMS(layerUrl, options).addTo(map)
    } else {
      baseLayer.setUrl(layerUrl, true)
      baseLayer.setParams(options)
    }
  },
  setDisplayedLayer (layerUrl, options = {}, legendUrl) {
    // Remove and add to activate the addlayer event
    if (displayedLayer) {
      displayedLayer.remove()
    }
    displayedLayerLegendUrl = legendUrl
    displayedLayer = new TileLayer.WMS(layerUrl, options).addTo(map)
  },
  getDisplayedLayerLegendUrl () {
    return displayedLayerLegendUrl
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
