<template>
  <div>
    <div :id="mapId" class="map-container-widget">
      <Popup v-if="isLoaded"/>
    </div>
    <div class="over-map">
      <div class="over-map-bottom over-map-control">
        <Legend class="over-map-control" v-if="isLoaded" asline="true"></Legend>
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
  name: 'WidgetMap',
  components: {
    Popup, Legend
  },
  props: [
    'area',
    'parameter',
    'widgetKey'
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
      return `map-container-widget${this.widgetKey}`
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
    this.areaLayer = new AreaLayer(this.map, this.area)
    this.displayedLayer = new DisplayedLayer(this.map, this.parameter)
    this.isLoaded = true
  },
  watch: {
    parameter (newParam) {
      this.getDisplayedLayer().setDisplayedLayer(newParam)
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
