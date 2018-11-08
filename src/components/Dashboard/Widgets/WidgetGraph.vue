<template>
  <Graph v-if="resource" v-bind:area="area" v-bind:parameter="resource" v-bind:graphType="graphType"></Graph>
</template>

<script>
import GeoResources from '@/store/geoResources'

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
  data () {
    return {
      resource: false
    }
  },
  mounted () {
    this.resource = GeoResources.searchById(this.parameter.id)
  },
  watch: {
    parameter (newParam) {
      this.resource = GeoResources.searchById(newParam.id)
    }
  }
}
</script>
