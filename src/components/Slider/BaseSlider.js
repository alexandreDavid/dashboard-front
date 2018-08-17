import { debounce } from 'debounce'

export default {
  props: {
    value: {
      type: [String, Number, Array, Object],
      default: 0
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {}
    }
  },
  methods: {
    onCallback: debounce(function (val) {
      this.$emit('input', val)
    }, 100)
  }
}
