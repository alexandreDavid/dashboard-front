<template>
  <div id="time-serie" class="w-100">
    <div class="mb-2">
      <div class="btn-group btn-group-sm" role="group">
        <button type="button" v-if="model.label" @click="changeSelectedModel(model)" class="change-selected-model btn btn-secondary btn-group-sm" v-for="model in daysModel" :key="model.value" v-bind:class="{active: model.value === activeModel.value}">
          {{model.label}}
        </button>
      </div>
    </div>
    <TimeSlot class="d-none d-sm-block" v-if="activeModel && activeModel.type === 'interval'" @change="onChange" v-model="activeIndex" v-bind:model="activeModel"></TimeSlot>
    <TimeSlider class="d-none d-sm-block" v-if="activeModel && activeModel.type === 'date'" v-model="activeTime" @input="onChange" v-bind:model="activeModel"></TimeSlider>
    <TimeSlotMobile class="d-block d-sm-none" @input="onChange" v-model="activeIndex" v-bind:model="activeModel"></TimeSlotMobile>
  </div>
</template>

<script>
import TimeSlot from './TimeSlot'
import TimeSlider from '@/components/Slider/TimeSlider'
import TimeSlotMobile from './TimeSlotMobile'

export default {
  name: 'TimeSerie',
  inject: ['getDisplayedLayer'],
  components: {
    TimeSlot,
    TimeSlider,
    TimeSlotMobile
  },
  data () {
    return {
      daysModel: this.getDisplayedLayer().getTimeModels(),
      activeModel: false,
      activeTime: false,
      activeIndex: false
    }
  },
  created () {
    this.changeSelectedModel(this.daysModel[0])
  },
  methods: {
    onChange (value) {
      this.getDisplayedLayer().setDate(value)
    },
    changeSelectedModel (model) {
      this.activeModel = model
      if (model.type === 'interval') {
        let nowIndex = model.times.findIndex(time => (Date.now() / 1000) < time.endTime)
        this.activeIndex = (nowIndex > -1 ? nowIndex : 0)
        this.onChange(model.times[this.activeIndex])
      } else {
        this.activeTime = model.times[model.times.length - 1]
        this.onChange(this.activeTime)
      }
    }
  }
}
</script>
