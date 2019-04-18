<template>
  <div class="col-12">
    <div class="d-flex flex-column h-100">
      <div class="row mb-3 flex-shrink-1">
        <div class="form-group w-100">
          <label>Name</label>
          <input type="text" v-model="val.name" @input="validateArea(val)" class="form-control" id="name" placeholder="Name">
        </div>
        <div class="w-100">Draw your custom location on the map or upload your file (Coming soon):</div>
        <input class="w-100" disabled type="file" id="myFile">
      </div>
      <div class="row mb-3 h-100">
        <div id="custom-area-map" class="col-12"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import L from 'leaflet'
import 'leaflet-draw'
import { CustomVueControl } from '@/components/Map/Leaflet.customVueControl'
import Vue from 'vue'

export default {
  name: 'EditCustomArea',
  components: {
    SearchLocation
  },
  props: ['value'],
  data () {
    return {
      map: false,
      val: false,
      drawnItems: false,
      drawControl: false,
      searchControl: false,
      searchedArea: false,
      searchLocationSearch: false
    }
  },
  mounted () {
    this.map = new MapObj('custom-area-map')
    this.searchedArea = new AreaLayer(this.map)

    this.searchControl = new CustomVueControl(Vue.extend(SearchLocation), {position: 'topright'})

    // FeatureGroup is to store editable layers
    this.drawnItems = new L.FeatureGroup()
    this.drawControl = new L.Control.Draw({
      draw: {
        polyline: false,
        circlemarker: false,
        marker: false
      },
      edit: {
        featureGroup: this.drawnItems
      }
    })

    this.map.addLayer(this.drawnItems)

    this.map.on(L.Draw.Event.CREATED, (event) => {
      let layer = event.layer
      this.drawnItems.addLayer(layer)
      this.validateArea(this.val)
    })

    this.map.on(`${L.Draw.Event.EDITED} ${L.Draw.Event.DELETED}`, () => {
      this.validateArea(this.val)
    })

    this.loadVal(this.value)
  },
  methods: {
    loadVal (val) {
      this.val = {...val}
      this.drawnItems.clearLayers()
      new L.GeoJSON(val.geom).eachLayer((layer) => {
        if (layer.feature.properties.radius) {
          layer = new L.Circle([layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]], {radius: layer.feature.properties.radius})
        }
        this.drawnItems.addLayer(layer)
      })

      this.drawnItems.addTo(this.map)

      this.map.addControl(this.searchControl)
      this.searchControl.mountedComponent.$on('input', async (val) => {
        val.idArea = val.id
        await this.searchedArea.setSelectedArea(val)
      })

      this.map.addControl(this.drawControl)
      if (this.drawnItems.getBounds().isValid()) {
        this.map.fitBounds(this.drawnItems.getBounds())
      }
    },
    validateArea (area) {
      area.valid = !!area.name
      this.$emit(
        'input',
        Object.assign(area, {
          type: 'custom',
          geom: this.drawnItems.getLayers().map(layer => {
            let obj = layer.toGeoJSON()
            if (layer.getRadius) {
              obj.properties.radius = layer.getRadius()
            }
            return obj
          })
        })
      )
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

#area-map {
  min-height: 300px;
}

</style>
