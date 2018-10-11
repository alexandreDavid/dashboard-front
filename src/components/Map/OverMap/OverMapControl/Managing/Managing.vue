<template>
  <div id="managing" class="w-100">
    <button id="forecast-selection-btn" @click="showModal = true" class="btn btn-primary shadow over-map-control position-relative w-100">Display available layers</button>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Select data to display</h3>
      <ForecastSelection slot="body" @selectedParameter="onSelectedParameter"></ForecastSelection>
    </modal>
        <displayed-layer-control v-bind:parameter="displayedParameter"></displayed-layer-control>
    <div class="card shadow my-2 over-map-control">
      <div class="card-body p-2">
        <h6>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="meteo-stations" v-model="displayMeteoStations">
            <label class="form-check-label" for="meteo-stations">Meteorological stations</label>
          </div>
        </h6>
        <div class="pl-2">
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" stroke="#FFF" stroke-opacity="1" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="#d57" fill-opacity="1" fill-rule="evenodd" d="M57,860a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "></circle>
          </svg>
        </div>
      </div>
    </div>
    <!-- <div class="slide-bar-content justify-content-end position-relative m-2">
      <ElevationSlider v-model="value" class="over-map-control" v-if="displayedParameter.interactiveLegend"/>
    </div> -->
  </div>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import ForecastSelection from '@/components/Map/OverMap/OverMapControl/Managing/ForecastSelection/ForecastSelection'
import Parameter from '@/store/parameter'
import ElevationSlider from '@/components/Slider/ElevationSlider'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import Unit from '@/utils/unit'
import Settings from '@/store/settings'
import DisplayedLayerControl from '@/components/Map/DisplayedLayer/DisplayedLayerControl'

export default {
  name: 'Managing',
  components: {
    Modal,
    ForecastSelection,
    ElevationSlider,
    Legend,
    DisplayedLayerControl
  },
  inject: ['getMap', 'getDisplayedLayer'],
  data () {
    return {
      showModal: false,
      showModalGraph: false,
      showModalReported: false,
      displayedParameter: {},
      displayMeteoStations: true,
      displaySelectedLayer: true,
      selectedArea: false,
      value: 50,
      activeUnits: Settings.activeSettings
    }
  },
  async created () {
    let displayedParameter = Parameter.getDisplayedParameter()
    if (!displayedParameter) {
      const allParams = await Parameter.getAllParameters()
      displayedParameter = allParams[0]
    }
    this.onSelectedParameter(displayedParameter)
  },
  mounted () {
    this.toggleMeteorologicalStations(this.displayMeteoStations)
  },
  methods: {
    onSelectedParameter (selectedParameter) {
      this.showModal = false
      let vm = this
      vm.displayedParameter = false
      this.$nextTick(function () {
        vm.displayedParameter = selectedParameter
      })
      Parameter.setDisplayedParameter(selectedParameter)
      this.getDisplayedLayer().setDisplayedLayer(selectedParameter)
      this.getDisplayedLayer().setOpacity(40)
      this.changeActiveUnit(this.getDisplayedLayer().getUnit())
      this.$emit('selectedParameter', selectedParameter)
    },
    toggleMeteorologicalStations (val) {
      this.$emit('selectedReportedParameter', (val ? {
        label: 'Meteorological stations',
        name: 'meteorological_station'
      } : false))
    },
    changeActiveUnit (unit) {
      this.getDisplayedLayer().setUnit(unit)
    }
  },
  watch: {
    displayMeteoStations: 'toggleMeteorologicalStations',
    activeUnits: {
      handler (val) {
        this.changeActiveUnit(val[Unit.getFamilyUnit(this.displayedParameter.unit)])
      },
      deep: true
    }
  }
}
</script>
