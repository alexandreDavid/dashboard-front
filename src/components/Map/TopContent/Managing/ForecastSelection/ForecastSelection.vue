<template>
  <div id="forecast-selection" v-if="isLoaded">
    <div class="btn-group btn-group-toggle mb-3" data-toggle="buttons">
      <label class="btn btn-primary" v-for="forecastModel in forecastModels" :key="forecastModel.id" v-bind:class="{ active: forecastModel.active }">
        <input type="radio" name="options" id="forecastModel.id" autocomplete="off" @click="selectForecastModel(forecastModel)"> {{forecastModel.label}}</label>
    </div>
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action" v-for="parameter in parameters" :key="parameter.paramName" @click="selectParameter(parameter)" v-bind:class="{ active: parameter.paramName === activeParam }">
        {{parameter.displayName}}
      </a>
    </div>
  </div>
</template>

<script>
import MapObj from '@/map'
import Data from '@/data'

export default {
  name: 'ForecastSelection',
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
    this.parameters = await Data.getAllParameters()
    this.isLoaded = true
  },
  methods: {
    selectForecastModel (selectedForecastModel) {
      for (let forecastModel of this.forecastModels) {
          forecastModel.active = (forecastModel.id === selectedForecastModel.id)
      }
    },
    selectForecastParameter (selectedForecastParameter) {
      for (let forecastParameter of this.forecastParameters) {
          forecastParameter.active = (forecastParameter.id === selectedForecastParameter.id)
      }
      MapObj.setDisplayedLayer(selectedForecastParameter.layerUrl, selectedForecastParameter.layerParameters, selectedForecastParameter.legendUrl)
    },
    selectLayer (selectedLayer) {
      for (let layer of this.layers) {
          layer.active = (layer.id === selectedLayer.id)
      }
      MapObj.setDisplayedLayer(selectedLayer.layerUrl, selectedLayer.layerParameters, selectedLayer.legendUrl)
    },
    selectParameter (selectedParameter) {
      this.activeParam = selectedParameter.paramName
      MapObj.setDisplayedLayer(selectedParameter.layerUrl, selectedParameter.layerParameters, selectedParameter.legendUrl)
    }
  }
}
</script>
