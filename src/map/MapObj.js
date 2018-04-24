import { Map, TileLayer, Control } from 'leaflet'

let map
export var MapObj = {
  init (id) {
    map = new Map(id, {
      attributionControl: false,
      zoomControl: false
    }).setView([1.384226, 32.640962], 8)
    new TileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map)

    new Control.Zoom({
      position: 'topright'
    }).addTo(map)
  }
}
