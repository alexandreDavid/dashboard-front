<template>
  <vue-slider v-bind="config" v-model="val" ref="slider" class="treshold-value-slider" @callback="onCallback">
  </vue-slider>
</template>

<script>
import vueSlider from 'vue-slider-component'
import BaseSlider from './BaseSlider'

export default {
  name: 'TresholdValueSlider',
  mixins: [BaseSlider],
  components: { vueSlider },
  props: ['data', 'bgStyle'],
  data () {
    return {
      config: {
        width: 5,
        height: 10,
        dotSize: 0,
        dotWidth: 1,
        dotHeight: 10,
        eventType: 'auto',
        min: 0,
        max: 100,
        interval: 1,
        disabled: false,
        show: true,
        tooltip: 'always',
        tooltipDir: [
          'bottom',
          'bottom'
        ],
        bgStyle: this.bgStyle,
        processStyle: {
          backgroundColor: 'transparent',
          borderRadius: 0
        },
        sliderStyle: [
          {
            backgroundColor: '#888'
          },
          {
            backgroundColor: '#888'
          }
        ],
        piecewise: false,
        data: this.data,
        formatter (value) {
          return value && value.name
        }
      }
    }
  }
}
</script>

<style>
.treshold-value-slider .vue-slider {
  border-radius: 0;
}
</style>
