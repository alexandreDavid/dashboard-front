<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <h6>{{ value.title || '-' }}</h6>
    </div>
    <div class="form-group">
      <label>Area <small>(required)</small></label>
      <area-selection-control v-model="value.area" @input="areaChange" :required="showError"></area-selection-control>
    </div>
    <edit-data-field v-model="value.resource" @input="changeResource" :required="showError" :filter="p => p.config.statistics"></edit-data-field>
    <edit-description-field v-model="value.description"></edit-description-field>
    <button class="btn btn-link w-100" @click="setShowAdvancedSettings(!showAdvancedConfig)">Advanced <font-awesome-icon :icon="showAdvancedConfig ? 'caret-up' : 'caret-down'" /></button>
    <div v-if="showAdvancedConfig">
      <edit-title-field v-model="value.customTitle" :default-title="value.title" @input="setTitle"></edit-title-field>
      <edit-height-field v-model="value.advancedHeight"></edit-height-field>
    </div>
  </div>
</template>

<script>
import CustomTitleMixin from './CustomTitleMixin'

import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import EditDataField from './EditDataField'
import EditDescriptionField from './EditDescriptionField'
import EditHeightField from './EditHeightField'

import GeoResources from '@/store/geoResources'

export default {
  name: 'GraphEditWidget',
  mixins: [ CustomTitleMixin ],
  components: { AreaSelectionControl, EditDataField, EditDescriptionField, EditHeightField },
  props: {
    value: {
      type: Object,
      required: true
    },
    showError: {
      type: Boolean
    }
  },
  data () {
    return {
      resources: [],
      showAdvancedConfig: false
    }
  },
  mounted () {
    this.showAdvancedConfig = this.value.advancedConfig
    this.checkValidity()
    if (!this.showAdvancedConfig) {
      this.$set(this.value, 'advancedHeight', 'default')
      this.$set(this.value, 'customTitle', false)
    }
    const allResources = GeoResources.getAll()
    this.resources = allResources.filter(p => p.config.statistics).map(p => ({
      id: p.id,
      label: p.label
    }))
    this.setTitle()
  },
  methods: {
    changeResource (resource) {
      // this.value.resource = resource
      this.checkValidity()
      this.setTitle()
    },
    setShowAdvancedSettings (val) {
      this.showAdvancedConfig = val
      this.setTitle()
      this.$set(this.value, 'advancedConfig', val)
    },
    checkValidity () {
      this.$set(this.value, 'isValid', !!(this.value.resource && this.value.area))
    },
    areaChange () {
      this.setTitle()
      this.checkValidity()
    }
  }
}
</script>
