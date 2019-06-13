<template>
  <div>
    <div class="input-group" v-if="isEditing">
      <input type="text" v-model="val" class="form-control" :placeholder="placeholder" :aria-label="placeholder">
      <div class="input-group-append" id="button-addon4">
        <button class="btn btn-secondary" type="button" @click="isEditing = false">Cancel</button>
        <button class="btn btn-success" type="button" @click="save(val)" :disabled="required && !val">Save</button>
      </div>
    </div>
    <div v-else>
      <span>{{ value }}</span>
      <button class="btn btn-default float-right" type="button" @click="edit"><font-awesome-icon icon="edit" /></button>
    </div>
  </div>
</template>

<script>
import EditableMixins from './EditableMixins'

export default {
  name: 'EditableInput',
  mixins: [EditableMixins]
}
</script>
