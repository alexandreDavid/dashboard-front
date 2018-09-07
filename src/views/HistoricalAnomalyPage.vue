<template>
  <div style="height: 400px; position: relative;">
    <FutureClimateGraph v-bind:area="area" v-bind:parameter="parameter"></FutureClimateGraph>  </div>
</template>

<script>
export default {
  name: 'HistoricalAnomalyPage',
  components: {
    FutureClimateGraph: () => ({
      component: import('./FutureClimateGraph')
    })
  },
  props: [
    'area',
    'parameter'
  ]
}
</script>
