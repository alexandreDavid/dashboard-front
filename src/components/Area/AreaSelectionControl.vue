<template>
<div>
  <div class="d-flex bg-white rounded">
    <div class="m-2 w-100">{{ value.name }}</div>
    <button class="btn btn-light flex-shrink-1" @click="edit">
      <font-awesome-icon icon="edit" />
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: 'AreaSelectionControl',
  props: ['value'],
  methods: {
    edit () {
      this.$emit('openSelectionModal')
    }
  }
}
</script>
