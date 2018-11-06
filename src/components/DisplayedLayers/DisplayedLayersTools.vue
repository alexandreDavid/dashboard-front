<template>
  <div>
    <time-control class="mb-1" @input="onTimeChanges" v-model="currentTime" :times="times"></time-control>
    <button type="button" id="time-play" class="btn btn-secondary btn-sm mb-1" @click="play" v-show="!isPlaying"><font-awesome-icon icon="play" /></button>
    <button type="button" id="time-pause" class="btn btn-secondary btn-sm mb-1" @click="pause" v-show="isPlaying"><font-awesome-icon icon="pause" /></button>
    <opacity-control class="mb-1" v-model="currentOpacity" @input="setOpacity"></opacity-control>
    <button type="button" class="btn btn-sm btn-secondary mb-1" @click="$emit('openGraphModal')"><font-awesome-icon icon="chart-bar" /> Open graph</button>
  </div>
</template>

<script>
import OpacityControl from '@/components/Map/DisplayedLayer/OpacityControl'
import TimeControl from '@/components/Map/DisplayedLayer/TimeControl'

export default {
  name: 'DisplayedLayersTools',
  components: {
    TimeControl,
    OpacityControl
  },
  props: [
    'time', 'times', 'opacity'
  ],
  computed: {
    currentTime: {
      get () {
        return this.time
      },
      set (val) {
        this.$emit('setTime', val)
      }
    },
    currentOpacity: {
      get () {
        return this.opacity
      },
      set (val) {
        this.$emit('setOpacity', val)
      }
    }
  },
  data () {
    return {
      showModalGraph: false,
      selectedArea: false,
      activeDateDuration: 1500,
      isPlaying: false,
      currentIndex: 0
    }
  },
  methods: {
    setOpacity (val) {
      this.currentOpacity = val
    },
    onTimeChanges (time) {
      this.currentTime = time
    },
    play () {
      this.currentIndex = this.times.findIndex(t => t === this.currentTime)
      this.isPlaying = true
      this.activePlay()
    },
    pause () {
      this.isPlaying = false
    },
    activePlay () {
      if (this.currentIndex < (this.times.length - 1)) {
        this.currentIndex++
        this.onTimeChanges(this.times[this.currentIndex])
        setTimeout(() => {
          if (this.isPlaying) {
            this.activePlay()
          }
        }, this.activeDateDuration)
      } else {
        this.pause()
      }
    }
  }
}
</script>
