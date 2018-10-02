<template>
  <modal @close="close()">
    <div slot="header">Area selection</div>
    <div slot="body" class="area-selection-modal-content container">
      <div class="row mb-3">
        <div class="btn-group" role="group" aria-label="area type">
          <button v-for="areaType in areaTypes" :key="areaType.type" @click="switchAreaType(areaType.type)" type="button" class="btn btn-primary"  v-bind:class="{active: areaType.type === activeAreaType}">{{ areaType.label }}</button>
        </div>
      </div>
      <div class="row mb-3" v-if="activeAreaType === 'existing'">
        <div class="col-12">Select an area:</div>
        <SearchLocation class="col-12" v-model="searchLocationSearch" @input="searchLocationSelected" />
      </div>
      <div class="row mb-3" v-else>
        <div class="col-12">Draw your custom location on the map or upload your file (Coming soon):</div>
        <input class="col-12" disabled type="file" id="myFile">
      </div>
      <div class="row">
        <div id="area-map" class="col-12"></div>
      </div>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="close()">Cancel</button>
      <button type="button" class="btn btn-primary" @click="selectArea">Select</button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import L from 'leaflet'
import 'leaflet-draw'
// console.log(L.Control.Draw)

// import Loading from '@/components/Loading/Loading'

export default {
  name: 'AreaSelectionModal',
  components: {
    Modal,
    SearchLocation
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {}
    }
  },
  props: ['value'],
  data () {
    return {
      map: false,
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
    this.activeAreaType = (this.val && this.val.type === 'custom' ? 'custom' : 'existing')
    this.map = new MapObj('area-map')
    this.areaLayer = new AreaLayer(this.map)
    // FeatureGroup is to store editable layers
    this.drawnItems = new L.FeatureGroup()
    this.drawControl = new L.Control.Draw({
      draw: {
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false
      },
      edit: {
        featureGroup: this.drawnItems
      }
    })

    if (this.activeAreaType === 'custom') {
      this.val.geom.eachLayer((layer) => this.drawnItems.addLayer(layer))
      this.goToCustom()
    } else {
      this.areaLayer.setSelectedArea(this.val)
      this.searchLocationSearch = this.val
      this.goToExistingArea()
    }
    this.map.addLayer(this.drawnItems)

    this.map.on(L.Draw.Event.CREATED, (event) => {
      var layer = event.layer
      this.drawnItems.addLayer(layer)
    })
  },
  methods: {
    switchAreaType (type) {
      this.activeAreaType = type
      if (type === 'existing') {
        this.goToExistingArea()
      } else {
        this.goToCustom()
      }
    },
    goToExistingArea () {
      this.areaLayer.show()
      this.areaLayer.zoomToArea()
      this.drawnItems.remove()
      this.map.removeControl(this.drawControl)
    },
    goToCustom () {
      this.areaLayer.hide()
      this.drawnItems.addTo(this.map)
      this.map.addControl(this.drawControl)
      if (this.drawnItems.getBounds().isValid()) {
        this.map.fitBounds(this.drawnItems.getBounds())
      }
    },
    close () {
      this.$emit('close')
    },
    searchLocationSelected (val) {
      this.areaLayer.setSelectedArea(val)
    },
    selectArea () {
      if (this.activeAreaType === 'existing') {
        this.$emit('input', this.areaLayer.getSelectedArea())
      } else {
        this.$emit('input', {
          name: 'Custom area',
          type: 'custom',
          geom: this.drawnItems
        })
      }
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>

#area-map {
  min-height: 300px;
}

</style>
