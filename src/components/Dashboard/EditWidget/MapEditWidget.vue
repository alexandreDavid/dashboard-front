<template>
  <div class="container">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" v-model="value.title" class="form-control" id="title" placeholder="title" disabled>
    </div>
    <div class="form-group">
      <label>Data to display <small>(required)</small></label>
      <select class="form-control" v-model="value.resource" @change="changeResource(value.resource)">
        <option v-for="resource in resources" :key="resource.id" v-bind:value="resource">
          {{ resource.label }}
        </option>
      </select>
    </div>
    <edit-description-field v-model="value.description"></edit-description-field>
    <button class="btn btn-link w-100" @click="setShowAdvancedSettings(!showAdvancedConfig)">Advanced <font-awesome-icon :icon="showAdvancedConfig ? 'caret-up' : 'caret-down'" /></button>
    <div v-if="showAdvancedConfig">
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
      <edit-height-field v-model="value.advancedHeight"></edit-height-field>
      <edit-area-field v-model="value.advancedArea" @input="setTitle"></edit-area-field>
    </div>
  </div>
</template>

<script>
import EditAreaField from './EditAreaField'
import EditDescriptionField from './EditDescriptionField'
import EditHeightField from './EditHeightField'
import OpacitySlider from '@/components/Slider/OpacitySlider'

import GeoResources from '@/store/geoResources'

export default {
  name: 'MapEditWidget',
  components: { EditAreaField, EditDescriptionField, EditHeightField, OpacitySlider },
  props: {
    value: {
      type: Object,
      required: true
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
    this.$set(this.value, 'isValid', !!this.value.resource)
    if (!this.showAdvancedConfig) {
      this.$set(this.value, 'advancedConfig', false)
      this.$set(this.value, 'advancedOpacity', 80)
      this.$set(this.value, 'advancedHeight', 'default')
      this.$set(this.value, 'advancedArea', false)
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
      this.$set(this.value, 'isValid', !!this.value.resource)
      this.setTitle()
    },
    setShowAdvancedSettings (val) {
      this.showAdvancedConfig = val
      this.setTitle()
      this.$set(this.value, 'advancedConfig', val)
    },
    setTitle () {
      let title = this.value.resource && this.value.resource.label
      if (this.showAdvancedConfig && this.value.advancedArea) {
        title += ` - ${this.value.advancedArea.name}`
      }
      this.$set(this.value, 'title', title)
    }
  }
}
</script>
