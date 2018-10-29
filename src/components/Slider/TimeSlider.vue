<template>
  <vue-slider v-bind="config" v-model="val" ref="slider" @callback="onCallback">
  </vue-slider>
</template>

<script>
import vueSlider from 'vue-slider-component'
import BaseSlider from './BaseSlider'

export default {
  name: 'TimeSlider',
  mixins: [BaseSlider],
  components: { vueSlider },
  props: [
    'times'
  ],
  data () {
    return {
      config: {
        width: '100%',
        height: 4,
        dotSize: 12,
        disabled: false,
        show: true,
        tooltip: 'never',
        piecewise: false,
        data: this.times,
        processStyle: {
          display: 'none'
        }
      }
    }
  },
  watch: {
    times (val) {
      this.config.data = val
      this.$refs.slider.refresh()
    }
  }
}
</script>
