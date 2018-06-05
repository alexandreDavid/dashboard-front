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

export default {
  name: 'Map',
  components: {
    OverMap,
    Popup
  },
  data() {
    return {
      mapInitialised: false
    }
  },
  mounted() {
    MapObj.init('map-container')
    this.mapInitialised = true
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
