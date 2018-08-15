<template>
  <vue-slider v-bind="config" v-model="value" ref="slider" @callback="onCallback">
    <template slot="label" slot-scope="{ label, active }">
      <span :class="['vue-slider-piecewise-label', { active }]" v-if="[ 0, 2, 5, 10, 20 ].findIndex(x => x === label) !== -1">
        {{ label ? `-${label} days` : 'Now' }}
      </span>
    </template>
    <template slot="tooltip" slot-scope="tooltip">
      <div class="vue-slider-tooltip" v-if="tooltip.value">
        {{ `-${tooltip.value} days` }}
      </div>
    </template>
  </vue-slider>
</template>

<script>
import vueSlider from 'vue-slider-component'
import { debounce } from 'debounce'

export default {
  name: 'ObservationRangeSlider',
  components: { vueSlider },
  props: ['initDays'],
  data () {
    return {
      value: [],
      config: {
        width: '100%',
        height: 8,
        dotSize: 20,
        min: 0,
        max: 200,
        disabled: false,
        show: true,
        tooltip: 'hover',
        piecewise: true,
        data: [20, 18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.6, 1.2, 1, 0.8, 0.4, 0],
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
    this.value = this.initDays
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
