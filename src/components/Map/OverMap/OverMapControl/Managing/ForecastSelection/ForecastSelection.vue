<template>
  <div id="forecast-selection">
    <div v-if="isLoaded">
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
import Parameter from '@/store/parameter'
import Loading from '@/components/Loading/Loading'
import ForecastSelectionGroup from './ForecastSelectionGroup'

export default {
  name: 'ForecastSelection',
  components: {
    Loading,
    ForecastSelectionGroup
  },
  data () {
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
  async created () {
    this.parameters = await Parameter.getAllParameters()
    this.parameterGroupings = await Parameter.getAllParameterGroupings()

    // selection of the current layer
    const displayedParameter = Parameter.getDisplayedParameter()
    this.activeParam = displayedParameter && displayedParameter.paramName

    this.isLoaded = true
  },
  methods: {
    filteredParameterByGroup (groupingId) {
      return this.parameters.filter(p => p.groupingId === groupingId)
    },
    clickGroup (groupingId) {
      if (this.openedGroup !== groupingId) {
        this.openedGroup = groupingId
      } else {
        this.openedGroup = false
      }
    },
    selectParameter (selectedParameter) {
      this.activeParam = selectedParameter.paramName
      Parameter.setDisplayedParameter(selectedParameter)
      this.$emit('selectedParameter', selectedParameter)
    }
  }
}
</script>
