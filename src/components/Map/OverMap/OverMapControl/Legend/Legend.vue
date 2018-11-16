<template>
  <div class="legend-displaying" v-if="legend && legend.values && legend.values.length">
    <div class="position-relative d-flex align-items-center" :class="{'mb-3': legend.range}">
      <div class="mr-1 label">{{ legend.values[0].name }}</div>
      <div class="gradient flex-grow-1 position-relative" v-bind:style="{ background: getGradientColor(legend.values) }">
        <div v-if="legend.range" class="position-absolute range" v-bind:style="calculateRangePlacement(legend)">
          <div class="position-absolute pr-1 range-label min">{{ legend.range.min.name }}</div>
          <div class="position-absolute pl-1 range-label max">{{ legend.range.max.name }}</div>
        </div>
      </div>
      <div class="ml-1 label">{{ legend.values[legend.values.length - 1].name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Legend',
  props: [
    'legend'
  ],
  methods: {
    getGradientColor (values) {
      return `linear-gradient(to right, ${values.map(d => this.convertHex(d.color)).join(', ')})`
    },
    convertHex (hex) {
      const r = parseInt(hex.substring(1, 3), 16)
      const g = parseInt(hex.substring(3, 5), 16)
      const b = parseInt(hex.substring(5, 7), 16)
      return `rgba(${r}, ${g}, ${b})`
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

<style lang="scss" scoped>

.legend-displaying {
  position: relative;

  .gradient {
    height: 10px;
  }

  .label {
    font-size: 0.8em;
  }

  .range {
    border-left: 2px solid #888;
    border-right: 2px solid #888;
    height: 30px;

    .range-label {
      font-size: 0.7em;
      width: max-content;
      bottom: 0;
      border-bottom: 2px solid #888;

      &.min {
        right: 100%;
      }
      &.max {
        left: 100%;
      }
    }
  }
}
</style>
