<template>
  <div>
    <div class="input-group" v-if="isEditing">
      <select class="custom-select" v-model="val" :aria-label="placeholder">
        <option v-for="(option, key) in list" :key="key" :value="option">{{ option }}</option>
      </select>
      <div class="input-group-append" id="button-addon4">
        <button class="btn btn-secondary" type="button" @click="isEditing = false">Cancel</button>
        <button class="btn btn-success" type="button" @click="save(val)" :disabled="required && !val">Save</button>
      </div>
    </div>
    <span @click="edit" v-else>{{ value }}</span>
  </div>
</template>

<script>
import EditableMixins from './EditableMixins'

export default {
  name: 'EditableList',
  props: ['list'],
  mixins: [EditableMixins]
}
</script>
