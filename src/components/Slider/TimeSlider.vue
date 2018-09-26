<template>
  <vue-slider v-bind="config" v-model="val" ref="slider" @callback="onCallback">
    <template slot="label" slot-scope="{ label, active }">
      <span :class="['vue-slider-piecewise-label', { active: val === label }]">
        {{ `${getDate(label)}/${getDateMonth(label)}` }}
      </span>
    </template>
    <template slot="tooltip" slot-scope="tooltip">
      <div class="vue-slider-tooltip" v-if="tooltip.value">
        {{ `${getDate(tooltip.value)}/${getDateMonth(tooltip.value)}` }}
      </div>
    </template>
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
    'model'
  ],
  data () {
    return {
      config: {
        width: '100%',
        height: 8,
        dotSize: 20,
        disabled: false,
        show: true,
        tooltip: 'hover',
        piecewise: true,
        data: this.model.times,
        style: {
          marginBottom: '30px',
          maxWidth: `${this.model.times.length * 50}px`
        },
        processStyle: {
          display: 'none'
        }
      }
    }
  },
  methods: {
    getDate (date) {
      return new Date(date * 1000).getDate()
    },
    getDateMonth (date) {
      const month = new Date(date * 1000).getMonth() + 1
      return (month < 10) ? `0${month}` : month
    }
  }
}
</script>
