<template>
  <div class="position-relative d-flex align-items-center" :class="{'mb-3': legend.range}">
    <div class="mr-1 label">{{ legend.values[0].name }}</div>
    <div class="gradient flex-grow-1 position-relative" v-bind:style="{ background: getGradientColor(legend.values) }">
      <div v-if="legend.range" class="position-absolute range" v-bind:style="calculateRangePlacement(legend)">
        <div class="position-absolute range-label min d-flex flex-row-reverse">
          <div class="range-bar"></div>
          <div class="pr-1">{{ legend.range.min.name }}</div>
        </div>
        <div class="position-absolute range-label max d-flex">
          <div class="range-bar"></div>
          <div class="pl-1">{{ legend.range.max.name }}</div>
        </div>
      </div>
    </div>
    <div class="ml-1 label">{{ legend.values[legend.values.length - 1].name }}</div>
  </div>
</template>

<script>
import LegendUtils from '@/utils/legend'
export default {
  name: 'LegendGradient',
  props: {
    legend: {
      type: Object,
      required: true
    }
  },
  methods: {
    getGradientColor (values) {
      return LegendUtils.getGradientColor(values)
    },
    calculateRangePlacement (legend) {
      const firstValue = legend.values[0].value
      const lastValue = legend.values[legend.values.length - 1].value
      return {
        left: `${(legend.range.min.value - firstValue) / (lastValue - firstValue) * 100}%`,
        width: `${(legend.range.max.value - legend.range.min.value) / (lastValue - firstValue) * 100}%`
      }
    }
  }
}
</script>
