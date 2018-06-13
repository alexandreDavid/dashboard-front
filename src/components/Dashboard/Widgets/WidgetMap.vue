<template>
  <div :id="mapId" class="map-container-widget">
    <div class="over-map">
      <div class="row mb-2 justify-content-end over-map-control">
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

let map

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
      isLoaded: false
    }
  },
  computed: {
    mapId() {
      return `map-container-widget${this.widgetKey}`
    }
  },
  provide: function () {
    return {
      getMap: this.getMap
    }
  },
  mounted() {
    map = new MapObj(this.mapId)
    AreaLayer.setSelectedArea(this.area, map)
    DisplayedLayer.setDisplayedLayer(map, this.parameter.layerUrl, this.parameter.layerParameters)
    this.isLoaded = true
  },
  methods: {
    getMap () {
      return map
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

