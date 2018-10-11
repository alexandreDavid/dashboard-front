<template>
  <vue-slider v-bind="config" v-model="val" ref="slider" @callback="onCallback">
    <template slot="tooltip" slot-scope="tooltip">
      <div class="vue-slider-tooltip" v-if="tooltip.value">
        {{ `${tooltip.value} %` }}
      </div>
    </template>
  </vue-slider>
</template>

<script>
import vueSlider from 'vue-slider-component'
import BaseSlider from './BaseSlider'

export default {
  name: 'OpacitySlider',
  mixins: [BaseSlider],
  components: { vueSlider },
  data () {
    return {
      config: {
        width: 5,
        height: 4,
        dotSize: 12,
        eventType: 'auto',
        min: 0,
        max: 100,
        interval: 1,
        disabled: false,
        show: true,
        tooltip: 'hover',
        piecewise: false
      }
    }
  }
}
</script>
