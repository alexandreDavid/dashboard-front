<template>
  <div ref="treshold-value" v-if="layer._legend.type === 'gradient'">
    <h6 class="mt-2">
      Treshold value
    </h6>
    <div class="position-relative d-flex align-items-center legend mb-4">
      <div class="mr-1 label">{{ layer._legend.values[0].name }}</div>
      <treshold-value-slider @input="tresholdChanges" :data="allValues" :bgStyle="getBackgroundStyle()" class="flex-grow-1"></treshold-value-slider>
      <div class="ml-1 label">{{ layer._legend.values[layer._legend.values.length - 1].name }}</div>
    </div>
  </div>
</template>

<script>
import LegendUtils from '@/utils/legend'
import TresholdValueSlider from '@/components/Slider/TresholdValueSlider'

export default {
  name: 'TresholdValueControl',
  components: { TresholdValueSlider },
  props: ['layer'],
  data () {
    return {
      allValues: []
    }
  },
  created () {
    this.allValues = this.layer._legend.values
  },
  methods: {
    getBackgroundStyle () {
      return {
        background: LegendUtils.getGradientColor(this.layer._legend.values)
      }
    },
    tresholdChanges (val) {
      // TODO: modify the treshold of the layer
    }
  }
}
</script>
