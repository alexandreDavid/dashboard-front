<template>
  <vue-slider v-bind="config" v-model="val" ref="slider" @callback="onCallback">
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
