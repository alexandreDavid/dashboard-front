<template>
  <div class="card mb-4">
    <a href="#" class="card-header" @click="onClickGroup(parameterGrouping.groupingId)">
      {{parameterGrouping.displayName}} <span class="badge badge-secondary badge-pill">{{parameters.length}}</span>
      <div class="float-right">
        <font-awesome-icon v-if="openedGroup === parameterGrouping.groupingId" :icon="iconCaretDown" />
        <font-awesome-icon v-else :icon="iconCaretRight" />
      </div>
    </a>
    <div class="list-group" v-show="openedGroup === parameterGrouping.groupingId">
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" v-for="parameter in parameters" :key="parameter.paramName" @click="onSelectParameter(parameter)" v-bind:class="{ active: parameter.paramName === activeParam }">
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
</template>

<script>
import Loading from '@/components/Loading/Loading'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'
import faInfo from '@fortawesome/fontawesome-free-solid/faInfoCircle'

export default {
  name: 'ForecastSelectionGroup',
  components: {
    Loading,
    FontAwesomeIcon
  },
  props: [
    'parameterGrouping',
    'parameters',
    'onSelectParameter',
    'onClickGroup',
    'openedGroup',
    'activeParam'
  ],
  data () {
    return {
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
  methods: {
    displayInfos (parameter) {
      this.displayedInfo = parameter.paramName
    }
  }
}
</script>
