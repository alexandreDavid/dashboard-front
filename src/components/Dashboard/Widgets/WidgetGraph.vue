<template>
  <div>
    <Graph v-if="isLoaded" v-bind:parameter="resource" v-bind:graphType="graphType" :start-date="startDate" :end-date="endDate"></Graph>
    <Loading v-else></Loading>
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
    'parameter',
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
    await this.getData(this.parameter)
    
    this.isLoaded = true
  },
  methods: {
    getAreaLayer () {
      return this.areaLayer
    },
    async getData (param) {
      this.isLoaded = false
      await this.resource.setLayer(GeoResources.searchById(param.id), this.areaLayer.toGeoJSON())
      const allTimes = this.resource._availableTimes
      let {0 : startDate ,[allTimes.length - 1] : endDate} = allTimes
      this.startDate = startDate
      this.endDate = endDate
      this.isLoaded = true
    }
  },
  watch: {
    parameter: 'getData',
    async area (newArea) {
      this.isLoaded = false
      await this.areaLayer.setSelectedArea(newArea)
      await this.resource.setArea(this.areaLayer.toGeoJSON())
      this.isLoaded = true
    }
  }
}
</script>
