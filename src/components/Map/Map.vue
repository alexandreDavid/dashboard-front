<template>
    <div id="map">
      <div id="map-container"></div>
      <OverMap v-if="mapInitialised" @selectedReportedLayer="onSelectedReportedLayer"/>
      <Popup v-if="mapInitialised"/>
      <ReportedLayer v-if="mapInitialised" v-bind:selectedReportedLayer="selectedReportedLayer"/>
    </div>
</template>

<script>
import MapObj from '@/store/map'
import OverMap from './OverMap/OverMap'
import Popup from './Popup'
import DisplayedLayer from '@/store/displayedLayer'
import ReportedLayer from './ReportedLayer/ReportedLayer'

export default {
  name: 'Map',
  components: {
    OverMap,
    Popup,
    ReportedLayer
  },
  provide () {
    return {
      getMap: this.getMap,
      getDisplayedLayer: this.getDisplayedLayer,
      getSelectedReportedLayer: this.getSelectedReportedLayer
    }
  },
  data () {
    return {
      map: false,
      mapInitialised: false,
      displayedLayer: false,
      selectedReportedLayer: false
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
    },
    getSelectedReportedLayer () {
      return this.selectedReportedLayer
    },
    onSelectedReportedLayer (selectedReportedLayer) {
      this.selectedReportedLayer = selectedReportedLayer
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
