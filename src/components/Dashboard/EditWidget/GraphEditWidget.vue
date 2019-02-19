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
  </div>
</template>

<script>
import GeoResources from '@/store/geoResources'
import EditDescriptionField from './EditDescriptionField'

export default {
  name: 'GraphEditWidget',
  components: { EditDescriptionField },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      resources: []
    }
  },
  mounted () {
    const allResources = GeoResources.getAll()
    this.resources = allResources.filter(p => p.config.statistics).map(p => ({
      id: p.id,
      label: p.label
    }))
  },
  methods: {
    changeResource (resource) {
      this.value.title = resource.label
      this.value.resource = resource
    }
  }
}
</script>
