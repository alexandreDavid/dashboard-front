<template>
  <div>
    <button class="btn btn-link" @click="edit" v-if="addButtonLabel && !isEditing && !value">{{ addButtonLabel }}</button>
    <div v-else-if="isEditing">
      <textarea v-model="val" class="form-control mb-1" :placeholder="placeholder" :aria-label="placeholder"></textarea>
      <div class="float-right">
        <button class="btn btn-secondary" type="button" @click="isEditing = false">Cancel</button>
        <button class="btn btn-success" type="button" @click="save(val)">Save</button>
      </div>
    </div>
    <span class="px-3 py-1" @click="edit" v-else>{{ value }}</span>
  </div>
</template>

<script>
import EditableMixins from './EditableMixins'

export default {
  name: 'EditableTextArea',
  props: ['addButtonLabel'],
  mixins: [EditableMixins]
}
</script>
