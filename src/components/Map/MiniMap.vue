<template>
  <div class="minimap">
    <div :id="mapId" class="minimap-container">
      <Popup v-if="interactive && isLoaded"/>
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
    'interactive',
    'areaLayer',
    'baseLayer'
  ],
  data () {
    return {
      isLoaded: false,
      map: false,
      displayedLayer: false
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
    this.areaLayer.addTo(this.map)
    this.displayedLayer = new DisplayedLayer(this.map)
    if (this.parameter) {
      this.getDisplayedLayer().setDisplayedLayer(this.parameter)
    }
    if (this.baseLayer) {
      this.map.setBaseMapLayer(this.baseLayer)
    }
    this.isLoaded = true
    this.toggleMapHandlers(this.interactive)
  },
  watch: {
    parameter: {
      handler (newParam) {
        this.getDisplayedLayer().setDisplayedLayer(newParam)
        if (this.areaLayer.isReady()) {
          this.map.invalidateSize()
          this.areaLayer.zoomTo(this.map)
        }
      },
      deep: true
    },
    interactive (val) {
      this.map.invalidateSize()
      this.areaLayer.zoomTo(this.map)
      this.toggleMapHandlers(val)
    }
  },
  methods: {
    toggleMapHandlers (toggle) {
      const handlers = ['boxZoom', 'doubleClickZoom', 'dragging', 'keyboard', 'scrollWheelZoom', 'tap', 'touchZoom']
      handlers.forEach(h => {
        this.map[h] && this.map[h][toggle ? 'enable' : 'disable']()
      })
    },
    getMap () {
      return this.map
    },
    getDisplayedLayer () {
      return this.displayedLayer
    }
  },
  destroyed () {
    this.map.remove()
    delete this.map
    delete this.displayedLayer
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
