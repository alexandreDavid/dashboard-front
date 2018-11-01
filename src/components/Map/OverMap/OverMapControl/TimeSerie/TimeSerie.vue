<template>
  <div id="time-slot" class="w-100" v-if="value._availableTimes && value._availableTimes.length">
    <div class="d-flex align-items-end" v-if="isLoaded">
      <div class="mr-1">
        <button type="button" id="time-play" class="btn btn-secondary btn-sm" @click="play" v-show="!isPlaying"><font-awesome-icon icon="play" /></button>
        <button type="button" id="time-pause" class="btn btn-secondary btn-sm" @click="pause" v-show="isPlaying"><font-awesome-icon icon="pause" /></button>
      </div>
      <div class="flex-grow-1">
        <TimeSlider class="d-none d-sm-block" v-model="currentTime" @input="onChange" v-bind:times="value._availableTimes"></TimeSlider>
        <div class="text-center" style="font-size: 0.8em">{{ getTimeFormated(currentTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeSlider from '@/components/Slider/TimeSlider'

export default {
  name: 'TimeSerie',
  components: {
    TimeSlider
  },
  props: [
    'value'
  ],
  data () {
    return {
      isLoaded: false,
      activeDateDuration: 1500,
      isPlaying: false,
      currentIndex: 0,
      currentTime: false
    }
  },
  created () {
    this.currentTime = this.value.geoRessource.time
    this.isLoaded = true
  },
  methods: {
    goToTime (timeIdx) {
      this.isPlaying = false
      this.currentIndex = timeIdx
      this.afterSelect()
    },
    afterSelect () {
      this.currentTime = this.value._availableTimes[this.currentIndex]
      this.$emit('input', this.currentTime)
    },
    play () {
      this.currentIndex = this.value._availableTimes.findIndex(t => t === this.currentTime)
      this.isPlaying = true
      this.activePlay()
    },
    pause () {
      this.isPlaying = false
    },
    activePlay () {
      if (this.currentIndex < (this.value._availableTimes.length - 1)) {
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
    onChange (val) {
      this.currentTime = val
      this.$emit('input', val)
    },
    getTimeFormated (time) {
      let formatedDate
      if (time && time.startTime) {
        const startDate = new Date(time.startTime * 1000)
        const endDate = new Date(time.endTime * 1000)
        formatedDate = `${startDate.toDateString()} ${('0' + startDate.getHours()).slice(-2)}:${('0' + startDate.getMinutes()).slice(-2)} - ${('0' + endDate.getHours()).slice(-2)}:${('0' + endDate.getMinutes()).slice(-2)}`
      } else if (time) {
        const date = new Date(time * 1000)
        formatedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`
      }
      return formatedDate
    }
  }
}
</script>
