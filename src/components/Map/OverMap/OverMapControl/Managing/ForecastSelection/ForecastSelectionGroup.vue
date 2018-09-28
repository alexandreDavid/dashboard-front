<template>
  <div class="card mb-4">
    <a href="#" class="card-header" @click="onClickGroup(parameterGrouping.groupingId)">
      {{parameterGrouping.displayName}} <span class="badge badge-secondary badge-pill">{{parameters.length}}</span>
      <div class="float-right">
        <font-awesome-icon v-if="openedGroup === parameterGrouping.groupingId" icon="caret-down" />
        <font-awesome-icon v-else icon="caret-right" />
      </div>
    </a>
    <div class="list-group" v-show="openedGroup === parameterGrouping.groupingId">
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" v-for="parameter in parameters" :key="parameter.paramName" @click="onSelectParameter(parameter)" v-bind:class="{ active: parameter.paramName === activeParam }">
        <div class="d-flex w-100 justify-content-between">
          <div class="mb-1">{{parameter.displayName}}</div>
          <font-awesome-layers class="fa-lg display-infos text-secondary" v-on:click.stop="displayInfos(parameter)">
            <font-awesome-icon icon="circle" class="text-white" size="xs" />
            <font-awesome-icon icon="info-circle" />
          </font-awesome-layers>
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
import { FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

export default {
  name: 'ForecastSelectionGroup',
  components: {
    Loading,
    FontAwesomeLayers
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
  methods: {
    displayInfos (parameter) {
      this.displayedInfo = parameter.paramName
    }
  }
}
</script>
