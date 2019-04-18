<template>
  <div class="area-details">
    <div class="d-flex flex-column h-100">
      <h4 v-if="isEditing" class="row flex-shrink-1">{{ valueModel && valueModel.id ? 'Edit an area' : 'New area' }}</h4>
      <h4 v-else class="row flex-shrink-1">
        {{ valueModel.name }}
        <button type="button" v-if="!isEditing" class="btn btn-light ml-2" title="Edit area" @click="edit"><font-awesome-icon icon="edit" /></button>
      </h4>
      <div class="row h-100 position-relative">
        <edit-area v-model="valueModel" v-if="isEditing"></edit-area>
        <div id="area-map" v-else class="col-12"></div>
      </div>
      <div class="row mb-3 flex-shrink-1" v-if="isEditing && valueModel.type">
        <div>
          <button class="btn btn-secondary" v-if="valueModel.id" @click="cancel">Cancel</button>
          <button class="btn btn-success" :disabled="!valueModel.valid" @click="validate">Validate</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditArea from './EditArea'

import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'

export default {
  name: 'AreaDetails',
  components: {
    EditArea
  },
  props: ['value'],
  data () {
    return {
      valueModel: false,
      isEditing: false,
      map: false,
      areaLayer: false,
      areaTypes: [
        {
          type: 'custom',
          label: 'Custom area'
        }, {
          type: 'existing',
          label: 'Existing area'
        }
      ]
    }
  },
  mounted () {
    this.loadArea(this.value)
  },
  methods: {
    async loadArea (val) {
      this.valueModel = val
      this.isEditing = !(val && val.name)
      if (!this.isEditing) {
        await this.$nextTick()
        this.map = this.map || new MapObj('area-map')
        this.areaLayer = this.areaLayer || new AreaLayer(this.map)
        this.areaLayer.setSelectedArea(this.valueModel)
      } else {
        this.map && this.map.remove()
        this.map = false
        this.areaLayer = false
      }
    },
    edit () {
      this.isEditing = true
      this.map && this.map.remove()
      this.map = false
      this.areaLayer = false
    },
    validate () {
      this.$emit('input', this.valueModel)
      this.loadArea(this.valueModel)
    },
    cancel () {
      this.loadArea(this.value)
    }
  },
  watch: {
    value: 'loadArea'
  }
}
</script>

<style lang="scss" scoped>

.area-details {
  position: absolute;
  top: 0;
  bottom: 0;
}

#area-map {
  min-height: 300px;
}

</style>
