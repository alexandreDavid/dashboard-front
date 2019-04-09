<template>
  <div>
    <h6>{{ convertDate(dates[0]) }} - {{ convertDate(dates[1]) }}</h6>
    <vue-slider v-bind="config" v-model="dates" ref="slider" @callback="onCallback">
    </vue-slider>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import BaseSlider from './BaseSlider'
import ChartUtil from '@/utils/chart'

export default {
  name: 'GraphRangeSlider',
  mixins: [BaseSlider],
  components: { vueSlider },
  props: ['data'],
  data () {
    return {
      dates: [],
      config: {
        width: '100%',
        height: 8,
        dotSize: 20,
        disabled: false,
        show: true,
        tooltip: 'hover',
        piecewise: false,
        data: this.data,
        formatter: ChartUtil.convertDate
      }
    }
  },
  mounted () {
    if (this.val) {
      this.dates = this.val
    } else {
      this.dates = [this.data[0], this.data[this.data.length - 1]]
    }
  },
  methods: {
    convertDate (date) {
      return ChartUtil.convertDate(date)
    }
  },
  watch: {
    data (newDates) {
      this.dates = [newDates[0], newDates[newDates.length - 1]]
      this.config.data = newDates
      this.$refs.slider.refresh()
    }
  }
}
</script>
