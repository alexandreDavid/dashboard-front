<template>
  <Graph v-if="ressource" v-bind:area="area" v-bind:parameter="ressource" v-bind:graphType="graphType"></Graph>
</template>

<script>
import GeoRessources from '@/store/geoRessources'

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
      ressource: false
    }
  },
  mounted () {
    this.ressource = GeoRessources.searchByName(this.parameter.label)
  },
  watch: {
    parameter (newParam) {
      this.ressource = GeoRessources.searchByName(newParam.label)
    }
  }
}
</script>
