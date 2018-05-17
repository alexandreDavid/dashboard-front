<template>
  <div id="forecast-selection">
    <div class="btn-group btn-group-toggle mb-3" data-toggle="buttons" v-if="isLoaded">
      <label class="btn btn-primary" v-for="forecastModel in forecastModels" :key="forecastModel.id" v-bind:class="{ active: forecastModel.active }">
        <input type="radio" name="options" id="forecastModel.id" autocomplete="off" @click="selectForecastModel(forecastModel)"> {{forecastModel.label}}</label>
    </div>
    <div class="list-group" v-if="isLoaded">
      <a href="#" class="list-group-item list-group-item-action" v-for="parameter in parameters" :key="parameter.paramName" @click="selectParameter(parameter)" v-bind:class="{ active: parameter.paramName === activeParam }">
        {{parameter.displayName}}
      </a>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import MapObj from '@/map'
import Parameter from '@/parameter'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'ForecastSelection',
  components: {
    Loading
  },
  data() {
    return {
      forecastModels: [{
        id: 'ecmwf',
        label: 'ECMWF',
        active: true
      }, {
        id: 'gfs',
        label: 'GFS'
      }],
      parameters: [],
      activeParam: false,
      isLoaded: false
    }
  },
  async created() {
    this.parameters = await Parameter.getAllParameters()
    this.isLoaded = true
  },
  methods: {
    selectForecastModel (selectedForecastModel) {
      for (let forecastModel of this.forecastModels) {
          forecastModel.active = (forecastModel.id === selectedForecastModel.id)
      }
    },
    selectParameter (selectedParameter) {
      this.activeParam = selectedParameter.paramName
      Parameter.setDisplayedParameter(selectedParameter)
    }
  }
}
</script>
