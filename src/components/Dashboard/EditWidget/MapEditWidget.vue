<template>
  <div class="container">
    <div class="form-group">
      <label>Title</label>
      <h6>{{ value.title || '-' }}</h6>
    </div>
    <div class="form-group">
      <label>Area <small>(required)</small></label>
      <area-selection-control v-model="value.area" @input="areaChange" :required="showError"></area-selection-control>
    </div>
    <edit-data-field v-model="value.resource" @input="changeResource" :required="showError"></edit-data-field>
    <edit-description-field v-model="value.description"></edit-description-field>
    <button class="btn btn-link w-100" @click="setShowAdvancedSettings(!showAdvancedConfig)">Advanced <font-awesome-icon :icon="showAdvancedConfig ? 'caret-up' : 'caret-down'" /></button>
    <div v-if="showAdvancedConfig">
      <edit-title-field v-model="value.customTitle" :default-title="value.title" @input="setTitle"></edit-title-field>
      <edit-height-field v-model="value.advancedHeight"></edit-height-field>
      <div class="form-group">
        <label for="opacity">Opacity</label>
        <div class="form-inline">
          <div class="input-group">
            <input type="number" id="opacity" min="0" max="100" style="width: 70px;" class="form-control" v-model="value.advancedOpacity" placeholder="Opacity" aria-label="Opacity">
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2">%</span>
            </div>
          </div>
          <opacity-slider class="ml-2" style="width: 200px;" v-model="value.advancedOpacity"></opacity-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomTitleMixin from './CustomTitleMixin'

import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import EditDataField from './EditDataField'
import EditDescriptionField from './EditDescriptionField'
import EditHeightField from './EditHeightField'
import OpacitySlider from '@/components/Slider/OpacitySlider'

import GeoResources from '@/store/geoResources'

export default {
  name: 'MapEditWidget',
  mixins: [ CustomTitleMixin ],
  components: { AreaSelectionControl, EditDataField, EditDescriptionField, EditHeightField, OpacitySlider },
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
      this.$set(this.value, 'advancedConfig', false)
      this.$set(this.value, 'advancedOpacity', 80)
      this.$set(this.value, 'advancedHeight', 'default')
      this.$set(this.value, 'customTitle', false)
    }
    this.setTitle()

    const allResources = GeoResources.getAll()
    this.resources = allResources.map(p => ({
      id: p.id,
      label: p.label
    }))
  },
  methods: {
    changeResource (resource) {
      this.value.resource = resource
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
