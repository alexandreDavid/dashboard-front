<template>
  <div id="dashboard" class="h-100">
    <div v-if="isLoaded" class="d-flex flex-row-reverse h-100">
      <div class="flex-grow-1 h-100 position-relative">
        <div id="dashboards-container" style="position: absolute;overflow: auto;top: 0;bottom: 0;left:0;right:0;">
          <dashboard-container v-for="(selectedDashboard, key) in selectedDashboards" :key="key" :config="selectedDashboard" @save="save" @delete="deleteDashboard"></dashboard-container>
        </div>
      </div>
      <div class="d-none d-sm-block bg-light h-100" style="box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2); z-index:2;width:300px;">
        <div class="container mt-2">
          <div class="row border-bottom">
            <div class="p-2 col-12">
              <button type="button" class="btn btn-secondary col-12" @click="showNewModal = true"><font-awesome-icon icon="plus" /> Add a new dashboard</button>
            </div>
            <h5 class="col-12 my-2">
              My dashboards
            </h5>
            <ul class="nav flex-column nav-pills col-12 px-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <li class="nav-link" v-for="dashboard in dashboards" :key="dashboard.id" @click="selectDashboard(dashboard)" v-bind:class="{active: (selectedDashboards.findIndex(d => d.id === dashboard.id) > -1)}">
                {{ dashboard.title }}
              </li>
            </ul>
          </div>
          <div class="row border-bottom">
            <h5 class="col-12 my-2">
              Shared with me
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
      showNewModal: false,
      dashboards: {},
      selectedDashboards: []
    }
  },
  async created () {
    await GeoResources.getAllResources()
    this.dashboards = Dashboards.getAll()
    if (!this.dashboards.length) {
      this.addDashboard(this.getDefaultDashboard())
    } else {
      this.selectDashboard(this.dashboards[0])
    }
    this.isLoaded = true
  },
  methods: {
    addDashboard (newDashboard) {
      this.showNewModal = false
      const dashboard = Dashboards.addDashboard(newDashboard)
      this.selectedDashboards.push(dashboard)
      this.dashboards = Dashboards.getAll()
    },
    selectDashboard (dashboard) {
      const selectDashboardIdx = this.selectedDashboards.findIndex(d => d.id === dashboard.id)
      if (selectDashboardIdx !== -1) {
        this.selectedDashboards.splice(selectDashboardIdx, 1)
      } else {
        this.selectedDashboards.push(dashboard)
      }
    },
    deleteDashboard (dashboard) {
      this.dashboards = Dashboards.removeDashboard(dashboard)
      this.selectDashboard(dashboard)
    },
    save () {
      this.dashboards = Dashboards.getAll()
      Dashboards.setAll(this.dashboards)
    },
    getDefaultDashboard () {
      return {
        title: 'Starter dashboard',
        layout: {
          id: '50-50',
          columns: [
            {
              name: '50%',
              class: 'col-6'
            },
            {
              name: '50%',
              class: 'col-6'
            }
          ]
        },
        widgets: [
          {
            id: 1,
            colIndex: 0,
            resource: {
              id: 1,
              label: 'Temperature (2-day)'
            },
            title: 'Temperature (2-day)',
            description: '',
            type: 'map'
          },
          {
            id: 2,
            colIndex: 0,
            resource: {
              id: 1,
              label: 'Temperature (2-day)'
            },
            title: 'Temperature (2-day)',
            description: '',
            type: 'graph'
          },
          {
            id: 3,
            colIndex: 1,
            resource: {
              id: 3,
              label: 'Relative Humidity (2-day)'
            },
            title: 'Relative Humidity (2-day)',
            description: '',
            type: 'map'
          },
          {
            id: 4,
            colIndex: 1,
            resource: {
              id: 3,
              label: 'Relative Humidity (2-day)'
            },
            title: 'Relative Humidity (2-day)',
            description: '',
            type: 'graph'
          }
        ]
      }
    }
  }
}
</script>
