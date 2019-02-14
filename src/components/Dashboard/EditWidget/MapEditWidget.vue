<template>
  <div>
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
  </div>
</template>

<script>
import GeoResources from '@/store/geoResources'

export default {
  name: 'MapEditWidget',
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
    this.resources = allResources.map(p => ({
      id: p.id,
      label: p.label
    }))
  },
  methods: {
    changeResource (resource) {
      this.$set(this.value, 'title', resource.label)
      this.value.resource = resource
    }
  }
}
</script>