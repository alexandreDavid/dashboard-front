<template>
  <SideBar class="w-md" :is-static="true">
    <div class="container" v-if="isLoaded">
      <button @click="showModal = true" class="btn btn-primary shadow">Open available layers</button>
      <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Select data to display</h3>
        <ForecastSelection slot="body" @selectedParameter="onSelectedParameter"></ForecastSelection>
      </modal>
      <div class="card shadow my-3">
        <div class="card-header">
          Legend
        </div>
        <div class="card-body p-2">
          <h6>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="display-selected-layer" v-model="displaySelectedLayer">
              <label class="form-check-label" for="display-selected-layer">{{ displayedParameter.displayName }}</label>
            </div>
          </h6>
          <Legend class="pl-2"></Legend>
          <div class="border-bottom mb-2 pb-2 pl-2"></div>
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
    </div>
    <Loading v-if="!isLoaded"/>
  </SideBar>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import ForecastSelection from '@/components/Map/OverMap/OverMapControl/Managing/ForecastSelection/ForecastSelection'
import Parameter from '@/store/parameter'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import SideBar from '@/components/SideBar/SideBar'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'MapControlBar',
  components: {
    Modal,
    ForecastSelection,
    Legend,
    FontAwesomeIcon,
    SideBar,
    Loading
  },
  inject: ['getMap', 'getDisplayedLayer'],
  data () {
    return {
      showModal: false,
      showModalReported: false,
      displayedParameter: {},
      value: 50,
      displayMeteoStations: true,
      displaySelectedLayer: true,
      isLoaded: false
    }
  },
  computed: {
    iconEdit () {
      return faEdit
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
    var vm = this
    // On layer displayed change, legend refresh
    vm.getMap().on('layeradd', function () {
      vm.displayedParameter = Parameter.getDisplayedParameter()
    })
    this.toggleMeteorologicalStations(this.displayMeteoStations)
    this.isLoaded = true
  },
  methods: {
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
    }
  },
  watch: {
    displayMeteoStations: 'toggleMeteorologicalStations'
  }
}
</script>
