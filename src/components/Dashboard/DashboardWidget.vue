<template>
  <div class="p-0">
    <div class="card m-2 overflow-hidden">
      <div class="card-header drag-handler" v-if="cardConfiguration.title" @mouseover="showEditionButtons = true" @mouseleave="showEditionButtons = false">
        <div class="d-flex align-items-center">
          <div class="flex-grow-1">
            <span class="w-100" style="line-height: 26px;">{{cardConfiguration.title}}</span>
          </div>
          <div v-if="showEditionButtons">
            <button type="button" class="btn btn-light btn-xs ml-2 edit" @click="editCard()"><font-awesome-icon icon="edit" /></button>
            <button type="button" class="btn btn-light btn-xs delete" @click="$emit('delete')"><font-awesome-icon icon="trash" /></button>
          </div>
        </div>
      </div>
      <div v-if="!cardConfiguration.title" class="position-absolute m-2" style="right: 0; z-index: 1002; ">
        <button type="button" class="btn btn-light btn-sm edit-card edit" @click="editCard()"><font-awesome-icon icon="edit" /></button>
        <button type="button" class="btn btn-light btn-sm delete" @click="$emit('delete')"><font-awesome-icon icon="trash" /></button>
      </div>
      <widget-graph v-if="cardConfiguration.type === 'graph'" class="widget-graph" v-bind:config="cardConfiguration" v-bind:area="selectedArea"></widget-graph>
      <widget-image v-if="cardConfiguration.type === 'image'" class="widget-image" v-bind:config="cardConfiguration"></widget-image>
      <widget-map v-if="cardConfiguration.type === 'map'" class="widget-map" v-bind:config="cardConfiguration" v-bind:area="selectedArea" :widgetKey="widgetId"></widget-map>
      <WidgetTextArea v-if="cardConfiguration.type === 'textarea'" class="widget-textarea" v-bind:config="cardConfiguration"></WidgetTextArea>
      <WidgetTable v-if="cardConfiguration.type === 'table'" class="widget-table"></WidgetTable>
    </div>
  </div>
</template>

<script>
import { WidgetGraph, WidgetImage, WidgetMap, WidgetTable, WidgetTextArea } from '@/components/Dashboard/Widgets'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'DashboardWidget',
  components: {
    Loading,
    WidgetGraph,
    WidgetImage,
    WidgetMap,
    WidgetTextArea,
    WidgetTable
  },
  props: [
    'selectedArea',
    'cardConfiguration',
    'isEditing',
    'widgetId'
  ],
  data () {
    return {
      showEditionButtons: false
    }
  },
  methods: {
    editCard () {
      this.$emit('edit')
    },
    getValueForSelectedWidgetById (id) {
      return this.cardConfiguration.config.find(f => f.id === id).value
    }
  }
}
</script>

<style lang="scss">

.heigh-small {
  height: 150px;
}
.height-medium {
  height: 300px;
}
.height-large {
  height: 500px;
}

.drag-handler {
  cursor: move;
}

.widget-description {
  white-space: pre-line !important;
}
</style>
