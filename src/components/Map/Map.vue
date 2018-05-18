<template>
    <div id="map">
      <div id="map-container"></div>
      <TopContent v-if="mapInitialised"/>
      <BottomContent v-if="mapInitialised"/>
      <Popup v-if="mapInitialised"/>
    </div>
</template>

<script>
import MapObj from '@/store/map'
import TopContent from './TopContent/TopContent'
import BottomContent from './BottomContent/BottomContent'
import Popup from './Popup'

export default {
  name: 'Map',
  components: {
    TopContent,
    BottomContent,
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
