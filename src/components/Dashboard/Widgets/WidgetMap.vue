<template>
  <div class="card-body p-0">
    <div class="d-flex flex-column-reverse widget-container">
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
        <div class="border-top mx-2 mt-1" v-if="config.description">
          <pre class="widget-description px-3 py-1 mb-0">{{ config.description }}</pre>
        </div>
      </div>
        <div :id="mapId" class="map-container-widget">
          <Popup v-if="isLoaded"/>
        </div>
      </div>
  </div>
</template>

<script>
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import Popup from '@/components/Map/Popup'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import TimeSerie from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSerie'

import { CustomVueControl } from '@/components/Map/Leaflet.customVueControl'

import SelectedLayer from '@/store/selectedLayer'
import GeoResources from '@/store/geoResources'

import Vue from 'vue'

export default {
  name: 'WidgetMap',
  components: {
    Popup, Legend, TimeSerie
  },
  props: [
    'area',
    'widgetKey',
    'config'
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
    this.initialiseZoomAreaButton()
    this.displayedLayer = new SelectedLayer()
    await this.displayedLayer.setLayer(GeoResources.searchById(this.config.resource.id), this.areaLayer.toGeoJSON())
    this.displayedLayer.addTo(this.map)
    this.isLoaded = true
  },
  watch: {
    async 'config.resource' (newResource) {
      this.isLoaded = false
      await this.displayedLayer.setLayer(GeoResources.searchById(newResource.id), this.areaLayer.toGeoJSON())
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
    },
    initialiseZoomAreaButton () {
      // Mounting the component by the Leaflet control process
      const areaZoomControl = new CustomVueControl(Vue.component('area-zoom-control', {
        methods: {
          zoomToArea () {
            this.$emit('zoomToArea')
          }
        },
        template: '<button type="button" class="btn btn-sm btn-secondary shadow" @click="zoomToArea"><font-awesome-icon icon="globe-africa" /></button>'
      }), {position: 'bottomright'})
      areaZoomControl.addTo(this.map)
      areaZoomControl.mountedComponent.$on('zoomToArea', () => {
        this.areaLayer.zoomToArea()
      })
    }
  },
  destroyed () {
    this.map.remove()
  }
}
</script>

<style lang="scss" scoped>

.map-container-widget {
  height: 200px;
  width: 100%;
}

.legend-container {
  z-index: 1000;
}
</style>
