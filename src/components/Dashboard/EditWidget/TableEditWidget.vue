<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="value.title" class="form-control" id="title" placeholder="title">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableEditWidget',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      resources: []
    }
  },
  created () {
    this.value.formFields = this.value.formFields || {}
  }
}
</script>
