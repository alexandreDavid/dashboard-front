export default {
  data () {
    return {
      mapHeight: 200
    }
  },
  created () {
    this.setHeight()
  },
  methods: {
    setHeight () {
      this.mapHeight = 200
      if (this.config.advancedConfig) {
        if (isNaN(this.config.advancedHeight)) {
          if (this.config.advancedHeight === 'large') {
            this.mapHeight = 300
          }
        } else {
          this.mapHeight = this.config.advancedHeight
        }
      }
      this.setHeightCallback()
    },
    setHeightCallback () {}
  },
  watch: {
    'config.advancedConfig': 'setHeight',
    'config.advancedHeight': 'setHeight'
  }
}
