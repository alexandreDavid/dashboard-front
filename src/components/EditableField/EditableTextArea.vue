<template>
  <div>
    <button class="btn btn-link" @click="editTextArea" v-if="addButtonLabel && !isEditing && !value">{{ addButtonLabel }}</button>
    <div v-else-if="isEditing">
      <textarea :rows="textAreaRows" v-model="val" class="form-control mb-1" :placeholder="placeholder" :aria-label="placeholder"></textarea>
      <div class="d-flex justify-content-between">
        <small id="emailHelp" class="form-text text-muted">{{ limit - val.length}} characters remaining ({{ limit }} maximum)</small>
        <div class="float-right">
          <button class="btn btn-secondary" type="button" @click="isEditing = false">Cancel</button>
          <button class="btn btn-success" type="button" @click="save(val)">Save</button>
        </div>
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
  name: 'EditableTextArea',
  props: {
    addButtonLabel: String
  },
  data () {
    return {
      textAreaRows: 2,
      limit: 500
    }
  },
  mixins: [EditableMixins],
  methods: {
    editTextArea () {
      // TextArea height is the number of lines (line breaks + 1) or 2
      this.textAreaRows = (((this.value && this.value.match(/(\r\n|\n)/g)) || ['']).length) + 1
      this.edit()
    }
  }
}
</script>
