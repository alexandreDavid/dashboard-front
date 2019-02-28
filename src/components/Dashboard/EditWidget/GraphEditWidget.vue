<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="value.title" class="form-control" id="title" placeholder="title" disabled>
    </div>
    <div class="form-group">
      <label>Data to display</label>
      <select class="form-control" v-model="value.resource" @change="changeResource(value.resource)">
        <option v-for="resource in resources" :key="resource.id" v-bind:value="resource">
          {{ resource.label }}
        </option>
      </select>
    </div>
    <edit-description-field v-model="value.description"></edit-description-field>
    <button class="btn btn-link w-100" @click="setShowAdvancedSettings(!showAdvancedConfig)">Advanced <font-awesome-icon :icon="showAdvancedConfig ? 'caret-up' : 'caret-down'" /></button>
    <div v-if="showAdvancedConfig">
      <edit-height-field v-model="value.advancedHeight"></edit-height-field>
      <div class="form-group">
        <label>Area</label>
        <area-selection-control v-model="advancedArea" @change="setArea"></area-selection-control>
      </div>
    </div>
  </div>
</template>

<script>

import EditDescriptionField from './EditDescriptionField'
import EditHeightField from './EditHeightField'
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'

import GeoResources from '@/store/geoResources'
import DefinedAreas from '@/store/definedAreas'

export default {
  name: 'GraphEditWidget',
  components: { EditDescriptionField, EditHeightField, AreaSelectionControl },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      resources: [],
      showAdvancedConfig: false,
      advancedArea: {}
    }
  },
  mounted () {
    this.showAdvancedConfig = this.value.advancedConfig
    if (!this.showAdvancedConfig) {
      this.$set(this.value, 'advancedHeight', 'default')
      this.$set(this.value, 'advancedArea', DefinedAreas.getActiveArea())
    }
    this.advancedArea = this.value.advancedArea
    const allResources = GeoResources.getAll()
    this.resources = allResources.filter(p => p.config.statistics).map(p => ({
      id: p.id,
      label: p.label
    }))
    this.setTitle()
  },
  methods: {
    changeResource (resource) {
      this.value.resource = resource
      this.setTitle()
    },
    setShowAdvancedSettings (val) {
      this.showAdvancedConfig = val
      this.setTitle()
      this.$set(this.value, 'advancedConfig', val)
    },
    setTitle () {
      let title = this.value.resource && this.value.resource.label
      if (this.showAdvancedConfig && this.advancedArea) {
        title += ` - ${this.advancedArea.name}`
      }
      this.$set(this.value, 'title', title)
    },
    setArea (area) {
      this.$set(this.value, 'advancedArea', area)
      this.advancedArea = area
      this.setTitle()
    }
  }
}
</script>
