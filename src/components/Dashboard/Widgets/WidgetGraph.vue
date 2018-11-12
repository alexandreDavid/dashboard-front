<template>
  <Graph v-if="resource" v-bind:area="area" v-bind:parameter="resource" v-bind:graphType="graphType"></Graph>
</template>

<script>
import GeoResources from '@/store/geoResources'
import AreaLayer from '@/store/areaLayer'

export default {
  name: 'WidgetGraph',
  components: {
    Graph: () => import('@/components/Graph/Graph')
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
      areaLayer: false
    }
  },
  async mounted () {
    this.areaLayer = new AreaLayer()
    await this.areaLayer.setSelectedArea(this.area)
    this.resource = GeoResources.searchById(this.parameter.id)
  },
  methods: {
    getAreaLayer () {
      return this.areaLayer
    }
  },
  watch: {
    parameter (newParam) {
      this.resource = GeoResources.searchById(newParam.id)
    }
  }
}
</script>
