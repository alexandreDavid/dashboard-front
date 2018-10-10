<template>
    <div id="map-page" class="d-flex">
      <MapControlBar class="flex-shrink-1 d-none d-sm-block position-relative" v-if="mapInitialised" @selectedReportedLayer="onSelectedReportedLayer"></MapControlBar>
      <div class="w-100 position-relative">
        <div id="map-container"></div>
        <OverMap v-if="mapInitialised" @selectedReportedLayer="onSelectedReportedLayer"/>
        <Popup v-if="mapInitialised"/>
        <ReportedLayer v-if="mapInitialised" v-bind:selectedReportedLayer="selectedReportedLayer"/>
      </div>
    </div>
</template>

<script>
import MapObj from '@/store/map'
import OverMap from '@/components/Map/OverMap/OverMap'
import Popup from '@/components/Map/Popup'
import DisplayedLayer from '@/store/displayedLayer'
import ReportedLayer from '@/components/Map/ReportedLayer/ReportedLayer'
import MapControlBar from '@/components/Map/MapControlBar'

export default {
  name: 'MapPage',
  components: {
    OverMap,
    Popup,
    ReportedLayer,
    MapControlBar
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

<style lang="scss" scoped>
#map-page {
  height: 100%;
  width: 100%;
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;

  #map-container {
    height: 100%;
    width: 100%;
  }
}
</style>
