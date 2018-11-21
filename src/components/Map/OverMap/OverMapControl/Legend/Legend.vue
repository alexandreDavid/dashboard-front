<template>
  <div class="position-relative" v-if="legend">
    <legend-gradient class="legend-type" v-if="legend.type === 'gradient'" v-bind:legend="legend"></legend-gradient>
    <legend-discrete class="legend-type" v-if="legend.type === 'discrete'" v-bind:legend="legend"></legend-discrete>
  </div>
</template>

<script>
import { LegendGradient, LegendDiscrete } from './type'

export default {
  name: 'Legend',
  props: [ 'legend' ],
  components: { LegendGradient, LegendDiscrete }
}
</script>
