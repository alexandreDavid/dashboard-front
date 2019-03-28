<template>
  <div class="p-0" @mouseover="showEditionButtons = true" @mouseleave="showEditionButtons = false">
    <div class="card m-2 overflow-hidden">
      <div class="card-header drag-handler" v-if="cardConfiguration.title">
        <div class="d-flex align-items-center">
          <div class="flex-grow-1">
            <b class="w-100" style="line-height: 26px;">{{cardConfiguration.title}}</b>
          </div>
          <div v-if="showEditionButtons">
            <button type="button" class="btn btn-light btn-xs ml-2 edit" title="Edit card" @click="$emit('edit')"><font-awesome-icon icon="edit" /></button>
            <button type="button" class="btn btn-light btn-xs delete" title="Delete card" @click="showConfirmDelete = true"><font-awesome-icon icon="trash" /></button>
          </div>
        </div>
      </div>
      <div v-if="!cardConfiguration.title" class="position-absolute p-2 drag-handler" style="left: 0;right: 0; height:47px; z-index: 1002;text-align: right;">
        <div v-if="showEditionButtons">
          <button type="button" class="btn btn-light btn-sm edit-card edit" title="Edit card" @click="$emit('edit')"><font-awesome-icon icon="edit" /></button>
          <button type="button" class="btn btn-light btn-sm delete" title="Delete card" @click="showConfirmDelete = true"><font-awesome-icon icon="trash" /></button>
        </div>
      </div>
      <widget-graph v-if="cardConfiguration.type === 'graph'" class="widget-graph" v-bind:config="cardConfiguration"></widget-graph>
      <widget-image v-if="cardConfiguration.type === 'image'" class="widget-image" v-bind:config="cardConfiguration"></widget-image>
      <widget-map v-if="cardConfiguration.type === 'map'" class="widget-map" v-bind:config="cardConfiguration" :widgetKey="widgetId"></widget-map>
      <WidgetTextArea v-if="cardConfiguration.type === 'textarea'" class="widget-textarea" v-bind:config="cardConfiguration"></WidgetTextArea>
      <WidgetTable v-if="cardConfiguration.type === 'table'" v-bind:config="cardConfiguration" class="widget-table"></WidgetTable>
    </div>
    <confirm-modal v-if="showConfirmDelete" content="Do you really want to delete the card?" @close="showConfirmDelete = false" @confirm="$emit('delete')"></confirm-modal>
  </div>
</template>

<script>
import { WidgetGraph, WidgetImage, WidgetMap, WidgetTable, WidgetTextArea } from '@/components/Dashboard/Widgets'
import Loading from '@/components/Loading/Loading'
import ConfirmModal from '@/components/Modal/ConfirmModal'

export default {
  name: 'DashboardWidget',
  components: {
    Loading,
    WidgetGraph,
    WidgetImage,
    WidgetMap,
    WidgetTextArea,
    WidgetTable,
    ConfirmModal
  },
  props: [
    'cardConfiguration',
    'isEditing',
    'widgetId'
  ],
  data () {
    return {
      showEditionButtons: false,
      showConfirmDelete: false
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
