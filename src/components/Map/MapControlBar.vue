<template>
  <SideBar @close="close()" class="w-lg bg-light" :is-static="isStatic">
    <area-selection-modal v-if="displayAreaSelectionModal" v-model="selectedArea" @input="onSearchLocationSelected" @close="displayAreaSelectionModal = false"></area-selection-modal>
    <div class="container" v-if="isLoaded">
      <div class="row">
        <area-selection-control @input="onSearchLocationSelected" v-model="selectedArea" @openSelectionModal="displayAreaSelectionModal = true" @zoomToArea="zoomToArea" class="shadow w-100 mb-2"></area-selection-control>
      </div>
      <div class="row">
        <Managing @selectedParameter="onSelectedParameter" @selectedReportedParameter="onSelectedReportedParameter"></Managing>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
  </SideBar>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import ForecastSelection from '@/components/Map/OverMap/OverMapControl/Managing/ForecastSelection/ForecastSelection'
import Parameter from '@/store/parameter'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import SideBar from '@/components/SideBar/SideBar'
import Loading from '@/components/Loading/Loading'
import Area from '@/store/area'

import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import AreaSelectionModal from '@/components/Area/AreaSelectionModal'
import Managing from '@/components/Map/OverMap/OverMapControl/Managing/Managing'

export default {
  name: 'MapControlBar',
  components: {
    Modal,
    ForecastSelection,
    Legend,
    SideBar,
    Loading,
    AreaSelectionControl,
    AreaSelectionModal,
    Managing
  },
  props: ['isStatic'],
  inject: ['getMap', 'getDisplayedLayer', 'getAreaLayer'],
  data () {
    return {
      showModal: false,
      showModalReported: false,
      displayedParameter: {},
      value: 50,
      displayMeteoStations: true,
      displaySelectedLayer: true,
      displayAreaSelectionModal: false,
      selectedArea: false,
      isLoaded: false
    }
  },
  mounted () {
    this.toggleMeteorologicalStations(this.displayMeteoStations)
    this.selectedArea = Area.getSelectedArea()
    this.areaLayer = this.getAreaLayer()
    this.isLoaded = true
  },
  methods: {
    close () {
      this.$emit('close')
    },
    onSelectedParameter (selectedParameter) {
      this.showModal = false
      if (selectedParameter) {
        this.displayedParameter = selectedParameter
        Parameter.setDisplayedParameter(selectedParameter)
        this.getDisplayedLayer().setDisplayedLayer(selectedParameter)
      }
      this.$emit('selectedParameter', selectedParameter)
    },
    onSelectedReportedParameter (selectedReportedParameter) {
      this.showModalReported = false
      this.$emit('selectedReportedLayer', selectedReportedParameter)
    },
    toggleMeteorologicalStations (val) {
      this.$emit('selectedReportedLayer', (val ? {
        label: 'Meteorological stations',
        name: 'meteorological_station'
      } : false))
    },
    onSearchLocationSelected (newValue) {
      if (newValue) {
        Area.setSelectedArea(newValue)
        this.getAreaLayer().setSelectedArea(newValue)
      }
    },
    zoomToArea () {
      this.getAreaLayer().zoomToArea()
    }
  },
  watch: {
    displayMeteoStations: 'toggleMeteorologicalStations'
  }
}
</script>
