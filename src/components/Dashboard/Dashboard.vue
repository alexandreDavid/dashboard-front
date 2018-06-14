<template>
  <div id="dashboard">
    <div v-if="isLoaded" class="container">
      <div class="row">
        <h4 class="col-12 mt-2 mb-2 p-2">Compare Parameter Graphs
          <button type="button" class="btn btn-light ml-2" v-if="!isEditing" @click="edit()"><font-awesome-icon :icon="iconEdit" /> Edit</button>
          <button type="button" class="btn btn-primary ml-2" v-if="isEditing" @click="save()"><font-awesome-icon :icon="iconSave" /> Save</button>
        </h4>
        <div class="col-12 mb-2 p-2">
          <SearchLocation @input="onSearchLocationSelected" />
        </div>
        <DashboardWidget v-if="selectedArea" v-for="(contentObject, key) in dashboard.allContents" :key="key" v-bind:isEditing="isEditing" :contentObject="contentObject" :widgetKey="key" v-bind:selectedArea="selectedArea" v-bind:allParameters="allParameters"></DashboardWidget>
        <div class="col-md-6 p-2" v-if="selectedArea && isEditing">
          <button type="button" class="btn btn-primary" @click="addWidget()"><font-awesome-icon :icon="iconPlus" /> Add a widget</button>
          <button type="button" class="btn btn-primary" @click="save()"><font-awesome-icon :icon="iconSave" /> Save</button>
        </div>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import DashboardWidget from './DashboardWidget'
import Loading from '@/components/Loading/Loading'
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import Parameter from '@/store/parameter.js'
import Area from '@/store/area.js'
import Api from '@/store/api.js'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faSave from '@fortawesome/fontawesome-free-solid/faSave'

export default {
  name: 'Dashboard',
  components: {
    SearchLocation,
    Loading,
    DashboardWidget,
    FontAwesomeIcon
  },
  data() {
    return {
      isLoaded: false,
      isEditing: false,
      allParameters: [],
      selectedArea: false,
      dashboard: {}
    }
  },
  computed: {
    iconPlus() {
      return faPlus
    },
    iconEdit() {
      return faEdit
    },
    iconSave() {
      return faSave
    }
  },
  async created () {
    this.allParameters = await Parameter.getAllParameters()
    this.selectedArea = Area.getSelectedArea()
    this.dashboard = Api.getDashboard()
    this.isLoaded = true
  },
  methods: {
    onSearchLocationSelected (newValue) {
      this.selectedArea = newValue
    },
    addWidget() {
      this.dashboard.allContents.push({})
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
    },
    edit () {
      this.isEditing = true
    },
    save () {
      Api.setDashboard(this.dashboard)
      this.isEditing = false
    }
  },
}
</script>
