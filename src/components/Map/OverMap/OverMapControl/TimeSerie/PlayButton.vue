<template>
  <button type="button" class="btn btn-secondary btn-sm" :title="isPlaying ? 'Stop' : 'Play'" @click="toggle">
    <font-awesome-icon icon="play" v-show="!isPlaying" />
    <font-awesome-icon icon="pause" v-show="isPlaying" />
  </button>
</template>

<script>
export default {
  name: 'PlayButton',
  props: ['value', 'times', 'waitLoad'],
  data () {
    return {
      activeDateDuration: 2000,
      isPlaying: false,
      isWaiting: false,
      currentIndex: 0
    }
  },
  methods: {
    toggle () {
      (this.isPlaying ? this.pause : this.play)()
    },
    play () {
      this.currentIndex = this.times.findIndex(t => t === this.value)
      this.isPlaying = true
      this.activePlay()
      document.addEventListener('click', this.handleClickOutside)
    },
    pause () {
      document.removeEventListener('click', this.handleClickOutside)
      this.isPlaying = false
    },
    async activePlay () {
      // If the user click several times during the time duration, the time is still constant
      if (this.isWaiting) {
        return
      }
      if (this.currentIndex < (this.times.length - 1)) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
      this.$emit('input', this.times[this.currentIndex])
      this.isWaiting = true
      this.waitLoad && await this.waitLoad()
      setTimeout(() => {
        this.isWaiting = false
        if (this.isPlaying) {
          this.activePlay()
        }
      }, this.activeDateDuration)
    },
    handleClickOutside (evt) {
      if (!this.$el.contains(evt.target)) {
        this.pause()
      }
    }
  },
  destroyed () {
    this.pause()
  }
}
</script>
