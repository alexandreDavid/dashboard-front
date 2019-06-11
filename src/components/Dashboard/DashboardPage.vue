<template>
  <div id="dashboard" class="h-100">
    <div v-if="isLoaded" class="d-flex flex-row-reverse h-100 d-print-block">
      <div class="flex-grow-1 h-100 position-relative">
        <dashboard-container v-if="selectedDashboard" :config="selectedDashboard" @opensidebar="sidebarOpened = true"></dashboard-container>
        <div v-else class="alert alert-info m-3" role="alert">
          Please select a dashboard in the list or click on the button to create a new one.
        </div>
      </div>
      <div class="d-none d-md-block bg-light h-100 d-print-none" style="box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2); z-index:2;width:300px;">
        <dashboard-list @newDashboard="showNewModal = true"></dashboard-list>
      </div>
      <side-bar v-if="sidebarOpened" @close="sidebarOpened = false">
        <dashboard-list @newDashboard="showNewModal = true"></dashboard-list>
      </side-bar>
    </div>
    <Loading v-if="!isLoaded"/>
    <dashboard-new-modal v-if="showNewModal" @close="showNewModal = false" @validate="createDashboard"></dashboard-new-modal>
  </div>
</template>

<script>
import DashboardNewModal from '@/components/Dashboard/New/DashboardNewModal'
import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import DashboardList from '@/components/Dashboard/DashboardList'
import Loading from '@/components/Loading/Loading'
import DashboardTemplates from '@/store/dashboardTemplates'
import GeoResources from '@/store/geoResources'
import SideBar from '@/components/SideBar/SideBar'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'DashboardPage',
  components: {
    Loading,
    DashboardNewModal,
    DashboardContainer,
    DashboardList,
    SideBar
  },
  computed: mapState({
    dashboards: state => state.dashboards.all,
    sharedDashboards: state => state.dashboards.shared,
    selectedDashboard: state => state.dashboards.active
  }),
  data () {
    return {
      isLoaded: false,
      showNewModal: false,
      sidebarOpened: false
    }
  },
  async created () {
    GeoResources.getAllResources()
    await this.getAll()
    if (!this.dashboards.length) {
      this.createDashboard(DashboardTemplates.getStarterDashboard())
    } else {
      this.setActive(this.dashboards[0])
    }
    this.isLoaded = true
  },
  methods: {
    createDashboard (newDashboard) {
      this.showNewModal = false
      this.addDashboard(newDashboard)
    },
    ...mapActions('dashboards', ['getAll', 'addDashboard']),
    ...mapMutations('dashboards', ['setActive'])
  }
}
</script>
