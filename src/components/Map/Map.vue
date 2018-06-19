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
import DisplayedLayer from '@/store/displayedLayer'

export default {
  name: 'Map',
  components: {
    OverMap,
    Popup
  },
  provide () {
    return {
      getMap: this.getMap,
      getDisplayedLayer: this.getDisplayedLayer
    }
  },
  data () {
    return {
      map: false,
      mapInitialised: false,
      displayedLayer: false
    }
  },
  mounted () {
    this.map = new MapObj('map-container')
    this.mapInitialised = true
    this.displayedLayer = new DisplayedLayer(this.map)
  },
  methods: {
    getMap () {
      return this.map
    },
    getDisplayedLayer () {
      return this.displayedLayer
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
