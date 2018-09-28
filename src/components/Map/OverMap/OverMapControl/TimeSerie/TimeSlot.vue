<template>
  <div id="time-slot" class="w-100">
    <div class="mb-4 d-flex">
      <div class="align-middle">
        <button type="button" id="time-play" class="btn btn-secondary btn-sm" @click="play" v-show="!isPlaying"><font-awesome-icon icon="play" /></button>
        <button type="button" id="time-pause" class="btn btn-secondary btn-sm" @click="pause" v-show="isPlaying"><font-awesome-icon icon="pause" /></button>
      </div>
      <div class="flex-grow-1 d-flex align-middle position-relative ml-3 mr-3">
        <div class="time-slot with-indicator flex-fill" v-for="(time, i) in model.times" :key="i" @click="goToTime(i)">
          <div class="time-slot-content h-100"></div>
          <small class="time-slot-indicator">
            <div>{{getDateDay(time.startTime)}}</div>
            <div>{{getDate(time.startTime)}}</div>
            <div>{{getDateHour(time.startTime)}}</div>
          </small>
        </div>
        <div class="time-slot with-indicator">
          <small class="time-slot-indicator">
            <div>{{getDateDay(model.times[model.times.length - 1].endTime)}}</div>
            <div>{{getDate(model.times[model.times.length - 1].endTime)}}</div>
            <div>{{getDateHour(model.times[model.times.length - 1].endTime)}}</div>
          </small>
        </div>
        <div class="time-slot position-absolute current-time" :style="calculateCurrentPlacement()">
          <div class="bg-primary h-100 w-100">
          </div>
        </div>
        <div class="time-slot position-absolute now" :style="calculateNowPlacement()">
          <div class="h-100 w-100 text-center now-content">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeSlotCommon from './TimeSlotCommon'

export default {
  name: 'TimeSlot',
  mixins: [TimeSlotCommon],
  data () {
    return {
      activeDateDuration: 1500
    }
  },
  methods: {
    play () {
      this.isPlaying = true
      this.activePlay()
    },
    pause () {
      this.isPlaying = false
    },
    activePlay () {
      if (this.currentIndex < (this.model.times.length - 1)) {
        this.currentIndex++
        this.afterSelect()
        setTimeout(() => {
          if (this.isPlaying) {
            this.activePlay()
          }
        }, this.activeDateDuration)
      } else {
        this.pause()
      }
    },
    getTransformValues (idx) {
      const translateValue = `translateX(${100 * idx}%)`
      return {
        transform: translateValue,
        WebkitTransform: translateValue,
        msTransform: translateValue,
        width: `${100 / (this.model.times.length - 1)}%`
      }
    },
    calculateNowPlacement () {
      let now = Date.now() / 1000
      let nowIndex = this.model.times.findIndex(time => now < time.startTime)
      if (nowIndex !== -1) {
        return this.getTransformValues(nowIndex - 1)
      } else {
        return {
          display: 'none'
        }
      }
    },
    calculateCurrentPlacement () {
      return this.getTransformValues(this.currentIndex)
    }
  }
}
</script>
