<template>
  <div class="form-group">
    <div class="custom-control custom-switch">
      <input type="checkbox" v-model="hasAdvancedArea" class="custom-control-input" id="has-custom-area">
      <label class="custom-control-label" for="has-custom-area">Define a custom area</label>
    </div>
    <area-selection-control v-model="selectedArea" :disabled="!hasAdvancedArea"></area-selection-control>
  </div>
</template>

<script>
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'

import { mapGetters } from 'vuex'

export default {
  name: 'EditAreaField',
  components: { AreaSelectionControl },
  props: [ 'value' ],
  computed: {
    valueModel: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    ...mapGetters('areas', ['activeArea', 'getArea'])
  },
  data () {
    return {
      hasAdvancedArea: false,
      selectedArea: false
    }
  },
  mounted () {
    if (this.valueModel) {
      this.selectedArea = this.getArea(this.valueModel.id)
      this.hasAdvancedArea = true
    } else {
      this.selectedArea = this.activeArea
    }
  },
  watch: {
    hasAdvancedArea (val) {
      this.valueModel = val && this.selectedArea
    },
    selectedArea (val) {
      if (this.hasAdvancedArea && val) {
        this.valueModel = val
      }
    }
  }
}
</script>
