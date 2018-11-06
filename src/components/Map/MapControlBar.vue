<template>
<div class="h-100">
  <SideBar @close="close()" class="position-relative w-lg bg-light" :is-static="isStatic">
    <div class="container" v-if="isLoaded">
      <div class="row mb-2">
        <area-selection-control class="shadow w-100"></area-selection-control>
      </div>
      <div class="row mb-2">
        <DisplayedLayers @openAddingLayerSideBar="showModal = true"></DisplayedLayers>
      </div>
      <div class="row mb-2">
        <meteo-stations-control @selectedReportedParameter="onSelectedReportedParameter"></meteo-stations-control>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
  </SideBar>
  <catalogue-modal v-if="showModal" @close="showModal = false" @selectedRessource="onSelectedRessource"></catalogue-modal>
</div>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
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
    Legend,
    SideBar,
    Loading,
    AreaSelectionControl,
    MeteoStationsControl,
    DisplayedLayers
  },
  props: ['isStatic'],
  inject: ['getMap', 'getDisplayedLayer', 'getAreaLayer'],
  data () {
    return {
      showModal: false,
      value: 50,
      displayMeteoStations: true,
      isLoaded: false
    }
  },
  mounted () {
    this.toggleMeteorologicalStations(this.displayMeteoStations)
    this.isLoaded = true
  },
  methods: {
    close () {
      this.$emit('close')
    },
    onSelectedRessource (ressource) {
      SelectedLayers.add(ressource).addTo(this.getMap())
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
