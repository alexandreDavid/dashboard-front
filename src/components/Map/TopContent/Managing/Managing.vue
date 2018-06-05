<template>
  <div id="managing">
    <div class="container">
      <div class="row mb-2 justify-content-end">
        <a href="#" target="_self" @click="showModal = true" class="badge badge-primary badge-pill shadow over-map-control" v-if="displayedParameter.displayName">{{displayedParameter.displayName}}</a>
        <a href="#" target="_self" @click="showModal = true" class="badge badge-primary badge-pill shadow over-map-control" v-else>Select a data</a>
        <modal v-if="showModal" @close="showModal = false" class="over-map-control">
          <h3 slot="header">Select data to display</h3>
          <ForecastSelection slot="body" @selectedParameter="onSelectedParameter"></ForecastSelection>
        </modal>
      </div>
      <div class="row mb-2 justify-content-end">
        <a href="#" target="_self" class="badge badge-secondary badge-pill over-map-control">REPORTED: Temperature</a>
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
import { Modal } from '@/components/Modal/Modal'
import ForecastSelection from './ForecastSelection/ForecastSelection.vue'
import MapObj from '@/store/map'
import Parameter from '@/store/parameter'
import VueSlideBar from '@/components/Slider/Slider'

export default {
  name: 'Managing',
  components: {
    Modal,
    ForecastSelection,
    VueSlideBar
  },
  data() {
    return {
      showModal: false,
      displayedParameter: {},
      value: 50
    }
  },
  mounted() {
    var vm = this
    // On layer displayed change, legend refresh
    MapObj.getMap().on('layeradd', function () {
      vm.displayedParameter = Parameter.getDisplayedParameter()
    })
  },
  methods: {
    onSelectedParameter() {
      this.showModal = false
    }
  }
}
</script>
