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
      <div class="form-group" v-if="allDates.length">
        <label>Date range</label>
        <graph-range-slider @input="datesChange" v-model="selectedDates" v-bind:data="allDates"></graph-range-slider>
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
import GraphRangeSlider from '@/components/Slider/GraphRangeSlider'

import GeoResources from '@/store/geoResources'

export default {
  name: 'GraphEditWidget',
  mixins: [ CustomTitleMixin ],
  components: { AreaSelectionControl, EditDataField, EditDescriptionField, EditHeightField, GraphRangeSlider },
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
      allDates: [],
      selectedDates: [],
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
    if (this.value.resource) {
      this.allDates = GeoResources.searchById(this.value.resource.id).config.statistics.params.date.values
      this.selectedDates = [this.value.startDate, this.value.endDate]
    }
  },
  methods: {
    changeResource (resource) {
      // this.value.resource = resource
      this.checkValidity()
      this.setTitle()
      this.allDates = GeoResources.searchById(resource.id).config.statistics.params.date.values
      this.selectedDates = [this.allDates[0], this.allDates[this.allDates.length - 1]]
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
    },
    datesChange (newDates) {
      this.$set(this.value, 'startDate', newDates[0])
      this.$set(this.value, 'endDate', newDates[1])
    }
  }
}
</script>
