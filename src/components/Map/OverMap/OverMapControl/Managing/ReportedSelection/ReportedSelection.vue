<template>
  <div id="forecast-selection">
    <div v-if="isLoaded">
      <div class="card mb-4" v-for="parameterGrouping in parameterGroupings" :key="parameterGrouping.groupingId">
        <a href="#" class="card-header" @click="onClickGroup(parameterGrouping.groupingId)">
          {{parameterGrouping.displayName}} <span class="badge badge-secondary badge-pill">{{ parameterGrouping.parameters.length }}</span>
          <div class="float-right">
            <font-awesome-icon v-if="openedGroup === parameterGrouping.groupingId" :icon="iconCaretDown" />
            <font-awesome-icon v-else :icon="iconCaretRight" />
          </div>
        </a>
        <div class="list-group" v-show="openedGroup === parameterGrouping.groupingId">
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" v-for="parameter in parameterGrouping.parameters" :key="parameter.paramName" @click="onSelectParameter(parameter)" v-bind:class="{ active: parameter.paramName === activeParam }">
            <div class="d-flex w-100 justify-content-between">
              <div class="mb-1">{{parameter.displayName}}</div>
              <div><font-awesome-icon :icon="iconInfo" v-on:click.stop="displayInfos(parameter)" class="display-infos text-secondary" /></div>
            </div>
            <div v-show="parameter.paramName === displayedInfo" class="displayed-infos">
              <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
              <small v-if="parameter.unit"><br>Unit: {{parameter.unit}}</small>
            </div>
          </a>
        </div>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import Parameter from '@/store/parameter'
import Loading from '@/components/Loading/Loading'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'
import faInfo from '@fortawesome/fontawesome-free-solid/faInfoCircle'

export default {
  name: 'ReportedSelection',
  components: {
    Loading,
    FontAwesomeIcon
  },
  data () {
    return {
      parameters: [],
      parameterGroupings: [],
      activeParam: false,
      openedGroup: false,
      isLoaded: false,
      displayedInfo: false
    }
  },
  computed: {
    iconCaretDown () {
      return faCaretDown
    },
    iconCaretRight () {
      return faCaretRight
    },
    iconInfo () {
      return faInfo
    }
  },
  async created () {
    this.parameters = await Parameter.getAllParameters()
    this.parameterGroupings = await Parameter.getAllParameterGroupings()

    this.parameterGroupings.forEach(group => {
      group.parameters = this.parameters.filter(p => p.groupingId === group.groupingId)
    })

    // selection of the current layer
    const displayedParameter = Parameter.getDisplayedParameter()
    this.activeParam = displayedParameter && displayedParameter.paramName

    this.isLoaded = true
  },
  methods: {
    onClickGroup (groupingId) {
      if (this.openedGroup !== groupingId) {
        this.openedGroup = groupingId
      } else {
        this.openedGroup = false
      }
    },
    onSelectParameter (selectedParameter) {
      this.activeParam = selectedParameter.paramName
      this.$emit('selectedReportedParameter', selectedParameter)
    },
    displayInfos (parameter) {
      this.displayedInfo = parameter.paramName
    }
  }
}
</script>
