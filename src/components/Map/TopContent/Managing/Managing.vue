<template>
  <div id="managing">
    <div class="container">
      <div class="row mb-2 justify-content-end">
        <div>
          <span class="badge badge-primary badge-pill">About</span>
          <span class="badge badge-secondary badge-pill">Profile</span>
        </div>
      </div>
      <div class="row mb-2 justify-content-end">
        <a href="#" target="_self" @click="showModal = true" class="badge badge-primary badge-pill">ECMWF: Temperature</a>
        <modal v-if="showModal" @close="showModal = false">
          <h3 slot="header">Forecast model parameters</h3>
          <ForecastSelection slot="body"></ForecastSelection>
        </modal>
      </div>
      <div class="row justify-content-end">
        <a href="#" target="_self" class="badge badge-secondary badge-pill">REPORTED: Temperature</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from '@/components/Modal/Modal'
import ForecastSelection from './ForecastSelection/ForecastSelection.vue'

export default {
  name: 'Managing',
  components: {
    Modal,
    ForecastSelection
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>

<style scoped>

</style>
