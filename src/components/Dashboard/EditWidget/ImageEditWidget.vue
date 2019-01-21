<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="value.title" class="form-control" id="title" placeholder="title">
    </div>
    <div class="form-group">
      <label>Location</label>
      <input type="text" v-model="value.config.src" class="form-control" id="title" placeholder="title">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageEditWidget',
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
    this.value.config = this.value.config || {}
  }
}
</script>
