<template>
  <div>
    <div class="row">
      <div class="form-group mb-2">
        <div class="custom-control custom-radio custom-control-inline" v-for="areaType in areaTypes" :key="areaType.type">
          <input type="radio" @click="switchAreaType(areaType.type)" :id="`area-type-${areaType.type}`" v-model="val.type" name="type" :value="areaType.type" class="custom-control-input" required>
          <label class="custom-control-label" :for="`area-type-${areaType.type}`">{{ areaType.label }}</label>
        </div>
      </div>
    </div>
    <div class="row mb-3" v-if="activeAreaType === 'existing'">
      <div class="w-100">Select an area:</div>
      <SearchLocation class="w-100" v-model="searchLocationSearch" @input="searchLocationSelected" />
    </div>
    <div class="row mb-3" v-else>
      <div class="w-100">Draw your custom location on the map or upload your file (Coming soon):</div>
      <input class="w-100" disabled type="file" id="myFile">
    </div>
    <div class="row mb-3">
      <div id="area-map" class="col-12"></div>
    </div>
  </div>
</template>

<script>
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import L from 'leaflet'
import 'leaflet-draw'
import AreaNameInput from './AreaNameInput'
import { CustomVueControl } from './Leaflet.customVueControl'
import Vue from 'vue'

export default {
  name: 'AreaEdition',
  components: {
    SearchLocation
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
      nameControl: false,
      searchControl: false,
      searchedArea: false,
      searchLocationSearch: false,
      areaTypes: [
        {
          type: 'custom',
          label: 'Custom area'
        }, {
          type: 'existing',
          label: 'Existing area'
        }
      ],
      test: false
    }
  },
  mounted () {
    this.map = new MapObj('area-map')
    this.areaLayer = new AreaLayer(this.map)
    this.searchedArea = new AreaLayer(this.map)

    this.nameControl = new CustomVueControl(Vue.extend(AreaNameInput))
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
      this.activeAreaType = (val && val.type === 'existing' ? 'existing' : 'custom')
      this.val.type = this.activeAreaType
      this.drawnItems.clearLayers()
      this.areaLayer.remove()
      if (this.val.type === 'custom') {
        new L.GeoJSON(val.geom).eachLayer((layer) => {
          if (layer.feature.properties.radius) {
            layer = new L.Circle([layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]], {radius: layer.feature.properties.radius})
          }
          this.drawnItems.addLayer(layer)
        })
        this.goToCustom()
      } else {
        this.searchLocationSearch = {...val}
        if (val.id) {
          this.areaLayer.setSelectedArea(val)
        }
        this.goToExistingArea()
      }
    },
    switchAreaType (type) {
      this.activeAreaType = type
      if (type === 'existing') {
        this.goToExistingArea()
      } else {
        this.goToCustom()
      }
    },
    goToExistingArea () {
      this.areaLayer.add()
      this.areaLayer.zoomToArea()
      this.drawnItems.remove()
      this.map.removeControl(this.nameControl)
      this.map.removeControl(this.drawControl)
      this.map.removeControl(this.searchControl)
      this.searchedArea.remove()
    },
    addNameControl () {
      this.map.addControl(this.nameControl)
      this.nameControl.mountedComponent.$set(this.nameControl.mountedComponent.$props, 'value', this.val.name || '')
      this.nameControl.mountedComponent.$on('input', (name) => {
        this.val.name = name
        this.validateArea(this.val)
      })
    },
    addSearchControl () {
      this.map.addControl(this.searchControl)
      this.searchControl.mountedComponent.$on('input', async (val) => {
        val.idArea = val.id
        await this.searchedArea.setSelectedArea(val)
      })
    },
    goToCustom () {
      this.areaLayer.remove()
      this.drawnItems.addTo(this.map)

      this.addSearchControl()

      if (this.val.name) {
        this.addNameControl()
      }
      this.map.addControl(this.drawControl)
      if (this.drawnItems.getBounds().isValid()) {
        this.map.fitBounds(this.drawnItems.getBounds())
      }
    },
    searchLocationSelected (val) {
      this.val.idArea = val.id
      this.val.name = val.name
      this.areaLayer.setSelectedArea(this.val)
      this.validateArea(this.val)
    },
    validateArea (area) {
      if (!area.name) {
        this.map.removeControl(this.drawControl)
        this.addNameControl()
        return
      }
      area.valid = !!area.name
      if (area.type !== 'custom') {
        this.$emit('input', Object.assign(area, this.areaLayer.getSelectedArea()))
      } else {
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
