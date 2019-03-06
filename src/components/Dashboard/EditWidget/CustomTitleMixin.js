import EditTitleField from './EditTitleField'

export default {
  components: { EditTitleField },
  methods: {
    setTitle () {
      let titleParts = []
      if (this.value.area && this.value.area.name) {
        titleParts.push(this.value.area.name)
      }
      if (this.value.resource && this.value.resource.label) {
        titleParts.push(this.value.resource.label)
      }
      this.$set(this.value, 'defaultTitle', titleParts.join(' - '))
      this.$set(this.value, 'title', (this.showAdvancedConfig && this.value.customTitle) ? this.value.customTitle : this.value.defaultTitle)
    }
  }
}
