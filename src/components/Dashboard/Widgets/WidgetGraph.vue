<template>
  <Graph v-if="parameter" v-bind:area="area" v-bind:parameter="parameter" v-bind:graphType="graphType"></Graph>
</template>

<script>

export default {
  name: 'WidgetGraph',
  components: {
    Graph: () => import('@/components/Graph/Graph')
  },
  props: [
    'area',
    'parameter',
    'graphType'
  ]
}
</script>
