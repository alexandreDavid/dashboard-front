<template>
  <div class="p-0" v-bind:class="cardConfiguration.widthClass">
    <div class="card m-2" v-bind:class="cardConfiguration.heightClass">
      <div class="card-header" v-if="cardConfiguration.title">
        <div class="d-flex align-items-center">
          <div class="flex-grow-1">
            <span class="w-100">{{cardConfiguration.title}}</span>
          </div>
          <div v-if="isEditing">
            <button type="button" class="btn btn-light btn-sm ml-2 edit" @click="editCard()"><font-awesome-icon :icon="iconEdit" /></button>
          </div>
        </div>
      </div>
      <div v-if="!cardConfiguration.title && isEditing " class="position-absolute" style="right: 0; z-index: 1002; ">
        <button type="button" class="btn btn-light btn-sm edit-card edit" @click="editCard()"><font-awesome-icon :icon="iconEdit" /></button>
      </div>
      <div class="card-body position-relative" style="overflow: auto;">
        <WidgetGraph v-if="cardConfiguration.widget.id === 'graph'" class="widget-graph" v-bind:area="selectedArea" v-bind:parameter="getValueForSelectedWidgetById('parameter')" v-bind:graphType="getValueForSelectedWidgetById('graphType').value"></WidgetGraph>
        <WidgetMap v-if="cardConfiguration.widget.id === 'map'" class="widget-map" v-bind:area="selectedArea" v-bind:parameter="getValueForSelectedWidgetById('parameter')" :widgetKey="cardConfiguration.id"></WidgetMap>
        <WidgetTextArea v-if="cardConfiguration.widget.id === 'textarea'" class="widget-textarea" v-bind:textArea="getValueForSelectedWidgetById('text')"></WidgetTextArea>
        <WidgetTable v-if="cardConfiguration.widget.id === 'table'" class="widget-table"></WidgetTable>
      </div>
    </div>
  </div>
</template>

<script>
import { WidgetGraph, WidgetMap, WidgetTable, WidgetTextArea } from '@/components/Dashboard/Widgets'
import Loading from '@/components/Loading/Loading'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'

export default {
  name: 'DashboardWidget',
  components: {
    Loading,
    WidgetGraph,
    WidgetMap,
    WidgetTextArea,
    WidgetTable,
    FontAwesomeIcon
  },
  props: [
    'selectedArea',
    'cardConfiguration',
    'isEditing'
  ],
  computed: {
    iconEdit () {
      return faEdit
    }
  },
  methods: {
    editCard () {
      this.$emit('edit')
    },
    getValueForSelectedWidgetById (id) {
      return this.cardConfiguration.widget.formFields.find(f => f.id === id).value
    }
  }
}
</script>

<style lang="scss" scoped>

.heigh-small {
  height: 150px;
}
.height-medium {
  height: 300px;
}
.height-large {
  height: 500px;
}
</style>
