<template>
  <div style="height: 400px; position: relative;">
    <Graph v-if="parameter" v-bind:area="area" v-bind:parameter="parameter"></Graph>  </div>
</template>

<script>
import MiniMap from '@/components/Map/MiniMap'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

export default {
  name: 'HistoricalAnomalyPage',
  components: {
    Graph: () => import('@/components/Graph/Graph')
  },
  props: [
    'area',
    'parameter'
  ]
}
</script>
