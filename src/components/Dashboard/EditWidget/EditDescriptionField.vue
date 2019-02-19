<template>
  <div>
    <button class="btn btn-link" @click="isEditing = true" v-if="!isEditing">Add a description</button>
    <div class="form-group" v-else>
      <label for="description">Description</label>
      <textarea v-model="valueModel" class="form-control" :maxlength="limit" placeholder="Description" aria-label="Description"></textarea>
      <small id="emailHelp" class="form-text text-muted">{{ limit - valueModel.length}} characters remaining ({{ limit }} maximum)</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditDescriptionField',
  props: {
    value: {
      required: true
    }
  },
  data () {
    return {
      isEditing: false,
      limit: 500
    }
  },
  computed: {
    valueModel: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    }
  },
  mounted () {
    this.isEditing = !!this.value
  },
  methods: {
  }
}
</script>
