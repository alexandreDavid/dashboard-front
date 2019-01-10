<template>
  <div class="container">
    <div class="row">
      <h4>{{ val.name }}</h4>
    </div>
    <area-edition-form v-model="val" @input="change"></area-edition-form>
    <button class="btn btn-secondary" @click="cancel">Cancel</button>
    <button class="btn btn-primary" @click="validateArea(val)" :disabled="!val.valid">Save</button>
  </div>
</template>

<script>
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import AreaEditionForm from './AreaEditionForm'

export default {
  name: 'AreaEdition',
  components: {
    SearchLocation, AreaEditionForm
  },
  props: ['value'],
  data () {
    return {
      map: false,
      val: false,
      areaLayer: false,
      activeAreaType: false,
      drawnItems: false,
      drawControl: false,
      searchLocationSearch: false,
      areaTypes: [
        {
          type: 'existing',
          label: 'Existing area'
        }, {
          type: 'custom',
          label: 'Custom area'
        }
      ]
    }
  },
  mounted () {
    this.val = this.value
  },
  methods: {
    change (area) {
      this.val = area
    },
    validateArea (area) {
      this.$emit('input', area)
    },
    cancel () {
      this.val = this.value
    }
  },
  watch: {
    value () {
      this.val = this.value
    }
  }
}
</script>

<style lang="scss" scoped>

#area-map {
  min-height: 300px;
}

</style>
