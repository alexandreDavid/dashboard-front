<template>
    <div id="map">
      <div id="map-container"></div>
      <OverMap v-if="mapInitialised"/>
      <Popup v-if="mapInitialised"/>
    </div>
</template>

<script>
import MapObj from '@/store/map'
import OverMap from './OverMap/OverMap'
import Popup from './Popup'

let map

export default {
  name: 'Map',
  components: {
    OverMap,
    Popup
  },
  provide: function () {
    return {
      getMap: this.getMap
    }
  },
  data() {
    return {
      mapInitialised: false
    }
  },
  mounted() {
    map = new MapObj('map-container')
    this.mapInitialised = true
  },
  methods: {
    getMap () {
      return map
    }
  }
}
</script>

<style>
#map,
#map-container {
  height: 100%;
  width: 100%;
}
</style>
