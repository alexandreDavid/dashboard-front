<template>
  <div id="time-serie" class="w-100">
    <TimeSlot class="d-none d-sm-block" v-if="activeModel && activeModel.type === 'interval'" @input="onChange" v-model="val" v-bind:model="activeModel"></TimeSlot>
    <TimeSlider class="d-none d-sm-block" v-if="activeModel && activeModel.type === 'date'" v-model="val" @input="onChange" v-bind:model="activeModel"></TimeSlider>
    <TimeSlotMobile class="d-block d-sm-none" v-if="activeModel" @input="onChange" v-model="val" v-bind:times="activeModel.times"></TimeSlotMobile>
  </div>
</template>

<script>
import TimeSlot from './TimeSlot'
import TimeSlider from '@/components/Slider/TimeSlider'
import TimeSlotMobile from './TimeSlotMobile'

export default {
  name: 'TimeSerie',
  props: ['value', 'activeTime'],
  components: {
    TimeSlot,
    TimeSlider,
    TimeSlotMobile
  },
  computed: {
    val: {
      get () {
        return this.activeTime
      },
      set (val) {}
    }
  },
  watch: {
    value: 'changeSelectedModel'
  },
  data () {
    return {
      activeModel: false,
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
    }
  }
}
</script>
