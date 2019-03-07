<template>
  <modal @close="close()">
    <div slot="header" class="w-100">{{ valueModel.id ? 'Configuration of the' : 'Add a' }} {{ valueModel.type }}</div>
    <div slot="body">
      <graph-edit-widget v-if="valueModel.type === 'graph'" v-model="valueModel" :show-error="showError"></graph-edit-widget>
      <image-edit-widget v-if="valueModel.type === 'image'" v-model="valueModel" :show-error="showError"></image-edit-widget>
      <map-edit-widget v-if="valueModel.type === 'map'" v-model="valueModel" :show-error="showError"></map-edit-widget>
      <table-edit-widget v-if="valueModel.type === 'table'" v-model="valueModel" :show-error="showError"></table-edit-widget>
      <text-area-edit-widget v-if="valueModel.type === 'textarea'" v-model="valueModel" :show-error="showError"></text-area-edit-widget>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
      <button type="button" class="btn btn-success" @click="validate(valueModel)">
        <font-awesome-icon icon="check"/>Apply
      </button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import {
  GraphEditWidget,
  ImageEditWidget,
  MapEditWidget,
  TableEditWidget,
  TextAreaEditWidget
} from '@/components/Dashboard/EditWidget'

export default {
  name: 'DashboardCardModal',
  components: {
    Modal,
    GraphEditWidget,
    ImageEditWidget,
    MapEditWidget,
    TableEditWidget,
    TextAreaEditWidget
  },
  props: ['value'],
  computed: {
    valueModel: {
      get () {
        return this.value
      }
    }
  },
  data () {
    return {
      showError: false
    }
  },
  methods: {
    validate (card) {
      if (this.valueModel.isValid) {
        this.$emit('input', card)
      } else {
        // this.valueModel.showError = true
        this.showError = true
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
