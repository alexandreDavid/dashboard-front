<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="value.title" class="form-control" id="title" placeholder="title">
    </div>
    <div class="form-group">
      <label>Text <small>(required)</small></label>
      <textarea class="form-control" v-model="value.description" @input="checkValidity" placeholder="Type here..." aria-label="Text"></textarea>
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
