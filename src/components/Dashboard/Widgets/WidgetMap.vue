<template>
  <div class="d-flex flex-column widget-container">
    <div class="flex-grow-1 position-relative">
      <div :id="mapId" class="map-container-widget">
        <Popup v-if="isLoaded"/>
      </div>
    </div>
    <div class="shadow-top p-1 legend-container">
      <div class="d-flex">
        <div class="flex-fill">
          <button class="btn btn-link btn-block" v-if="displayedControl === 'legend'" @click="displayedControl = false">Hide legend</button>
          <button class="btn btn-link btn-block" v-else @click="displayedControl = 'legend'">Show legend</button>
        </div>
        <div class="flex-fill" v-if="isLoaded && displayedLayer.hasTime()">
          <button class="flex-fill btn btn-link btn-block" v-if="displayedControl === 'time'" @click="displayedControl = false">Hide time</button>
          <button class="flex-fill btn btn-link btn-block" v-else @click="displayedControl = 'time'">Show time</button>
        </div>
      </div>
      <Legend v-if="displayedControl === 'legend'" v-bind:legend="displayedLayer._legend"></Legend>
      <time-serie v-if="displayedControl === 'time'" v-model="displayedLayer._time" :times="displayedLayer._availableTimes" @input="setTime"></time-serie>
    </div>
  </div>
</template>

<script>
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import Popup from '@/components/Map/Popup'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import TimeSerie from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSerie'

import SelectedLayer from '@/store/selectedLayer'
import GeoResources from '@/store/geoResources'

export default {
  name: 'WidgetMap',
  components: {
    Popup, Legend, TimeSerie
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
      areaLayer: false,
      displayedControl: false
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
    this.areaLayer = new AreaLayer(this.map)
    await this.areaLayer.setSelectedArea(this.area)
    this.displayedLayer = new SelectedLayer()
    await this.displayedLayer.setLayer(GeoResources.searchById(this.parameter.id), this.areaLayer.toGeoJSON())
    this.displayedLayer.addTo(this.map)
    this.isLoaded = true
  },
  watch: {
    async parameter (newParam) {
      this.isLoaded = false
      await this.displayedLayer.setLayer(GeoResources.searchById(newParam.id), this.areaLayer.toGeoJSON())
      this.displayedLayer.addTo(this.map)
      this.$nextTick(() => {
        this.isLoaded = true
      })
    },
    async area (newArea) {
      await this.areaLayer.setSelectedArea(newArea)
      this.displayedLayer.setArea(this.areaLayer.toGeoJSON())
    }
  },
  methods: {
    getMap () {
      return this.map
    },
    getDisplayedLayer () {
      return this.displayedLayer
    },
    setTime (value) {
      this.displayedLayer.setTime(value)
    }
  },
  destroyed () {
    this.map.remove()
  }
}
</script>

<style lang="scss" scoped>
.widget-container, .map-container-widget {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.legend-container {
  // min-height: 27px;
  z-index: 1000;
}
</style>
