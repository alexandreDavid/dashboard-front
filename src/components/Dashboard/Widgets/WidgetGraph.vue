<template>
  <div class="card-body p-0 position-relative">
    <div class="graph-container-widget" v-bind:style="{height: `${mapHeight}px`}">
      <Graph v-if="isLoaded" v-bind:parameter="resource" v-bind:graphType="graphType" :start-date="startDate" :end-date="endDate"></Graph>
      <Loading v-else></Loading>
    </div>
    <div class="border-top mx-2 mt-1" v-if="config.description">
      <pre class="widget-description px-3 py-1 mb-0">{{ config.description }}</pre>
    </div>
  </div>
</template>

<script>
import GeoResources from '@/store/geoResources'
import AreaLayer from '@/store/areaLayer'
import SelectedLayer from '@/store/selectedLayer'
import Loading from '@/components/Loading/Loading'

import DefinedAreas from '@/store/definedAreas'

import HeightMixin from './HeightMixin'

export default {
  name: 'WidgetGraph',
  mixins: [ HeightMixin ],
  components: {
    Graph: () => import('@/components/Graph/Graph'),
    Loading
  },
  props: [
    'area',
    'config',
    'graphType'
  ],
  provide () {
    return {
      getAreaLayer: this.getAreaLayer
    }
  },
  data () {
    return {
      resource: false,
      areaLayer: false,
      isLoaded: false,
      startDate: false,
      endDate: false
    }
  },
  async mounted () {
    this.areaLayer = new AreaLayer()
    await this.areaLayer.setSelectedArea(this.area)
    this.resource = new SelectedLayer()
    await this.getData(this.config.resource)
    this.isLoaded = true
  },
  methods: {
    getAreaLayer () {
      return this.areaLayer
    },
    async getData (resource) {
      this.isLoaded = false
      await this.resource.setLayer(GeoResources.searchById(resource.id), this.areaLayer.toGeoJSON())
      const allTimes = this.resource._availableTimes
      let {0: startDate, [allTimes.length - 1]: endDate} = allTimes
      this.startDate = startDate
      this.endDate = endDate
      this.isLoaded = true
    },
    async setArea () {
      let newArea
      if (this.config.advancedArea) {
        newArea = DefinedAreas.getArea(this.config.advancedArea.id)
      } else {
        newArea = this.area
      }
      this.isLoaded = false
      await this.areaLayer.setSelectedArea(newArea)
      await this.areaLayer.setSelectedArea(newArea)
      await this.resource.setArea(this.areaLayer.toGeoJSON())
      this.isLoaded = true
    }
  },
  watch: {
    'config.resource': 'getData',
    area: 'setArea',
    config: {
      handler (val) {
        this.setArea()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>

.graph-container-widget {
  height: 200px;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
