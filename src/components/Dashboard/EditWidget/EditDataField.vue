<template>
  <div class="form-group">
      <label>Data to display <small>(required)</small></label>
      <select class="custom-select" v-model="valueModel" v-bind:class="{'is-invalid': !valueModel && required}">
        <optgroup v-for="group in groups" :key="group.id" :label="group.label">
          <option v-for="resource in getResourcesByGroup(group.id)" :key="resource.id" v-bind:value="resource">
            {{ resource.label }}
          </option>
        </optgroup>
      </select>
      <div class="invalid-feedback">
        Please choose a data.
      </div>
    </div>
</template>

<script>
import GeoResourcesGroups from '@/store/geoResourcesGroups'
import GeoResources from '@/store/geoResources'

export default {
  name: 'EditDataField',
  props: [ 'value', 'required', 'filter' ],
  computed: {
    valueModel: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      groups: [],
      resources: []
    }
  },
  async mounted () {
    this.groups = await GeoResourcesGroups.getAllGroups()
  },
  methods: {
    getResourcesByGroup (id) {
      return GeoResources.getAll().filter(r => {
        return r.groups.indexOf(id) !== -1 && (!this.filter || this.filter(r))
      }).map(p => ({
        id: p.id,
        label: p.label
      }))
    }
  }
}
</script>
