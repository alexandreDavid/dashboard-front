<template>
<div class="h-100">
  <SideBar @close="close()" class="position-relative w-lg bg-light" :is-static="isStatic">
    <div class="container" v-if="!mapIsLoading">
      <div class="row mb-2" id="area-selection-control">
        <div class="card shadow w-100">
          <div class="card-body p-2">
            <h6>Place selection</h6>
            <area-selection-control @change="onAreaChange"></area-selection-control>
          </div>
        </div>
      </div>
      <div class="row mb-2" id="displayed-layers">
        <DisplayedLayers @openAddingLayerSideBar="showModal = true"></DisplayedLayers>
      </div>
      <div class="row mb-2" id="meteo-stations-control">
        <meteo-stations-control @selectedReportedParameter="onSelectedReportedParameter"></meteo-stations-control>
      </div>
    </div>
    <Loading v-else/>
    <catalogue-modal v-if="showModal" @close="showModal = false" @selectedResource="onSelectedResource"></catalogue-modal>
  </SideBar>
</div>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import SideBar from '@/components/SideBar/SideBar'
import Loading from '@/components/Loading/Loading'
import DisplayedLayers from '@/components/DisplayedLayers/DisplayedLayers'
import CatalogueModal from '@/components/Catalogue/CatalogueModal'

import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import MeteoStationsControl from '@/components/Map/MeteoStations/MeteoStationsControl'

import SelectedLayers from '@/store/selectedLayers'

export default {
  name: 'MapControlBar',
  components: {
    Modal,
    CatalogueModal,
    SideBar,
    Loading,
    AreaSelectionControl,
    MeteoStationsControl,
    DisplayedLayers
  },
  props: ['isStatic', 'mapIsLoading'],
  inject: ['getMap', 'getDisplayedLayer', 'getAreaLayer'],
  data () {
    return {
      showModal: false,
      value: 50,
      displayMeteoStations: true
    }
  },
  mounted () {
    this.toggleMeteorologicalStations(this.displayMeteoStations)
  },
  methods: {
    close () {
      this.$emit('close')
    },
    async onAreaChange (area) {
      await this.getAreaLayer().setSelectedArea(area)
      SelectedLayers.updateArea(this.getAreaLayer().toGeoJSON())
    },
    async onSelectedResource (resource) {
      this.$ga.event('resource', 'add', resource.name)
      const newLayer = await SelectedLayers.add(resource, this.getAreaLayer().toGeoJSON())
      newLayer.addTo(this.getMap())
    },
    onSelectedReportedParameter (selectedReportedParameter) {
      this.$emit('selectedReportedLayer', selectedReportedParameter)
    },
    toggleMeteorologicalStations (val) {
      this.$emit('selectedReportedLayer', (val ? {
        label: 'Meteorological stations',
        name: 'meteorological_station'
      } : false))
    }
  },
  watch: {
    displayMeteoStations: 'toggleMeteorologicalStations'
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 576px) {
  #add-layer-sidebar {
    left: 100%;
    z-index: 1029;
  }
}
</style>
