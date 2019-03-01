<template>
  <div class="card-body p-0">
    <div class="d-flex flex-column-reverse widget-container">
      <div class="shadow-top p-1 legend-container">
        <Legend v-bind:legend="displayedLayer._legend"></Legend>
        <div class="border-top mx-2 mt-1" v-if="config.description">
          <pre class="widget-description px-3 py-1 mb-0">{{ config.description }}</pre>
        </div>
      </div>
      <div :id="mapId" class="w-100" v-bind:style="{height: `${mapHeight}px`}">
        <div class="leaflet-control-container">
          <div class="leaflet-top leaflet-left">
            <div class="leaflet-control">
              <time-control class="shadow" @input="setTime" v-model="displayedLayer._time" :times="displayedLayer._availableTimes"></time-control>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import TimeControl from '@/components/Map/DisplayedLayer/TimeControl'

import { CustomVueControl } from '@/components/Map/Leaflet.customVueControl'

import SelectedLayer from '@/store/selectedLayer'
import GeoResources from '@/store/geoResources'
import DefinedAreas from '@/store/definedAreas'

import Vue from 'vue'
import { mapState } from 'vuex'

import HeightMixin from './HeightMixin'

export default {
  name: 'WidgetMap',
  mixins: [ HeightMixin ],
  components: {
    Legend, TimeControl
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
    },
    ...mapState({
      activeBaseMap: state => state.baseMaps.active
    })
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
    this.config.advancedConfig && this.displayedLayer.setOpacity(this.config.advancedOpacity)
    this.displayedLayer.addTo(this.map)
    this.isLoaded = true
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
        template: '<button type="button" class="btn btn-sm btn-secondary shadow" title="Zoom to area" @click="zoomToArea"><font-awesome-icon icon="globe-africa" /></button>'
      }), {position: 'bottomright'})
      areaZoomControl.addTo(this.map)
      areaZoomControl.mountedComponent.$on('zoomToArea', () => {
        this.areaLayer.zoomToArea()
      })
    },
    async setArea () {
      let newArea
      if (this.config.advancedArea) {
        newArea = DefinedAreas.getArea(this.config.advancedArea.id)
      } else {
        newArea = this.area
      }
      await this.areaLayer.setSelectedArea(newArea)
      this.displayedLayer.setArea(this.areaLayer.toGeoJSON())
    },
    setHeightCallback () {
      this.$nextTick(() => {
        if (this.map && this.areaLayer.isReady()) {
          this.map.invalidateSize()
          this.areaLayer.zoomTo(this.map)
        }
      })
    }
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
    area: 'setArea',
    config: {
      handler (val) {
        this.setArea()
        this.displayedLayer.setOpacity(val.advancedConfig ? val.advancedOpacity : false)
      },
      deep: true
    },
    activeBaseMap (val) {
      this.map.setBaseMapLayer(val)
    }
  },
  destroyed () {
    this.map.remove()
  }
}
</script>

<style lang="scss" scoped>

.legend-container {
  z-index: 1000;
}
</style>
