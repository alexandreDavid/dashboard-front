export default {
  data () {
    const daysModel = this.getDaysModels()
    return {
      daysModel: daysModel,
      activeModel: daysModel[0],
      isPlaying: false,
      currentIndex: 0
    }
  },
  inject: ['getDisplayedLayer'],
  methods: {
    goToTime (timeIdx) {
      this.isPlaying = false
      this.currentIndex = timeIdx
      this.afterSelect()
    },
    afterSelect () {
      this.getDisplayedLayer().setDate(this.activeModel.times[this.currentIndex], this.activeModel.times[(this.currentIndex + 1)])
    },
    getDaysModels () {
      let twoDays = []
      // Try to find value to display to be removed for a smart service
      const initDate = new Date()
      initDate.setDate(18)
      initDate.setMonth(6)
      initDate.setHours(0, 0, 0, 0)
      for (let i = 0; i < 17; i++) {
        twoDays.push(initDate / 1000 + i * 10800)
      }
      return [
        {
          value: 2,
          label: '2 days',
          times: twoDays
        }, {
          value: 10,
          label: '10 days',
          times: [1527717600, 1527728400, 1527739200, 1527750000, 1527760800, 1527771600, 1527793200, 1527804000, 1527814800, 1527825600, 1527836400, 1527936400]
        }, {
          value: 90,
          label: '90 days'
        }
      ]
    }
  }
}
