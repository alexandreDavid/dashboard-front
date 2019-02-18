<template>
  <div class="container">
    <div class="form-group">
      <label for="title">Title</label>
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
    <div class="form-group">
      <label for="description">Description</label>
      <textarea v-model="value.description" class="form-control" placeholder="Description" aria-label="Description"></textarea>
    </div>
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
      <div class="form-group">
        <label class="w-100" for="title">Height</label>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-sm btn-secondary" @click="setAdvancedHeight('default')" v-bind:class="{active: advancedHeight === 'default'}">Default</button>
          <button type="button" class="btn btn-sm btn-secondary" @click="setAdvancedHeight('large')" :class="{active: advancedHeight === 'large'}">Large</button>
          <button type="button" class="btn btn-sm btn-secondary" @click="setAdvancedHeight('custom')" :class="{active: advancedHeight === 'custom'}">
            <div class="form-inline">
              <label for="custom-height" class="mr-1">Custom</label>
              <div class="input-group input-group-sm">
                <input id="custom-height" type="number" :disabled="advancedHeight !== 'custom'" v-model="value.advancedCustomHeight" class="form-control" placeholder="Height" aria-label="Height">
                <div class="input-group-append">
                  <span class="input-group-text">px</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div class="form-group">
        <label>Area</label>
        <area-selection-control v-model="advancedArea" @change="setArea"></area-selection-control>
      </div>
    </div>
  </div>
</template>

<script>
import GeoResources from '@/store/geoResources'
import OpacitySlider from '@/components/Slider/OpacitySlider'
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'

import DefinedAreas from '@/store/definedAreas'

export default {
  name: 'MapEditWidget',
  components: { OpacitySlider, AreaSelectionControl },
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
      advancedHeight: 'default',
      advancedArea: {}
    }
  },
  mounted () {
    this.showAdvancedConfig = this.value.advancedConfig
    if (!this.showAdvancedConfig) {
      this.$set(this.value, 'advancedConfig', false)
      this.$set(this.value, 'advancedOpacity', 80)
      this.$set(this.value, 'advancedHeight', 'default')
      this.$set(this.value, 'advancedCustomHeight', '')
      this.$set(this.value, 'advancedArea', DefinedAreas.getActiveArea())
    }
    this.advancedHeight = this.value.advancedHeight
    this.advancedArea = this.value.advancedArea
    this.setTitle()

    const allResources = GeoResources.getAll()
    this.resources = allResources.map(p => ({
      id: p.id,
      label: p.label
    }))
  },
  methods: {
    changeResource (resource) {
      this.$set(this.value, 'title', resource.label)
      this.value.resource = resource
    },
    setShowAdvancedSettings (val) {
      this.showAdvancedConfig = val
      this.setTitle()
      this.$set(this.value, 'advancedConfig', val)
    },
    setAdvancedHeight (type) {
      this.$set(this.value, 'advancedHeight', type)
      this.advancedHeight = type
    },
    setArea (area) {
      this.$set(this.value, 'advancedArea', area)
      this.advancedArea = area
      this.setTitle()
    },
    setTitle () {
      let title = this.value.resource && this.value.resource.label
      if (this.showAdvancedConfig && this.advancedArea) {
        title += ` - ${this.advancedArea.name}`
      }
      this.$set(this.value, 'title', title)
    }
  }
}
</script>
