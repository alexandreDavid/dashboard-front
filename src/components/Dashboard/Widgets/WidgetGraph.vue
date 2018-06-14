<template>
<!-- <div style="
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
"> -->
  <Graph class="widget-graph-container" v-if="parameter" v-bind:area="area" v-bind:parameter="parameter" :ratio="ratio"></Graph>
<!-- </div> -->
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
  ],
  data() {
    return {
      ratio: 1
    }
  },
  mounted() {
    this.ratio = this.calculateRatio()
  },
  methods: {
    calculateRatio() {
      return this.$el.clientHeight / this.$el.clientWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.widget-graph-container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>

