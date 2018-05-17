<template>
  <div id="forecast-selection">
    <div v-if="isLoaded">
      <!-- <div class="btn-group btn-group-toggle mb-3" data-toggle="buttons">
        <label class="btn btn-primary" v-for="forecastModel in forecastModels" :key="forecastModel.id" v-bind:class="{ active: forecastModel.active }">
          <input type="radio" name="options" id="forecastModel.id" autocomplete="off" @click="selectForecastModel(forecastModel)"> {{forecastModel.label}}</label>
      </div> -->

      <ForecastSelectionGroup 
        v-for="parameterGrouping in parameterGroupings"
        :key="parameterGrouping.groupingId"
        :parameterGrouping="parameterGrouping"
        :parameters="filteredParameterByGroup(parameterGrouping.groupingId)"
        :onSelectParameter="selectParameter"
        :onClickGroup="clickGroup"
        :activeParam="activeParam"
        v-bind:openedGroup="openedGroup"/>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import MapObj from '@/map'
import Parameter from '@/parameter'
import Loading from '@/components/Loading/Loading'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'
import ForecastSelectionGroup from './ForecastSelectionGroup'

export default {
  name: 'ForecastSelection',
  components: {
    Loading, ForecastSelectionGroup
  },
  data() {
    return {
      forecastModels: [
        {
          id: 'ecmwf',
          label: 'ECMWF',
          active: true
        },
        {
          id: 'gfs',
          label: 'GFS'
        }
      ],
      parameters: [],
      parameterGroupings: [],
      activeParam: false,
      openedGroup: false,
      isLoaded: false
    }
  },
  async created() {
    this.parameters = await Parameter.getAllParameters()
    this.parameterGroupings = await Parameter.getAllParameterGroupings()

    // selection of the current layer
    const displayedParameter = Parameter.getDisplayedParameter()
    this.activeParam = displayedParameter && displayedParameter.paramName

    this.isLoaded = true
  },
  methods: {
    filteredParameterByGroup(groupingId) {
      return this.parameters.filter(p => p.groupingId === groupingId)
    },
    clickGroup(groupingId) {
      if (this.openedGroup !== groupingId) {
        this.openedGroup = groupingId
      } else {
        this.openedGroup = false
      }
    },
    selectForecastModel(selectedForecastModel) {
      for (let forecastModel of this.forecastModels) {
        forecastModel.active = forecastModel.id === selectedForecastModel.id
      }
    },
    selectParameter(selectedParameter) {
      this.activeParam = selectedParameter.paramName
      Parameter.setDisplayedParameter(selectedParameter)
      this.$emit('selectedParameter', selectedParameter);
    }
  }
}
</script>
