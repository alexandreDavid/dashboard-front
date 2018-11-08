<template>
  <div id="time-slot" class="w-100" v-if="times && times.length">
    <div class="d-flex align-items-end" v-if="isLoaded">
      <div class="mr-1">
        <button type="button" id="time-play" class="btn btn-secondary btn-sm" @click="play" v-show="!isPlaying"><font-awesome-icon icon="play" /></button>
        <button type="button" id="time-pause" class="btn btn-secondary btn-sm" @click="pause" v-show="isPlaying"><font-awesome-icon icon="pause" /></button>
      </div>
      <div class="flex-grow-1">
        <TimeSlider class="d-none d-sm-block" v-model="val" @input="onChange" v-bind:times="times"></TimeSlider>
        <div class="text-center" style="font-size: 0.8em">{{ value }}</div>
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
  props: ['value', 'times'],
  data () {
    return {
      isLoaded: false,
      activeDateDuration: 1500,
      isPlaying: false,
      currentIndex: 0
    }
  },
  created () {
    this.isLoaded = true
  },
  methods: {
    goToTime (timeIdx) {
      this.isPlaying = false
      this.currentIndex = timeIdx
      this.afterSelect()
    },
    afterSelect () {
      this.val = this.times[this.currentIndex]
    },
    play () {
      this.currentIndex = this.times.findIndex(t => t === this.value)
      this.isPlaying = true
      this.activePlay()
    },
    pause () {
      this.isPlaying = false
    },
    activePlay () {
      if (this.currentIndex < (this.times.length - 1)) {
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
      this.val = val
    }
  }
}
</script>
