<template>
  <div style="height: 400px; position: relative;">
    <Graph v-if="parameter" v-bind:area="area" v-bind:parameter="parameter"></Graph>  </div>
</template>

<script>

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
