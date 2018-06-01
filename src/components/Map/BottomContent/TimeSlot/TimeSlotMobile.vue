<template>
  <div id="time-slot" class="w-100">
    <div class="d-flex pb-2">
      <button type="button" class="btn btn-secondary shadow" @click="previous()"><font-awesome-icon :icon="iconPrevious" /></button>
      <div class="flex-grow-1 pl-2 pr-2">
        <select v-model="selected" class="form-control w-100 shadow">
          <option disabled value="">Choose</option>
          <option v-for="(time, i) in activeModel.times" :key="i" @click="goToTime(i)">{{getTimeFormated(time)}}</option>
        </select>
      </div>
      <div>
        <button type="button" class="btn btn-secondary shadow" @click="next()"><font-awesome-icon :icon="iconNext" /></button>
      </div>
    </div>
    <div class="btn-group" role="group">
      <button type="button" @click="changeSelectedModel(model)" class="btn btn-secondary" v-for="model in daysModel" :key="model.value" v-bind:class="{active: model.value === activeModel.value}">
        {{model.label}}
      </button>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretLeft from '@fortawesome/fontawesome-free-solid/faCaretLeft'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default {
  name: 'TimeSlotMobile',
  data() {
    const daysModel = [{
        value: 2,
        label: '2 days',
        times: [1527717600, 1527728400, 1527739200, 1527750000, 1527760800, 1527771600, 1527782400, 1527793200, 1527804000, 1527814800, 1527825600, 1527836400, 1527846400]
      }, {
        value: 10,
        label: '10 days',
        times: [1527717600, 1527728400, 1527739200, 1527750000, 1527760800, 1527771600, 1527793200, 1527804000, 1527814800, 1527825600, 1527836400, 1527936400]
      }, {
        value: 90,
        label: '90 days'
      }]
    return {
      daysModel: daysModel,
      activeModel: daysModel[0],
      isPlaying: false,
      currentIndex: 0,
      selected: ''
    }
  },
  components: { FontAwesomeIcon },
  computed: {
    iconPrevious() {
      return faCaretLeft
    },
    iconNext() {
      return faCaretRight
    }
  },
  methods: {
    changeSelectedModel(model) {
      this.activeModel = model
    },
    previous() {
      this.isPlaying = true
      this.activePlay()
    },
    next() {
      this.isPlaying = false
    },
    goToTime(timeIdx) {
      this.isPlaying = false
      this.currentIndex = timeIdx
    },
    getTimeFormated (date) {
      const d = new Date(date * 1000)
      return `${d.toDateString()} ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`
    }
  }
}
</script>

