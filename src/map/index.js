import { Map, TileLayer, Control, CircleMarker } from 'leaflet'

let map
let displayedLayer
let currentLocationMarker
export default {
  init (id) {
    map = new Map(id, {
      attributionControl: false,
      zoomControl: false
    }).setView([1.384226, 32.640962], 8)
    new TileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map)

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
