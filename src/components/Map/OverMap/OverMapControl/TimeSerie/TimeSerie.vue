<template>
  <div class="w-100" v-if="times && times.length">
    <div class="d-flex align-items-end">
      <div class="mr-1">
        <play-button v-model="val" v-bind:times="times" :wait-load="waitLoad"></play-button>
      </div>
      <div class="flex-grow-1">
        <TimeSlider v-model="val" v-bind:times="times"></TimeSlider>
        <div class="text-center" style="font-size: 0.8em">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeSlider from '@/components/Slider/TimeSlider'
import PlayButton from './PlayButton'

export default {
  name: 'TimeSerie',
  components: {
    TimeSlider, PlayButton
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  props: ['value', 'times', 'layer'],
  methods: {
    async waitLoad () {
      return new Promise((resolve) => {
        this.layer._layer.once('load', () => {
          resolve()
        })
      })
    }
  }
}
</script>
