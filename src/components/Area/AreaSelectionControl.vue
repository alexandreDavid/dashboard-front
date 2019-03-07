<template>
  <div>
    <div class="input-group">
      <select class="custom-select" v-model="val" @change="change(val)" :disabled="disabled" aria-label="Place selection" v-bind:class="{'is-invalid': required && !value }">
        <option v-for="(option, key) in options" :key="key" :value="option">{{ option.name }}</option>
      </select>
      <div class="invalid-feedback order-1">
        Please choose an area.
      </div>
      <div class="input-group-append">
        <button class="btn btn-outline-secondary edit" type="button" title="Manage the area" @click="displayModal('current')" :disabled="disabled"><font-awesome-icon icon="edit" /></button>
        <button class="btn btn-outline-secondary plus" type="button" title="Add a new area" @click="displayModal('add')" :disabled="disabled"><font-awesome-icon icon="plus" /></button>
      </div>
    </div>
    <area-selection-modal v-if="showModalArea" @close="closeModal" :open-type="displayType" :current-val="val"></area-selection-modal>
  </div>
</template>

<script>
import AreaSelectionModal from '@/components/Area/AreaSelectionModal'
import DefinedAreas from '@/store/definedAreas'

export default {
  name: 'AreaSelectionControl',
  components: {AreaSelectionModal},
  props: [ 'value', 'disabled', 'required' ],
  data () {
    return {
      val: false,
      options: false,
      showModalArea: false,
      displayType: false
    }
  },
  mounted () {
    this.loadOptions()
    if (this.value) {
      this.val = DefinedAreas.getArea(this.value.id)
    }
  },
  methods: {
    displayModal (type) {
      this.showModalArea = true
      this.displayType = type
    },
    change (val) {
      this.$emit('input', val)
    },
    closeModal () {
      this.showModalArea = false
      this.loadOptions()
      this.val = DefinedAreas.getArea(this.val.id)
      this.change(this.val)
    },
    loadOptions () {
      this.options = DefinedAreas.getAll()
    }
  },
  watch: {
    value (val) {
      this.val = val
    }
  }
}
</script>
