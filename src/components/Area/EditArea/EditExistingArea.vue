<template>
  <div class="d-flex flex-column h-100 col-12">
    <div class="row flex-shrink-1">
      <div class="form-group w-100">
        <label>Select an area</label>
        <SearchLocation class="w-100" v-model="searchLocationSearch" @input="searchLocationSelected" />
      </div>
    </div>
    <div class="row mb-3 h-100">
      <div id="existing-area-map" class="col-12"></div>
    </div>
  </div>
</template>

<script>
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'

export default {
  name: 'EditExistingArea',
  components: {
    SearchLocation
  },
  props: ['value'],
  data () {
    return {
      map: false,
      val: false,
      areaLayer: false,
      searchLocationSearch: false
    }
  },
  mounted () {
    this.map = new MapObj('existing-area-map')
    this.areaLayer = new AreaLayer(this.map)

    this.loadVal(this.value)
  },
  methods: {
    loadVal (val) {
      this.val = {...val}
      this.areaLayer.remove()
      this.searchLocationSearch = {...val}
      if (val.id) {
        this.areaLayer.setSelectedArea(val)
      }
      this.goToExistingArea()
    },
    goToExistingArea () {
      this.areaLayer.add()
      this.areaLayer.zoomToArea()
    },
    searchLocationSelected (val) {
      this.val.id_area = val.id
      this.val.name = val.name
      this.areaLayer.setSelectedArea(this.val)
      this.validateArea(this.val)
    },
    validateArea (area) {
      area.valid = !!area.name
      this.$emit('input', Object.assign(area, this.areaLayer.getSelectedArea()))
    }
  },
  watch: {
    value () {
      this.loadVal(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>

#existing-area-map {
  min-height: 300px;
}

</style>
