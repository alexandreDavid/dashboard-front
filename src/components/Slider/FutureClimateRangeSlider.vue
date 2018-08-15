<template>
  <vue-slider v-bind="config" v-model="value" ref="slider" @callback="onCallback">
    <template slot="label" slot-scope="{ label, active }">
      <span :class="['vue-slider-piecewise-label', { active }]" v-if="label % 10 === 0">
        {{ label }}
      </span>
    </template>
    <template slot="tooltip" slot-scope="tooltip">
      <div class="vue-slider-tooltip" v-if="tooltip.value">
        {{ tooltip.value }}
      </div>
    </template>
  </vue-slider>
</template>

<script>
import vueSlider from 'vue-slider-component'
import { debounce } from 'debounce'

export default {
  name: 'FutureClimateRangeSlider',
  components: { vueSlider },
  props: ['initDays'],
  data () {
    let allData = []
    const firstYear = 1960
    const lastYear = 2090
    for (let year = firstYear; year <= lastYear; year++) {
      allData.push(year)
    }
    return {
      value: [],
      config: {
        width: '100%',
        height: 8,
        dotSize: 20,
        disabled: false,
        show: true,
        tooltip: 'hover',
        piecewise: true,
        data: allData,
        style: {
          marginBottom: '30px'
        },
        bgStyle: {
          backgroundColor: '#fff',
          boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
        },
        sliderStyle: [{
          backgroundColor: 'var(--primary)'
        }, {
          backgroundColor: 'var(--primary)'
        }],
        tooltipStyle: [{
          backgroundColor: '#ccc',
          borderColor: '#ccc'
        }, {
          backgroundColor: '#ccc',
          borderColor: '#ccc'
        }],
        processStyle: {
          backgroundColor: 'var(--secondary)'
        }
      }
    }
  },
  mounted () {
    this.value = [2040, 2060]
  },
  methods: {
    onCallback: debounce(function (val) {
      this.$emit('change', [val[0], val[1]])
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
.vue-slider-piecewise-label {
  &.active {
    color: var(--primary);
    font-weight: bold;
  }
}
.vue-slider-tooltip {
  background-color: var(--primary);
  border-color: var(--primary);
}
</style>
