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
import BaseSlider from './BaseSlider'

export default {
  name: 'FutureClimateRangeSlider',
  mixins: [BaseSlider],
  components: { vueSlider },
  data () {
    let allData = []
    const firstYear = 1960
    const lastYear = 2090
    for (let year = firstYear; year <= lastYear; year++) {
      allData.push(year)
    }
    return {
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
        }
      }
    }
  }
}
</script>
