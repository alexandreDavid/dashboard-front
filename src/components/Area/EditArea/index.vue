<template>
  <div class="area-edit">
    <div class="d-flex flex-column h-100 col-12">
      <div class="row flex-shrink-1" v-if="isNew">
        <div class="form-group mb-2">
          <div class="custom-control custom-radio custom-control-inline" v-for="areaType in areaTypes" :key="areaType.type">
            <input type="radio" :id="`area-type-${areaType.type}`" @click="switchType" v-model="valueModel.type" name="type" :value="areaType.type" class="custom-control-input" required>
            <label class="custom-control-label" :for="`area-type-${areaType.type}`">{{ areaType.label }}</label>
          </div>
        </div>
      </div>
      <div class="row h-100">
        <edit-custom-area v-if="valueModel.type === 'custom'" v-model="valueModel"></edit-custom-area>
        <edit-existing-area v-if="valueModel.type === 'existing'" v-model="valueModel"></edit-existing-area>
      </div>
    </div>
  </div>
</template>

<script>
import EditCustomArea from './EditCustomArea'
import EditExistingArea from './EditExistingArea'

export default {
  name: 'EditArea',
  components: {
    EditCustomArea, EditExistingArea
  },
  props: ['value', 'forceNew'],
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
      isNew: false,
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
    this.isNew = this.forceNew || !this.value || !this.value.id
  },
  methods: {
    switchType () {
      this.valueModel.name = ''
    }
  },
  watch: {
    value (val) {
      this.isNew = this.forceNew || !val || !val.id
    }
  }
}
</script>

<style lang="scss" scoped>

.area-edit {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

</style>
