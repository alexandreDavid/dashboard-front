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
      <edit-area-field v-model="value.advancedArea" @input="setTitle"></edit-area-field>
    </div>
  </div>
</template>

<script>
import EditAreaField from './EditAreaField'
import EditDescriptionField from './EditDescriptionField'
import EditHeightField from './EditHeightField'

import GeoResources from '@/store/geoResources'

export default {
  name: 'GraphEditWidget',
  components: { EditAreaField, EditDescriptionField, EditHeightField },
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
      this.$set(this.value, 'advancedArea', false)
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
      if (this.showAdvancedConfig && this.value.advancedArea) {
        title += ` - ${this.value.advancedArea.name}`
      }
      this.$set(this.value, 'title', title)
    }
  }
}
</script>
