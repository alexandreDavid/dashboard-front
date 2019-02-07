export default {
  props: ['value'],
  data () {
    return {
      val: false,
      isEditing: false,
      placeholder: false,
      required: false
    }
  },
  mounted () {
    this.placeholder = this.$attrs.placeholder
    this.required = this.$attrs.required === ''
    this.isEditing = !this.value && this.required
  },
  methods: {
    edit () {
      this.val = this.value
      this.isEditing = true
    },
    save (value) {
      this.isEditing = false
      this.$emit('input', value)
    }
  }
}
