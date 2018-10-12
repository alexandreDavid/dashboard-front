<template>
  <SideBar @close="close()" class="w-lg bg-light" :is-static="isStatic">
    <div class="container" v-if="isLoaded">
      <div class="row">
        <area-selection-control class="shadow w-100 mb-2"></area-selection-control>
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

import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
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
    Managing
  },
  props: ['isStatic'],
  inject: ['getMap', 'getDisplayedLayer', 'getAreaLayer'],
  data () {
    return {
      showModal: false,
      displayedParameter: {},
      value: 50,
      displayMeteoStations: true,
      displaySelectedLayer: true,
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
