<template>
    <div id="map">
      <div id="map-container"></div>
      <TopContent/>
    </div>
</template>

<script>
import MapObj from '@/map/MapObj'
import TopContent from './TopContent/TopContent'

export default {
  name: 'Map',
  components: {TopContent},
  mounted () {
    MapObj.init('map-container')
    MapObj.setDisplayedLayer('http://localhost:8080/geoserver/geonode/wms', {
      layers: 'geonode:uganda_regions_2014_shp',
      format: 'image/png',
      transparent: true
    })
  }
}
</script>

<style>
#map, #map-container {
  height: 100%;
  width: 100%;
}
</style>
