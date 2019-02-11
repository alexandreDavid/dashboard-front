<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="value.title" class="form-control" id="title" placeholder="title">
    </div>
    <div class="form-group">
      <label>Location</label>
      <input type="text" v-model="value.src" class="form-control" id="title" placeholder="title">
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea v-model="value.description" class="form-control" placeholder="Description" aria-label="Description"></textarea>
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
  }
}
</script>
