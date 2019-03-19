<template>
  <div class="card-body p-0">
    <div class="d-flex flex-column-reverse widget-container">
      <div class="shadow-top p-1 legend-container">
        <Legend v-bind:legend="selectedLayer._legend"></Legend>
        <div class="border-top mx-2 mt-1" v-if="config.description">
          <div class="widget-description px-3 py-1 mb-0">{{ config.description }}</div>
        </div>
      </div>
      <div :id="mapId" class="w-100" v-bind:style="{height: `${mapHeight}px`}">
        <div class="leaflet-control-container" v-if="selectedLayer._time">
          <div class="leaflet-top leaflet-left">
            <div class="leaflet-control">
              <time-control class="shadow" @input="setTime" v-model="selectedLayer._time" :times="selectedLayer._availableTimes"></time-control>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'

import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import TimeControl from '@/components/Map/DisplayedLayer/TimeControl'

import { CustomVueControl } from '@/components/Map/Leaflet.customVueControl'

import SelectedLayer from '@/store/selectedLayer'
import GeoResources from '@/store/geoResources'

import HeightMixin from './HeightMixin'

export default {
  name: 'WidgetMap',
  mixins: [ HeightMixin ],
  components: {
    Legend, TimeControl
  },
  props: [
    'widgetKey',
    'config'
  ],
  data () {
    return {
      isLoaded: false,
      map: false,
      selectedLayer: false,
      areaLayer: false,
      displayedControl: false,
      unitFamily: false
    }
  },
  computed: {
    mapId () {
      return `map-container-widget${this.widgetKey}`
    },
    ...mapGetters('settings', {
      getActiveKeyById: 'getActiveKeyById'
    }),
    unit () {
      return this.getActiveKeyById(this.unitFamily)
    },
    ...mapState({
      activeBaseMap: state => state.baseMaps.active
    }),
    ...mapGetters('areas', ['getArea'])
  },
  async mounted () {
    this.map = new MapObj(this.mapId)
    this.areaLayer = new AreaLayer(this.map)
    await this.areaLayer.setSelectedArea(this.getArea(this.config.area.id))
    this.initialiseZoomAreaButton()
    this.selectedLayer = new SelectedLayer()
    await this.selectedLayer.setLayer(GeoResources.searchById(this.config.resource.id), this.areaLayer.toGeoJSON())
    this.unitFamily = this.selectedLayer.getUnitFamily()
    this.config.advancedConfig && this.selectedLayer.setOpacity(this.config.advancedOpacity)
    this.selectedLayer.addTo(this.map)
    this.isLoaded = true
  },
  methods: {
    setTime (value) {
      this.selectedLayer.setTime(value)
    },
    initialiseZoomAreaButton () {
      // Mounting the component by the Leaflet control process
      const areaZoomControl = new CustomVueControl(Vue.component('area-zoom-control', {
        methods: {
          zoomToArea () {
            this.$emit('zoomToArea')
          }
        },
        template: '<button type="button" class="btn btn-sm btn-secondary shadow" title="Zoom to area" @click="zoomToArea"><font-awesome-icon :icon="[\'far\', \'square\']" /></button>'
      }), {position: 'bottomright'})
      areaZoomControl.addTo(this.map)
      areaZoomControl.mountedComponent.$on('zoomToArea', () => {
        this.areaLayer.zoomToArea()
      })
    },
    async setArea () {
      await this.areaLayer.setSelectedArea(this.getArea(this.config.area.id))
      this.selectedLayer.setArea(this.areaLayer.toGeoJSON())
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
      await this.selectedLayer.setLayer(GeoResources.searchById(newResource.id), this.areaLayer.toGeoJSON())
      this.selectedLayer.addTo(this.map)
      this.unitFamily = this.selectedLayer.getUnitFamily()
      this.$nextTick(() => {
        this.isLoaded = true
      })
    },
    config: {
      handler (val) {
        this.setArea()
        this.selectedLayer.setOpacity(val.advancedConfig ? val.advancedOpacity : false)
      },
      deep: true
    },
    activeBaseMap (val) {
      this.map.setBaseMapLayer(val)
    },
    unit (val) {
      this.selectedLayer.setUnit(val)
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
