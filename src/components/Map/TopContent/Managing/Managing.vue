<template>
  <div id="managing">
    <div class="container">
      <div class="row mb-2 justify-content-end">
        <div>
          <span class="badge badge-primary badge-pill shadow">About</span>
          <a href="#" @click="$router.push({ name: 'Login' })" target="_self" class="badge badge-secondary badge-pill shadow">Profile</a>
        </div>
      </div>
      <div class="row mb-2 justify-content-end">
        <a href="#" target="_self" @click="showModal = true" class="badge badge-primary badge-pill shadow" v-if="displayedParameter.displayName">{{displayedParameter.displayName}}</a>
        <a href="#" target="_self" @click="showModal = true" class="badge badge-primary badge-pill shadow" v-else>Select a data</a>
        <modal v-if="showModal" @close="showModal = false">
          <h3 slot="header">Select data to display</h3>
          <ForecastSelection slot="body" @selectedParameter="onSelectedParameter"></ForecastSelection>
        </modal>
      </div>
      <div class="row mb-2 justify-content-end">
        <a href="#" target="_self" class="badge badge-secondary badge-pill">REPORTED: Temperature</a>
      </div>
      <div class="row mb-2 justify-content-end">
        <img v-bind:src="displayedParameter.legendUrl">
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from '@/components/Modal/Modal'
import ForecastSelection from './ForecastSelection/ForecastSelection.vue'
import MapObj from '@/map'
import Parameter from '@/parameter'

export default {
  name: 'Managing',
  components: {
    Modal,
    ForecastSelection
  },
  data() {
    return {
      showModal: false,
      displayedParameter: {}
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
