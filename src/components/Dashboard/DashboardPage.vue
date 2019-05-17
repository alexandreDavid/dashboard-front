<template>
  <div id="dashboard" class="h-100">
    <div v-if="isLoaded" class="d-flex flex-row-reverse h-100 d-print-block">
      <div class="flex-grow-1 h-100 position-relative">
        <dashboard-container v-if="selectedDashboard" :config="selectedDashboard" @delete="deleteDashboard"></dashboard-container>
        <div v-else class="alert alert-info m-3" role="alert">
          Please select a dashboard in the list or click on the button to create a new one.
        </div>
      </div>
      <div class="d-none d-sm-block bg-light h-100 d-print-none" style="box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2); z-index:2;width:300px;">
        <div id="dashboard-list" class="container mt-2">
          <div class="row border-bottom">
            <div class="p-2 col-12">
              <button type="button" id="add-dashboard-button" class="btn btn-secondary col-12" @click="showNewModal = true"><font-awesome-icon icon="plus" /> Add a new dashboard</button>
            </div>
            <h5 class="col-12 my-2">
              My dashboards
            </h5>
            <ul class="nav flex-column nav-pills col-12 px-2 pb-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <li class="nav-item" v-for="dashboard in dashboards" :key="dashboard.id" @click="selectDashboard(dashboard)">
                <a class="nav-link" href="#" v-bind:class="{active: (selectedDashboard.id === dashboard.id)}">{{ dashboard.title }}</a>
              </li>
            </ul>
          </div>
          <div class="row border-bottom">
            <h5 class="col-12 my-2">
              Shared with me
            </h5>
            <ul class="nav flex-column nav-pills col-12 px-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <li class="nav-link" v-if="!sharedDashboards.length">-</li>
              <li class="nav-item" v-for="dashboard in sharedDashboards" :key="dashboard.id" @click="selectDashboard(dashboard)">
                <a class="nav-link" href="#" v-bind:class="{active: (selectedDashboard.id === dashboard.id)}">{{ dashboard.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
    <dashboard-new-modal v-if="showNewModal" @close="showNewModal = false" @validate="createDashboard"></dashboard-new-modal>
  </div>
</template>

<script>
import DashboardNewModal from '@/components/Dashboard/New/DashboardNewModal'
import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import Loading from '@/components/Loading/Loading'
import DashboardTemplates from '@/store/dashboardTemplates'
import GeoResources from '@/store/geoResources'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'DashboardPage',
  components: {
    Loading,
    DashboardNewModal,
    DashboardContainer
  },
  computed: mapState({
    dashboards: state => state.dashboards.all,
    sharedDashboards: state => state.dashboards.shared,
    selectedDashboard: state => state.dashboards.active
  }),
  data () {
    return {
      isLoaded: false,
      showNewModal: false
    }
  },
  async created () {
    GeoResources.getAllResources()
    await this.getAll()
    if (!this.dashboards.length) {
      this.createDashboard(DashboardTemplates.getStarterDashboard())
    } else {
      this.selectDashboard(this.dashboards[0])
    }
    this.isLoaded = true
  },
  methods: {
    createDashboard (newDashboard) {
      this.showNewModal = false
      this.addDashboard(newDashboard)
    },
    selectDashboard (dashboard) {
      this.setActive(dashboard)
    },
    deleteDashboard (dashboard) {
      this.removeDashboard(dashboard)
    },
    ...mapActions('dashboards', ['getAll', 'addDashboard', 'removeDashboard']),
    ...mapMutations('dashboards', ['setActive'])
  }
}
</script>
