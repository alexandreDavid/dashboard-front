<template>
  <div id="time-slot" class="w-100">
    <div class="d-flex">
      <button type="button" id="time-slot-previous" class="btn btn-secondary shadow" @click="previous()"><font-awesome-icon icon="caret-left" /></button>
      <div class="flex-grow-1 pl-2 pr-2">
        <select v-model="currentIndex" class="form-control w-100 shadow" @change="goToTime(currentIndex)">
          <option v-for="(time, i) in value.times" :key="i" v-bind:value="i">{{getTimeFormated(time)}}</option>
        </select>
      </div>
      <div>
        <button type="button" id="time-slot-next" class="btn btn-secondary shadow" @click="next()"><font-awesome-icon icon="caret-right" /></button>
      </div>
    </div>
  </div>
</template>

<script>
import TimeSlotCommon from './TimeSlotCommon'

export default {
  name: 'TimeSlotMobile',
  mixins: [TimeSlotCommon],
  methods: {
    previous () {
      if (this.currentIndex > 0) {
        this.currentIndex--
        this.goToTime(this.currentIndex)
      }
    },
    next () {
      if (this.currentIndex < this.value.times.length - 1) {
        this.currentIndex++
        this.goToTime(this.currentIndex)
      }
    },
    getTimeFormated (time) {
      let formatedDate
      if (this.value.type === 'interval') {
        const startDate = new Date(time.startTime * 1000)
        const endDate = new Date(time.endTime * 1000)
        formatedDate = `${startDate.toDateString()} ${('0' + startDate.getHours()).slice(-2)}:${('0' + startDate.getMinutes()).slice(-2)} - ${('0' + endDate.getHours()).slice(-2)}:${('0' + endDate.getMinutes()).slice(-2)}`
      } else {
        const date = new Date(time * 1000)
        formatedDate = date.toDateString()
      }
      return formatedDate
    }
  }
}
</script>
