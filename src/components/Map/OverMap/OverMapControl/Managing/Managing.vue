<template>
  <div id="managing">
    <div class="container">
      <div class="row mb-2 justify-content-end">
        <a href="#" id="forecast-selection-btn" target="_self" @click="showModal = true" class="badge badge-primary badge-pill shadow over-map-control">
          {{ displayedParameter.displayName || 'Select a data' }}
        </a>
        <modal v-if="showModal" @close="showModal = false">
          <h3 slot="header">Select data to display</h3>
          <ForecastSelection slot="body" @selectedParameter="onSelectedParameter"></ForecastSelection>
        </modal>
      </div>
      <div class="row mb-2 justify-content-end over-map-control">
        <a href="#" target="_self" @click="showModalReported = true" class="badge badge-secondary badge-pill over-map-control">REPORTED: Temperature</a>
        <modal v-if="showModalReported" @close="showModalReported = false">
          <h3 slot="header">Select data to display</h3>
          <ReportedSelection slot="body" @selectedReportedParameter="onSelectedReportedParameter"></ReportedSelection>
        </modal>
      </div>
      <div class="row mb-2 justify-content-end">
        <Legend class="over-map-control" v-if="displayedParameter.interactiveLegend"></Legend>
        <img v-bind:src="displayedParameter.legendUrl" class="over-map-control" v-else>
      </div>
      <div class="slide-bar-content justify-content-end position-relative m-2" v-if="false">
        <VueSlideBar v-model="value" class="over-map-control"/>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import ForecastSelection from '@/components/Map/OverMap/OverMapControl/Managing/ForecastSelection/ForecastSelection'
import ReportedSelection from '@/components/Map/OverMap/OverMapControl/Managing/ReportedSelection/ReportedSelection'
import Parameter from '@/store/parameter'
import VueSlideBar from '@/components/Slider/Slider'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'

export default {
  name: 'Managing',
  components: {
    Modal,
    ForecastSelection,
    ReportedSelection,
    VueSlideBar,
    Legend
  },
  inject: ['getMap'],
  data () {
    return {
      showModal: false,
      showModalReported: false,
      displayedParameter: {},
      value: 50
    }
  },
  mounted () {
    var vm = this
    // On layer displayed change, legend refresh
    vm.getMap().on('layeradd', function () {
      vm.displayedParameter = Parameter.getDisplayedParameter()
    })
  },
  methods: {
    onSelectedParameter (selectedParameter) {
      this.showModal = false
      this.$emit('selectedParameter', selectedParameter)
    },
    onSelectedReportedParameter (selectedReportedParameter) {
      this.showModalReported = false
      this.$emit('selectedReportedParameter', selectedReportedParameter)
    }
  }
}
</script>
