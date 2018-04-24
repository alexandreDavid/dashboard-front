<template>
    <div id="map"></div>
</template>

<script>
import { Map, LatLng, TileLayer } from 'leaflet'

// import 'leaflet/dist/leaflet.css'

export default {
  name: 'Map',
  components: { Map, LatLng, TileLayer },
  mounted () {
    const map = new Map('map').setView([1.384226, 32.640962], 8)
    new TileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map)
    this.map = map
  }
}
</script>

<style>

#map {
    height: 100%;
    width: 100%;
  }
</style>
