<template>
  <vue-slider v-bind="config" v-model="val" ref="slider" @callback="onCallback">
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
  name: 'ElevationSlider',
  components: { vueSlider },
  props: {
    value: {
      type: [String, Number, Array, Object],
      default: 0
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {}
    }
  },
  data () {
    return {
      config: {
        value: 0,
        width: 4,
        height: 300,
        dotSize: 22,
        eventType: 'auto',
        min: 0,
        max: 100,
        interval: 1,
        disabled: false,
        show: true,
        tooltip: 'always',
        piecewise: false,
        style: {
          display: 'inline-block'
        },
        direction: 'vertical',
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
  methods: {
    onCallback: debounce(function (val) {
      this.$emit('change', val)
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
