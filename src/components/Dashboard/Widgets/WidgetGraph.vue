<template>
  <div class="card-body p-0 position-relative">
    <div class="graph-container-widget">
      <Graph v-if="isLoaded" v-bind:parameter="resource" v-bind:graphType="graphType" :start-date="startDate" :end-date="endDate"></Graph>
      <Loading v-else></Loading>
    </div>
  </div>
</template>

<script>
import GeoResources from '@/store/geoResources'
import AreaLayer from '@/store/areaLayer'
import SelectedLayer from '@/store/selectedLayer'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'WidgetGraph',
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
    }
  },
  watch: {
    'config.resource': 'getData',
    async area (newArea) {
      this.isLoaded = false
      await this.areaLayer.setSelectedArea(newArea)
      await this.resource.setArea(this.areaLayer.toGeoJSON())
      this.isLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>

.graph-container-widget {
  height: 200px;
  width: 100%;
  overflow: hidden;
}
</style>
