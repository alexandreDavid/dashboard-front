<template>
  <div id="managing">
    <div class="container">
      <div class="row mb-2 justify-content-end">
        <a href="#" id="forecast-selection-btn" target="_self" @click="showModal = true" class="badge badge-primary badge-pill shadow over-map-control">
          {{ displayedParameter.displayName || 'Select a data' }}
        </a>
        <modal v-if="showModal" @close="showModal = false" class="over-map-control">
          <h3 slot="header">Select data to display</h3>
          <ForecastSelection slot="body" @selectedParameter="onSelectedParameter"></ForecastSelection>
        </modal>
      </div>
      <div class="row mb-2 justify-content-end">
        <a href="#" target="_self" @click="showModalReported = true" class="badge badge-secondary badge-pill over-map-control">REPORTED: Temperature</a>
        <modal v-if="showModalReported" @close="showModalReported = false" class="over-map-control">
          <h3 slot="header">Select data to display</h3>
          <ReportedSelection slot="body" @selectedParameter="onSelectedParameter"></ReportedSelection>
        </modal>
      </div>
      <div class="row mb-2 justify-content-end over-map-control">
        <img v-bind:src="displayedParameter.legendUrl">
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

export default {
  name: 'Managing',
  components: {
    Modal,
    ForecastSelection,
    ReportedSelection,
    VueSlideBar
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
    }
  }
}
</script>
