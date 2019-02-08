<template>
  <modal @close="close()">
    <div slot="header" class="w-100">{{ val.id ? 'Configuration of the' : 'Add a' }} {{ val.type }}</div>
    <div slot="body">
      <graph-edit-widget v-if="val.type === 'graph'" v-model="val"></graph-edit-widget>
      <image-edit-widget v-if="val.type === 'image'" v-model="val"></image-edit-widget>
      <map-edit-widget v-if="val.type === 'map'" v-model="val"></map-edit-widget>
      <table-edit-widget v-if="val.type === 'table'" v-model="val"></table-edit-widget>
      <text-area-edit-widget v-if="val.type === 'textarea'" v-model="val"></text-area-edit-widget>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
      <button type="button" class="btn btn-success" @click="validate(val)">
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
  props: ['editedCard'],
  data () {
    return {
      val: false
    }
  },
  mounted () {
    this.val = { ...this.editedCard } || { title: '', type: 'map' }
  },
  methods: {
    validate (widget) {
      console.log('widget', widget)
      this.$emit('validate', this.val)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
