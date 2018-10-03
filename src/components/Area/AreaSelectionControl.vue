<template>
  <div class="card">
    <div class="card-body p-2">
      <h6>Working area - {{ value.name }}</h6>
      <div class="ml-2">
        <button class="btn btn-secondary btn-sm" @click="zoom"><font-awesome-icon icon="location-arrow" class="align-self-center" /> zoom</button>
        <button class="btn btn-secondary btn-sm" @click="edit"><font-awesome-icon icon="edit" class="align-self-center" /> edit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AreaSelectionControl',
  props: ['value'],
  methods: {
    zoom () {
      this.$emit('zoomToArea')
    },
    edit () {
      this.$emit('openSelectionModal')
    }
  }
}
</script>
