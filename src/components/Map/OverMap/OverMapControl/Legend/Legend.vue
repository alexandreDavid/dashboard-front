<template>
  <div class="position-relative" v-if="legend && legend.values && legend.values.length">
    <legend-gradient v-if="legend.type === 'gradient'" v-bind:legend="legend"></legend-gradient>
    <legend-discrete v-if="legend.type === 'discrete'" v-bind:legend="legend"></legend-discrete>
  </div>
</template>

<script>
import { LegendGradient, LegendDiscrete } from './type'

export default {
  name: 'Legend',
  props: {
    legend: {
      type: Object,
      required: true
    }
  },
  components: { LegendGradient, LegendDiscrete }
}
</script>
