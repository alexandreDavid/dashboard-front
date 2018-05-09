<template>
    <div id="map">
      <div id="map-container"></div>
      <TopContent v-if="mapInitialised"/>
      <BottomContent v-if="mapInitialised"/>
    </div>
</template>

<script>
import MapObj from '@/map'
import TopContent from './TopContent/TopContent'
import BottomContent from './BottomContent/BottomContent'

export default {
  name: 'Map',
  components: {
    TopContent,
    BottomContent
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
