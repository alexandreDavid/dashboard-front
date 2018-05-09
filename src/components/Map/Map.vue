<template>
    <div id="map">
      <div id="map-container"></div>
      <TopContent/>
    </div>
</template>

<script>
import MapObj from '@/map'
import TopContent from './TopContent/TopContent'

export default {
  name: 'Map',
  components: {TopContent},
  mounted () {
    MapObj.init('map-container')
  }
}
</script>

<style>
#map, #map-container {
  height: 100%;
  width: 100%;
}
</style>
