<template>
  <div>
    <div :id="mapId" class="map-container-widget rounded-bottom">
      <Popup v-if="isLoaded"/>
    </div>
    <div class="over-map">
      <div class="over-map-bottom over-map-control p-0 shadow-top">
        <Legend class="over-map-control p-1 rounded-bottom" v-if="isLoaded" v-bind:legend="displayedLayer._legend"></Legend>
      </div>
    </div>
  </div>
</template>

<script>
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import Popup from '@/components/Map/Popup'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'

import SelectedLayer from '@/store/selectedLayer'
import GeoResources from '@/store/geoResources'

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
  async mounted () {
    this.map = new MapObj(this.mapId)
    this.areaLayer = new AreaLayer(this.map, this.area)
    this.displayedLayer = new SelectedLayer()
    await this.displayedLayer.setLayer(GeoResources.searchById(this.parameter.id))
    this.displayedLayer.addTo(this.map)
    this.isLoaded = true
  },
  watch: {
    async parameter (newParam) {
      this.isLoaded = false
      await this.displayedLayer.setLayer(GeoResources.searchById(newParam.id))
      this.displayedLayer.addTo(this.map)
      this.$nextTick(() => {
        this.isLoaded = true
      })
    },
    area (newArea) {
      this.areaLayer.setSelectedArea(newArea)
    }
  },
  methods: {
    getMap () {
      return this.map
    },
    getDisplayedLayer () {
      return this.displayedLayer
    }
  },
  destroyed () {
    this.map.remove()
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
