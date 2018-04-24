<template>
    <div id="map"></div>
</template>

<script>
import { MapObj } from '../../map/MapObj'

export default {
  name: 'Map',
  mounted () {
    MapObj.init('map')
  }
}
</script>

<style>

#map {
    height: 100%;
    width: 100%;
  }
</style>
