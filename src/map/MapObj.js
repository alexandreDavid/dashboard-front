import { Map, TileLayer, Control, Marker, Icon } from 'leaflet'

let map
let displayedLayer
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
      position: 'bottomleft'
    }).addTo(map)

    this._setCurrentLocationLayer()
  },
  setDisplayedLayer (layerUrl, options = {}) {
    if (!displayedLayer) {
      displayedLayer = new TileLayer.WMS(layerUrl, options).addTo(map)
    } else {
      displayedLayer.setUrl(layerUrl, true)
      displayedLayer.setParams(options)
    }
  },
  _setCurrentLocationLayer () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        new Marker([position.coords.latitude, position.coords.longitude], {
          icon: new Icon({
            iconUrl: img,
            iconSize: [38, 95],
            iconAnchor: [22, 94]
          })
        }).addTo(map)
      })
    }
  }
}
