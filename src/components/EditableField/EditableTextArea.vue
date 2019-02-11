<template>
  <div>
    <button class="btn btn-link" @click="editTextArea" v-if="addButtonLabel && !isEditing && !value">{{ addButtonLabel }}</button>
    <div v-else-if="isEditing">
      <textarea :rows="textAreaRows" v-model="val" class="form-control mb-1" :placeholder="placeholder" :aria-label="placeholder"></textarea>
      <div class="float-right">
        <button class="btn btn-secondary" type="button" @click="isEditing = false">Cancel</button>
        <button class="btn btn-success" type="button" @click="save(val)">Save</button>
      </div>
    </div>
    <pre class="px-3 py-1 mb-0" style="white-space: pre-line;" @click="editTextArea" v-else>{{ value }}</pre>
  </div>
</template>

<script>
import EditableMixins from './EditableMixins'

export default {
  name: 'EditableTextArea',
  props: ['addButtonLabel'],
  data () {
    return {
      textAreaRows: 2
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
