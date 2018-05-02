<template>
  <div id="forecast-selection">
    <div class="btn-group btn-group-toggle mb-3" data-toggle="buttons">
      <label class="btn btn-primary" v-for="forecastModel in forecastModels" :key="forecastModel.id" v-bind:class="{ active: forecastModel.active }">
        <input type="radio" name="options" id="forecastModel.id" autocomplete="off" @click="selectForecastModel(forecastModel)"> {{forecastModel.label}}</label>
    </div>
    <div class="list-group text-left">
      <a href="#" class="list-group-item list-group-item-action" v-for="forecastParameter in forecastParameters" :key="forecastParameter.id" @click="selectForecastParameter(forecastParameter)" v-bind:class="{ active: forecastParameter.active }">
        {{forecastParameter.label}}
      </a>
    </div>
  </div>
</template>

<script>
import MapObj from '../../../../map/MapObj'

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
      forecastParameters: [{
        id : 'temperature',
        label: 'Temperature',
        active: true,
        layerUrl: 'http://localhost:8080/geoserver/geonode/wms',
        layerParameters: {
          layers: 'geonode:uganda_regions_2014_shp',
          format: 'image/png',
          transparent: true
        }
      }, {
        id : 'air_pressure',
        label: 'Air pressure',
        layerUrl: 'http://localhost:8080/geoserver/geonode/wms',
        layerParameters: {
          layers: 'geonode:san_andres_y_providencia_water',
          format: 'image/png',
          transparent: true
        }
      }]
    }
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
      MapObj.setDisplayedLayer(selectedForecastParameter.layerUrl, selectedForecastParameter.layerParameters)
    }
  }
}
</script>
