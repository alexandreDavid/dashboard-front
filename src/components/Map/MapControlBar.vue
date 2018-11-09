<template>
<div class="h-100">
  <SideBar @close="close()" class="position-relative w-lg bg-light" :is-static="isStatic">
    <div class="container" v-if="isLoaded">
      <div class="row mb-2">
        <area-selection-control @change="onAreaChange" class="shadow w-100"></area-selection-control>
      </div>
      <div class="row mb-2">
        <DisplayedLayers v-if="!mapIsLoading" @openAddingLayerSideBar="showModal = true"></DisplayedLayers>
        <Loading class="w-100" v-else/>
      </div>
      <div class="row mb-2">
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
  props: ['isStatic', 'mapIsLoading'],
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
    onAreaChange (area) {
      SelectedLayers.updateArea(this.getAreaLayer().toGeoJSON())
    },
    async onSelectedResource (resource) {
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
