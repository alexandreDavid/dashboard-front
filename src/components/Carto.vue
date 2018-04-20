<template>
  <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
  name: 'Carto',
  components: { LMap, LTileLayer, LMarker },
  data () {
    return {
      zoom: 8,
      center: L.latLng(1.384226, 32.640962),
      url:'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(1.384226, 32.640962)
    }
  }
}
</script>

<style>
  #map {
    height: 100%;
    width: 100%;
  }
</style>
