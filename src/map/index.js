import { Map, TileLayer, CircleMarker } from 'leaflet'

let map
let displayedLayer
let currentLocationMarker
let defaultParams = {
  view: {
    location: [1.384226, 32.640962],
    zoom: 8
  },
  baseLayer: {
    layerUrl: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
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
    this.setDefaultMap()
  },
  setDefaultMap () {
    map.setView(defaultParams.view.location, defaultParams.view.zoom)

    new TileLayer(
      defaultParams.baseLayer.layerUrl,
      defaultParams.baseLayer.options
    ).addTo(map)

    this.setDisplayedLayer(
      defaultParams.displayedLayer.layerUrl,
      defaultParams.displayedLayer.options,
      defaultParams.displayedLayer.legendUrl
    )
  },
  setDisplayedLayer (layerUrl, options = {}, legendUrl) {
    if (!displayedLayer) {
      displayedLayer = new TileLayer.WMS(layerUrl, options).addTo(map)
    } else {
      displayedLayer.setUrl(layerUrl, true)
      displayedLayer.setParams(options)
    }
    this.displayedLayerLegendUrl = legendUrl
  },
  displayedLayerLegendUrl: '',
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
