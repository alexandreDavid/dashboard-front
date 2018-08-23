<template>
  <div style="height: 400px; position: relative;">
    <FutureClimateGraph v-bind:area="area" v-bind:parameter="parameter"></FutureClimateGraph>  </div>
</template>

<script>
import FutureClimateGraph from './FutureClimateGraph'
export default {
  name: 'HistoricalAnomalyPage',
  components: {
    FutureClimateGraph
  },
  props: [
    'area',
    'parameter'
  ]
}
</script>
