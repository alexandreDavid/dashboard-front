<template>
  <div class="card mb-4">
    <a href="#" class="card-header" @click="onClickGroup(parameterGrouping.groupingId)">
      {{parameterGrouping.displayName}} <span class="badge badge-secondary badge-pill">{{parameters.length}}</span>
      <div class="float-right">
        <font-awesome-icon v-if="openedGroup === parameterGrouping.groupingId" :icon="iconCaretDown" />
        <font-awesome-icon v-else :icon="iconCaretRight" />
      </div>
    </a>
    <div class="list-group" v-if="openedGroup === parameterGrouping.groupingId">
      <a href="#" class="list-group-item list-group-item-action" v-for="parameter in parameters" :key="parameter.paramName" @click="onSelectParameter(parameter)" v-bind:class="{ active: parameter.paramName === activeParam }">
        {{parameter.displayName}}
      </a>
    </div>
  </div>
</template>

<script>
import MapObj from '@/store/map'
import Parameter from '@/store/parameter'
import Loading from '@/components/Loading/Loading'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'

export default {
  name: 'ForecastSelectionGroup',
  components: {
    Loading, FontAwesomeIcon
  },
  inherit: true,
  props: [
    'parameterGrouping',
    'parameters',
    'onSelectParameter',
    'onClickGroup',
    'openedGroup',
    'activeParam'
  ],
  computed: {
    iconCaretDown() {
      return faCaretDown
    },
    iconCaretRight() {
      return faCaretRight
    }
  }
}
</script>
