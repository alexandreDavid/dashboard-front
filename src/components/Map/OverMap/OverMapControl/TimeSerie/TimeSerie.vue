<template>
  <div id="time-serie" class="w-100">
    <TimeSlot class="d-none d-sm-block" v-if="activeModel && activeModel.type === 'interval'" @change="onChange" v-model="value"></TimeSlot>
    <TimeSlider class="d-none d-sm-block" v-if="activeModel && activeModel.type === 'date'" v-model="activeTime" @input="onChange" v-bind:model="activeModel"></TimeSlider>
    <TimeSlotMobile class="d-block d-sm-none" @change="onChange" v-model="value"></TimeSlotMobile>
  </div>
</template>

<script>
import TimeSlot from './TimeSlot'
import TimeSlider from '@/components/Slider/TimeSlider'
import TimeSlotMobile from './TimeSlotMobile'

export default {
  name: 'TimeSerie',
  props: ['value'],
  components: {
    TimeSlot,
    TimeSlider,
    TimeSlotMobile
  },
  watch: {
    value: 'changeSelectedModel'
  },
  data () {
    return {
      activeModel: false,
      activeTime: false,
      activeIndex: false
    }
  },
  mounted () {
    this.changeSelectedModel(this.value)
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
    },
    changeSelectedModel (model) {
      this.activeModel = model
      if (model.type === 'date') {
        this.activeTime = model.times[model.times.length - 1]
        this.onChange(this.activeTime)
      }
    }
  }
}
</script>
