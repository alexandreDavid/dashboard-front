<template>
<div class="h-100">
  <SideBar @close="close()" class="position-relative w-lg bg-light" :is-static="isStatic">
    <div class="container" v-if="isLoaded">
      <div class="row mb-2">
        <area-selection-control class="shadow w-100"></area-selection-control>
      </div>
      <div class="row mb-2">
        <DisplayedLayers v-model="displayedLayers" @input="updateDisplayedLayers" @openAddingLayerSideBar="showModal = true"></DisplayedLayers>
      </div>
      <div class="row mb-2">
        <Managing @selectedReportedParameter="onSelectedReportedParameter"></Managing>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
  </SideBar>
  <SideBar v-if="showModal" @close="showModal = false" title="Add a new layer" id="add-layer-sidebar" class="position-absolute w-lg bg-light">
    <Catalogue @selectedParameter="onSelectedParameter"></Catalogue>
  </SideBar>
</div>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import Parameter from '@/store/parameter'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import SideBar from '@/components/SideBar/SideBar'
import Loading from '@/components/Loading/Loading'
import DisplayedLayers from '@/components/DisplayedLayers/DisplayedLayers'
import Catalogue from '@/components/Catalogue/Catalogue'

import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import Managing from '@/components/Map/OverMap/OverMapControl/Managing/Managing'

import SelectedLayers from '@/store/selectedLayers'

export default {
  name: 'MapControlBar',
  components: {
    Modal,
    Catalogue,
    Legend,
    SideBar,
    Loading,
    AreaSelectionControl,
    Managing,
    DisplayedLayers
  },
  props: ['isStatic'],
  inject: ['getMap', 'getDisplayedLayer', 'getAreaLayer'],
  data () {
    return {
      showModal: false,
      value: 50,
      displayMeteoStations: true,
      isLoaded: false,
      displayedLayers: []
    }
  },
  async created () {
    this.displayedLayers = Parameter.getDisplayedParameters()
    if (!this.displayedLayers.length) {
      const allParams = await Parameter.getAllParameters()
      this.displayedLayers.push(allParams[0])
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
    updateDisplayedLayers (val) {
      this.displayedLayers = val
    },
    onSelectedParameter (selectedParameter) {
      this.showModal = false
      this.displayedLayers.unshift(selectedParameter)
      SelectedLayers.add(selectedParameter).addTo(this.getMap())
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
