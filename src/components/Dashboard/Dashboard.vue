<template>
  <div id="dashboard">
    <div v-if="isLoaded" class="container">
      <div class="row">
        <h4 class="col-12 mt-3 mb-3">Compare Parameter Graphs</h4>
        <div class="col-12 mb-3">
          <SearchLocation @input="onSearchLocationSelected" :initialLocation="selectedArea && selectedArea.displayName" />
        </div>
        <div class="col-md-6 mb-2" v-if="selectedArea" v-for="(graph, key) in allGraphs" :key="key">
          <DashboardGraph v-bind:selectedArea="selectedArea" v-bind:allParameters="allParameters"></DashboardGraph>
        </div>
        <div class="col-md-6 mb-2" v-if="selectedArea">
          <button type="button" class="btn btn-primary" @click="addGraph()"><font-awesome-icon :icon="iconPlus" /> Add a graph</button>
        </div>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import DashboardGraph from './DashboardGraph'
import Loading from '@/components/Loading/Loading'
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import Parameter from '@/store/parameter.js'
import Area from '@/store/area.js'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

export default {
  name: 'Dashboard',
  components: {
    SearchLocation,
    Loading,
    DashboardGraph,
    FontAwesomeIcon
  },
  data() {
    return {
      isLoaded: false,
      allParameters: [],
      selectedArea: false,
      allGraphs: []
    }
  },
  computed: {
    iconPlus() {
      return faPlus
    }
  },
  async created () {
    this.allParameters = await Parameter.getAllParameters()
    this.selectedArea = Area.getSelectedArea()
    this.isLoaded = true
  },
  methods: {
    onSearchLocationSelected (newValue) {
      this.selectedArea = newValue
    },
    addGraph() {
      this.allGraphs.push({})
      // Scroll to the next graph
      let container = document.querySelector("#page-container")
      this.$nextTick(() => {
        setTimeout(function() {
          container.scrollBy({ 
            top: container.scrollHeight,
            behavior: 'smooth' 
          });
        }, 0);
      });
    }
  }
}
</script>
