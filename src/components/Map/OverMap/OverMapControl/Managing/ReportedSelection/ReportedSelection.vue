<template>
  <div id="forecast-selection">
    <div v-if="isLoaded">
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" v-for="reportedParameter in reportedParameters" :key="reportedParameter.paramName" @click="onSelectParameter(reportedParameter)" v-bind:class="{ active: reportedParameter.paramName === activeParam }">
          <div class="d-flex w-100 justify-content-between">
            <div class="mb-1">{{reportedParameter.displayName}}</div>
            <div><font-awesome-icon :icon="iconInfo" v-on:click.stop="displayInfos(reportedParameter)" class="display-infos text-secondary" /></div>
          </div>
          <div v-show="reportedParameter.paramName === displayedInfo" class="displayed-infos">
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
          </div>
        </a>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import Loading from '@/components/Loading/Loading'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faInfo from '@fortawesome/fontawesome-free-solid/faInfoCircle'

export default {
  name: 'ReportedSelection',
  components: {
    Loading,
    FontAwesomeIcon
  },
  inject: ['getSelectedReportedLayer'],
  data () {
    return {
      parameterGroupings: [],
      activeParam: false,
      openedGroup: false,
      isLoaded: false,
      displayedInfo: false
    }
  },
  computed: {
    iconInfo () {
      return faInfo
    }
  },
  created () {
    this.reportedParameters = this.getParams()

    // selection of the current layer
    const displayedReportedLayer = this.getSelectedReportedLayer()
    this.activeParam = displayedReportedLayer && displayedReportedLayer.paramName

    this.isLoaded = true
  },
  methods: {
    onSelectParameter (selectedParameter) {
      this.activeParam = selectedParameter.paramName
      this.$emit('selectedReportedParameter', selectedParameter)
    },
    displayInfos (parameter) {
      this.displayedInfo = parameter.paramName
    },
    getParams () {
      return [{
        paramName: 'paramName',
        displayName: 'THAMO'
      }]
    }
  }
}
</script>
