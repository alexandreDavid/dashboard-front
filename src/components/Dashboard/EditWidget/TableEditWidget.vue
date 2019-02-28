<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="value.title" class="form-control" id="title" placeholder="title">
    </div>
    <edit-description-field v-model="value.description"></edit-description-field>
  </div>
</template>

<script>
import EditDescriptionField from './EditDescriptionField'

export default {
  name: 'TableEditWidget',
  components: { EditDescriptionField },
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
    this.$set(this.value, 'isValid', true)
  }
}
</script>
