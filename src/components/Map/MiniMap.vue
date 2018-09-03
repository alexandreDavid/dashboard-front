<template>
  <div class="minimap">
    <div :id="mapId" class="minimap-container">
      <Popup v-if="interactive"/>
    </div>
    <div class="over-map">
      <div v-if="interactive" class="over-map-right over-map-control">
        <img v-bind:src="parameter.legendUrl">
      </div>
    </div>
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
    'minimapKey',
    'interactive'
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
    },
    interactive (val) {
      this.map.invalidateSize()
      this.areaLayer.zoomToArea()
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
