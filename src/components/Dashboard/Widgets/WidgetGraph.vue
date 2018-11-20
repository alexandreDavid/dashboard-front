<template>
  <div>
    <Graph v-if="isLoaded" v-bind:parameter="resource" v-bind:graphType="graphType"></Graph>
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
      isLoaded: false
    }
  },
  async mounted () {
    this.areaLayer = new AreaLayer()
    await this.areaLayer.setSelectedArea(this.area)
    this.resource = new SelectedLayer()
    await this.resource.setLayer(GeoResources.searchById(this.parameter.id), this.areaLayer.toGeoJSON())
    this.isLoaded = true
  },
  methods: {
    getAreaLayer () {
      return this.areaLayer
    }
  },
  watch: {
    async parameter (newParam) {
      this.isLoaded = false
      await this.resource.setLayer(GeoResources.searchById(newParam.id), this.areaLayer.toGeoJSON())
      this.isLoaded = true
    },
    async area (newArea) {
      this.isLoaded = false
      await this.areaLayer.setSelectedArea(newArea)
      await this.resource.setArea(this.areaLayer.toGeoJSON())
      this.isLoaded = true
    }
  }
}
</script>
