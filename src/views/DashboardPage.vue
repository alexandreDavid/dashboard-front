<template>
  <div id="dashboard">
    <div v-if="isLoaded" class="d-flex flex-row-reverse">
      <div class="flex-grow-1 container-fluid">
        <dashboard-container v-if="selectedDashboard" :config="selectedDashboard" @save="save"></dashboard-container>
      </div>
      <!-- <div class="d-none d-sm-block"> -->
      <div class="d-none d-sm-block bg-light" style="box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2); z-index:2;width:300px;">
        <div class="container mt-2">
          <div class="row border-bottom">
            <div class="p-2 col-12">
              <button type="button" class="btn btn-secondary col-12" @click="showNewModal = true"><font-awesome-icon icon="plus" /> Add a new dashboard</button>
            </div>
            <h5 class="col-12 my-2">
              My dashboards
            </h5>
            <ul class="nav flex-column nav-pills col-12 px-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <li class="nav-link" v-for="dashboard in dashboards" :key="dashboard.id" @click="selectedDashboard = dashboard" v-bind:class="{active: dashboard.id === selectedDashboard.id}">{{ dashboard.title }}</li>
            </ul>
          </div>
          <div class="row border-bottom">
            <h5 class="col-12 my-2">
              Shared dashboards
            </h5>
            <ul class="nav flex-column nav-pills col-12 px-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <li class="nav-link">Dashboard 1</li>
              <li class="nav-link">Dashboard 2</li>
              <li class="nav-link">Dashboard 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
    <dashboard-new-modal v-if="showNewModal" @close="showNewModal = false" @validate="addDashboard"></dashboard-new-modal>
  </div>
</template>

<script>
import DashboardNewModal from '@/components/Dashboard/DashboardNewModal'
import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import Loading from '@/components/Loading/Loading'
import Dashboards from '@/store/dashboards'
import GeoResources from '@/store/geoResources'

export default {
  name: 'DashboardPage',
  components: {
    Loading,
    DashboardNewModal,
    DashboardContainer
  },
  data () {
    return {
      isLoaded: false,
      isEditing: false,
      showCardModal: false,
      showCustomiseModal: false,
      showNewModal: false,
      selectedArea: false,
      dashboards: {},
      selectedDashboard: false
    }
  },
  async created () {
    await GeoResources.getAllResources()
    this.dashboards = Dashboards.getAll()
    this.isLoaded = true
  },
  methods: {
    addDashboard (newDashboard) {
      this.showNewModal = false
      this.selectedDashboard = Dashboards.addDashboard(newDashboard)
      this.dashboards = Dashboards.getAll()
    },
    save () {
      this.dashboards = Dashboards.getAll()
      Dashboards.setAll(this.dashboards)
    }
  }
}
</script>
