<template>
    <div id="map">
    </div>
</template>

<script>
import { MapObj } from '../../map/MapObj'

export default {
  name: 'Map',
  mounted () {
    MapObj.init('map')
    MapObj.setDisplayedLayer('http://localhost:8080/geoserver/geonode/wms', {
      layers: 'geonode:uganda_regions_2014_shp',
      format: 'image/png',
      transparent: true
    })
  }
}
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
