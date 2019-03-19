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
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AreaSelectionControl',
  components: {AreaSelectionModal},
  props: [ 'value', 'disabled', 'required' ],
  computed: {
    ...mapState({
      options: state => state.areas.all
    }),
    ...mapGetters('areas', ['getArea'])
  },
  data () {
    return {
      val: false,
      showModalArea: false,
      displayType: false
    }
  },
  mounted () {
    if (this.value) {
      this.val = this.getArea(this.value.id)
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
      this.val = this.getArea(this.value.id)
      this.change(this.val)
    }
  },
  watch: {
    value (val) {
      this.val = val
    }
  }
}
</script>
