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
  name: 'ElevationSlider',
  mixins: [BaseSlider],
  components: { vueSlider },
  data () {
    return {
      config: {
        value: 0,
        width: 5,
        height: 200,
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
        direction: 'vertical'
      }
    }
  }
}
</script>
