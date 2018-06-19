<template>
  <div :id="mapId" class="map-container-widget">
    <div class="over-map">
      <div class="over-map-right over-map-control">
        <img v-bind:src="parameter.legendUrl">
      </div>
    </div>
    <Popup v-if="isLoaded"/>
  </div>
</template>

<script>
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import DisplayedLayer from '@/store/displayedLayer'
import Popup from '@/components/Map/Popup'

export default {
  name: 'WidgetMap',
  components: {
    Popup
  },
  props: [
    'area',
    'parameter',
    'widgetKey'
  ],
  data() {
    return {
      isLoaded: false,
      map: false,
      displayedLayer: false
    }
  },
  computed: {
    mapId() {
      return `map-container-widget${this.widgetKey}`
    }
  },
  provide: function () {
    return {
      getMap: this.getMap,
      getDisplayedLayer: this.getDisplayedLayer
    }
  },
  mounted() {
    this.map = new MapObj(this.mapId)
    AreaLayer.setSelectedArea(this.area, this.map)
    this.displayedLayer = new DisplayedLayer(this.map, this.parameter.layerUrl, this.parameter.layerParameters)
    this.isLoaded = true
  },
  watch: {
    parameter(newParam) {
      this.getDisplayedLayer().setDisplayedLayer(this.getMap(), newParam.layerUrl, newParam.layerParameters)
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
.map-container-widget {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

