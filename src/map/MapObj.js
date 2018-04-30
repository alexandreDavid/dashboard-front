import { Map, TileLayer, Control, Marker, Icon } from 'leaflet'
import img from '../assets/logo.png'

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
      position: 'bottomleft'
    }).addTo(map)

    this._setCurrentLocationLayer()
  },
  setDisplayedLayer () {
    new TileLayer.WMS('http://localhost:8080/geoserver/geonode/wms', {
      layers: 'geonode:uganda_regions_2014_shp',
      format: 'image/png',
      transparent: true
    }).addTo(map)
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
