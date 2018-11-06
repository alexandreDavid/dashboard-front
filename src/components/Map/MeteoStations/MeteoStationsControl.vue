<template>
  <div class="card shadow w-100">
    <div class="card-body p-2">
      <h6>
          <button class="btn btn-xs btn-secondary flex-shrink-1" @click="toggleMeteorologicalStations"><font-awesome-icon v-bind:icon="displayMeteoStations ? 'eye' : 'eye-slash'" /></button>
          <span class="form-check-label">Meteorological stations</span>
      </h6>
      <div class="pl-2">
        <svg width="10" height="10">
          <circle cx="5" cy="5" r="5" stroke="#FFF" stroke-opacity="1" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="#d57" fill-opacity="1" fill-rule="evenodd" d="M57,860a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "></circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeteoStationsControl',
  data () {
    return {
      displayMeteoStations: true
    }
  },
  methods: {
    toggleMeteorologicalStations () {
      this.displayMeteoStations = !this.displayMeteoStations
      this.$emit('selectedReportedParameter', (this.displayMeteoStations ? {
        label: 'Meteorological stations',
        name: 'meteorological_station'
      } : false))
    }
  }
}
</script>
