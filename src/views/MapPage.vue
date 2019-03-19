<template>
    <div id="map-page" class="d-flex flex-row-reverse">
      <div class="w-100 position-relative flex-grow-1">
        <div id="map-container"></div>
        <OverMap v-if="mapInitialised" @selectedReportedLayer="onSelectedReportedLayer" @selectedParameter="onSelectedParameter" v-bind:selectedParameter="selectedParameter"/>
        <Popup v-if="mapInitialised"/>
        <ReportedLayer v-if="mapInitialised" v-bind:selectedReportedLayer="selectedReportedLayer"/>
      </div>
      <div class="d-none d-sm-block">
        <MapControlBar v-bind:mapIsLoading="!mapInitialised" class="position-relative" @selectedReportedLayer="onSelectedReportedLayer" @selectedParameter="onSelectedParameter" :is-static="true"></MapControlBar>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import MapObj from '@/store/map'
import OverMap from '@/components/Map/OverMap/OverMap'
import Popup from '@/components/Map/Popup'
import DisplayedLayer from '@/store/displayedLayer'
import ReportedLayer from '@/components/Map/ReportedLayer/ReportedLayer'
import MapControlBar from '@/components/Map/MapControlBar'
import AreaLayer from '@/store/areaLayer'

import SelectedLayers from '@/store/selectedLayers'

export default {
  name: 'MapPage',
  components: {
    OverMap,
    Popup,
    ReportedLayer,
    MapControlBar
  },
  computed: {
    ...mapState({
      activeBaseMap: state => state.baseMaps.active
    }),
    ...mapGetters('areas', ['activeArea'])
  },
  provide () {
    return {
      getMap: this.getMap,
      getDisplayedLayer: this.getDisplayedLayer,
      getAreaLayer: this.getAreaLayer,
      getSelectedReportedLayer: this.getSelectedReportedLayer
    }
  },
  data () {
    return {
      map: false,
      mapInitialised: false,
      displayedLayer: false,
      areaLayer: false,
      selectedReportedLayer: false,
      selectedParameter: false
    }
  },
  async mounted () {
    this.map = new MapObj('map-container')
    this.map.invalidateSize()
    this.displayedLayer = new DisplayedLayer(this.map)
    this.areaLayer = new AreaLayer(this.map)
    try {
      await this.areaLayer.setSelectedArea(this.activeArea)
    } catch (error) {
      console.error(error)
      this.setActiveArea(false)
      this.areaLayer.setSelectedArea(false)
    }
    const layers = await SelectedLayers.getAllSelectedLayers(this.getAreaLayer().toGeoJSON())
    layers.forEach(l => l.addTo(this.getMap()))
    this.mapInitialised = true
  },
  methods: {
    getMap () {
      return this.map
    },
    getDisplayedLayer () {
      return this.displayedLayer
    },
    getAreaLayer () {
      return this.areaLayer
    },
    getSelectedReportedLayer () {
      return this.selectedReportedLayer
    },
    onSelectedReportedLayer (selectedReportedLayer) {
      this.selectedReportedLayer = selectedReportedLayer
    },
    onSelectedParameter (selectedParameter) {
      this.selectedParameter = selectedParameter
    },
    ...mapActions('areas', ['setActiveArea'])
  },
  watch: {
    activeBaseMap (val) {
      this.map.setBaseMapLayer(val)
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
    // height: 100%;
    // width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
