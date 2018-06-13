<template>
  <Graph v-if="parameter" v-bind:area="area" v-bind:parameter="parameter"></Graph>
</template>

<script>
import Graph from '@/components/Graph/Graph'

export default {
  name: 'WidgetGraph',
  components: {
    Graph
  },
  props: [
    'area',
    'parameter'
  ]
}
</script>
