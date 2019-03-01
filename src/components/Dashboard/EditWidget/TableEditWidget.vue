<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="value.title" class="form-control" id="title" placeholder="title">
    </div>
    <div class="form-group">
      <label>Table content</label>
      <div class="input-group mb-2">
        <input type="text" class="form-control" v-model="newColumnName" placeholder="New column name" aria-label="New column name">
        <div class="input-group-append">
          <button class="btn btn-outline-primary" @click="addColumn" :disabled="!newColumnName" type="button">Add a new column</button>
        </div>
      </div>
      <grid-content
        :lines="value.lines"
        :columns="value.columns"
        :editable="true">
      </grid-content>
      <button class="btn btn-outline-primary" :disabled="!value.columns.length" @click="addLine">Add a new line</button>
    </div>
    <edit-description-field v-model="value.description"></edit-description-field>
  </div>
</template>

<script>
import EditDescriptionField from './EditDescriptionField'
import GridContent from './../GridContent'

export default {
  name: 'TableEditWidget',
  components: { EditDescriptionField, GridContent },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      gridColumns: [],
      gridData: [],
      newColumnName: ''
    }
  },
  created () {
    this.$set(this.value, 'isValid', true)
    this.value.columns = this.value.columns || this.gridColumns
    this.value.lines = this.value.lines || this.gridData
  },
  methods: {
    addColumn () {
      this.value.columns.push(this.newColumnName)
      this.newColumnName = ''
      if (this.value.columns.length === 1) {
        this.addLine()
      }
    },
    addLine () {
      this.value.lines.push({})
    }
  }
}
</script>
