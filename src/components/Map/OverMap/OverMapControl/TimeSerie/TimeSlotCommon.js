const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default {
  props: [
    'model'
  ],
  data () {
    return {
      isPlaying: false,
      currentIndex: 0
    }
  },
  methods: {
    goToTime (timeIdx) {
      this.isPlaying = false
      this.currentIndex = timeIdx
      this.afterSelect()
    },
    afterSelect () {
      this.$emit('change', this.model.times[this.currentIndex])
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
  }
}
