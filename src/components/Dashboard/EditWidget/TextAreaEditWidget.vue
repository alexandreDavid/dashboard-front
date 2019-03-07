<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="value.title" class="form-control" id="title" placeholder="title">
    </div>
    <div class="form-group">
      <label>Text <small>(required)</small></label>
      <textarea class="form-control" v-model="value.description" @input="checkValidity" placeholder="Type here..." aria-label="Text" v-bind:class="{'is-invalid': !value.description && showError}"></textarea>
      <div class="invalid-feedback">
        Please enter a message in the textarea.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaEditWidget',
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
      this.$set(this.value, 'isValid', !!this.value.description)
    }
  }
}
</script>
