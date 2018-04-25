<template>
    <div id="map">
    </div>
</template>

<script>
import { MapObj } from '../../map/MapObj'
import SearchLocation from '../SearchLocation/SearchLocation'

export default {
  name: 'Map',
  components: {
    SearchLocation
  },
  mounted () {
    MapObj.init('map')
    MapObj.setDisplayedLayer()
  }
}
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
