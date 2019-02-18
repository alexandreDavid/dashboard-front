<template>
  <div>
    <div class="input-group">
      <select class="custom-select" v-model="val" @change="change(val)" aria-label="Place selection">
        <option v-for="(option, key) in options" :key="key" :value="option">{{ option.name }}</option>
      </select>
      <div class="input-group-append">
        <button class="btn btn-outline-secondary edit" type="button" title="manage areas" @click="showModalArea = true"><font-awesome-icon icon="edit" /></button>
      </div>
    </div>
    <area-selection-modal v-if="showModalArea" @close="closeModal"></area-selection-modal>
  </div>
</template>

<script>
import AreaSelectionModal from '@/components/Area/AreaSelectionModal'
import DefinedAreas from '@/store/definedAreas'

export default {
  name: 'AreaSelectionControl',
  components: {AreaSelectionModal},
  props: [ 'value' ],
  data () {
    return {
      val: false,
      options: false,
      showModalArea: false
    }
  },
  mounted () {
    this.loadOptions()
  },
  methods: {
    change (val) {
      if (!this.value) {
        DefinedAreas.setActiveArea(val)
      }
      this.$emit('change', val)
    },
    closeModal () {
      this.showModalArea = false
      this.loadOptions()
    },
    loadOptions () {
      this.options = DefinedAreas.getAll()
      this.val = this.value || DefinedAreas.getActiveArea()
      this.change(this.val)
    }
  },
  watch: {
    value: 'loadOptions'
  }
}
</script>
