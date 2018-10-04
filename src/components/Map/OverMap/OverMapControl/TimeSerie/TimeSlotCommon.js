const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default {
  props: [
    'value'
  ],
  data () {
    return {
      isPlaying: false,
      currentIndex: 0
    }
  },
  mounted () {
    this.goToNow()
  },
  methods: {
    goToTime (timeIdx) {
      this.isPlaying = false
      this.currentIndex = timeIdx
      this.afterSelect()
    },
    goToNow () {
      let nowIndex = this.value.times.findIndex(time => (Date.now() / 1000) < time.endTime)
      this.goToTime((nowIndex > -1 ? nowIndex : 0))
    },
    afterSelect () {
      this.$emit('change', this.value.times[this.currentIndex])
    },
    getDate (date) {
      return new Date(date * 1000).getDate()
    },
    getDateDay (date) {
      return dayNames[new Date(date * 1000).getDay()]
    },
    getDateHour (date) {
      const d = new Date(date * 1000)
      return `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
    }
  },
  watch: {
    value: 'goToNow'
  }
}
