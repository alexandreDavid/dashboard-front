<template>
  <div class="p-0" v-bind:class="cardConfiguration.widthClass">
    <div class="card m-2" v-bind:class="cardConfiguration.heightClass">
      <div class="card-header" v-if="cardConfiguration.title">
        <div class="d-flex">
          <div class="flex-grow-1">
            <h5 class="w-100">{{cardConfiguration.title}} {{cardConfiguration.sizeClass}} {{cardConfiguration.fwfe}}</h5>
          </div>
          <div v-if="isEditing">
            <button type="button" class="btn btn-light btn-sm ml-2" @click="editCard()"><font-awesome-icon :icon="iconEdit" /></button>
          </div>
        </div>
      </div>
      <div v-if="!cardConfiguration.title && isEditing " class="position-absolute" style="right: 0; z-index: 1002; ">
        <button type="button" class="btn btn-light btn-sm" @click="editCard()"><font-awesome-icon :icon="iconEdit" /></button>
      </div>
      <div class="card-body position-relative">
        <WidgetGraph v-if="cardConfiguration.widget.id === 'graph'" v-bind:area="area" v-bind:parameter="getValueForSelectedWidgetById('parameter')"></WidgetGraph>
        <WidgetMap v-if="cardConfiguration.widget.id === 'map'" v-bind:area="area" v-bind:parameter="getValueForSelectedWidgetById('parameter')" :widgetKey="cardConfiguration.id"></WidgetMap>
        <WidgetTextArea v-if="cardConfiguration.widget.id === 'textarea'" v-bind:textArea="getValueForSelectedWidgetById('text')"></WidgetTextArea>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetGraph from './Widgets/WidgetGraph'
import WidgetMap from './Widgets/WidgetMap'
import WidgetTextArea from './Widgets/WidgetTextArea'
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
    FontAwesomeIcon
  },
  props: [
    'selectedArea',
    'cardConfiguration',
    'isEditing'
  ],
  computed: {
    iconEdit() {
      return faEdit
    }
  },
  data() {
    return {
      area: this.selectedArea,
      sizeClass: this.cardConfiguration
    }
  },
  methods: {
    editCard () {
      this.$emit('edit')
    },
    getValueForSelectedWidgetById(id) {
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
