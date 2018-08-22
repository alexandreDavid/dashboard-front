<template>
  <div :id="mapId" class="minimap-container">
    <!-- <div class="over-map">
      <div class="over-map-right over-map-control">
        <Legend class="over-map-control" v-if="isLoaded && parameter.interactiveLegend"></Legend>
        <img v-bind:src="parameter.legendUrl" v-else>
      </div>
    </div> -->
    <!-- <Popup v-if="isLoaded"/> -->
  </div>
</template>

<script>
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import DisplayedLayer from '@/store/displayedLayer'
import Popup from '@/components/Map/Popup'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'

export default {
  name: 'MiniMap',
  components: {
    Popup, Legend
  },
  props: [
    'area',
    'parameter',
    'minimapKey'
  ],
  data () {
    return {
      isLoaded: false,
      map: false,
      displayedLayer: false,
      areaLayer: false
    }
  },
  computed: {
    mapId () {
      return `minimap-container-${this.minimapKey}`
    }
  },
  provide () {
    return {
      getMap: this.getMap,
      getDisplayedLayer: this.getDisplayedLayer
    }
  },
  mounted () {
    this.map = new MapObj(this.mapId)
    this.areaLayer = new AreaLayer(this.map, {id: 7552})
    this.displayedLayer = new DisplayedLayer(this.map, this.parameter)
    this.isLoaded = true
  },
  watch: {
    parameter: {
      handler (newParam) {
        this.getDisplayedLayer().setDisplayedLayer(newParam)
        this.areaLayer.zoomToArea()
      },
      deep: true
    }
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

<style lang="scss" scoped>
.minimap-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
