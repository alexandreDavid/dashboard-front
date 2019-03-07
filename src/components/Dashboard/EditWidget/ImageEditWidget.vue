<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="value.title" class="form-control" id="title" placeholder="title">
    </div>
    <div class="form-group">
      <label>Location <small>(required)</small></label>
      <input type="text" v-model="value.src" @input="checkValidity" class="form-control" id="location" placeholder="location" v-bind:class="{'is-invalid': !value.src && showError}">
      <div class="invalid-feedback">
        Please enter a location for the image.
      </div>
    </div>
    <edit-description-field v-model="value.description"></edit-description-field>
  </div>
</template>

<script>
import EditDescriptionField from './EditDescriptionField'

export default {
  name: 'ImageEditWidget',
  components: { EditDescriptionField },
  props: {
    value: {
      type: Object,
      required: true
    },
    showError: {
      type: Boolean
    }
  },
  mounted () {
    this.checkValidity()
  },
  methods: {
    checkValidity () {
      this.$set(this.value, 'isValid', !!this.value.src)
    }
  }
}
</script>
