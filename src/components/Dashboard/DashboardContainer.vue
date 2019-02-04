<template>
<div class="container-fluid pb-2 border-bottom">
  <div class="row" v-if="isLoaded">
    <h4 class="col-12 my-3 px-3">
      <div class="input-group" v-if="editTitle">
        <input type="text" v-model="dashboard.title" class="form-control" id="title" placeholder="title" aria-label="title">
        <div class="input-group-append" id="button-addon4">
          <button class="btn btn-secondary" type="button" @click="editTitle = false">Cancel</button>
          <button class="btn btn-success" type="button" @click="saveTitle(dashboard.title)">Save</button>
        </div>
      </div>
      <span @click="editTitle = true" v-else>{{ dashboard.title }}</span>
      <!-- <button type="button" class="btn btn-light ml-2 edit" v-if="!isEditing" @click="edit()"><font-awesome-icon icon="edit" /> Edit</button>
      <button type="button" class="btn btn-primary ml-2 save" v-else @click="save()"><font-awesome-icon icon="save" /> Save</button> -->
    </h4>
    <div class="col-12 mb-2 px-3 py-1 border-top border-bottom d-flex justify-content-between bg-light">
      <div class="d-flex align-items-center mr-auto">
        <span>Add a widget:</span>
        <button type="button" class="btn btn-light" @click="addWidget('map')"><font-awesome-icon icon="map" /><br/></button>
        <button type="button" class="btn btn-light" @click="addWidget('graph')"><font-awesome-icon icon="chart-bar" /><br/></button>
        <button type="button" class="btn btn-light" @click="addWidget('table')"><font-awesome-icon icon="table" /><br/></button>
        <button type="button" class="btn btn-light" @click="addWidget('textarea')"><span style="font-size: 18px;line-height: 18px;font-family: initial;font-weight: bold;">T</span></button>
        <button type="button" class="btn btn-light" @click="addWidget('image')"><font-awesome-icon icon="image" /><br/></button>
        <!-- </div> -->
        <!-- <button type="button" class="btn btn-sm btn-light d-inline-block" @click="addCard()"><font-awesome-icon icon="plus" /> Add a widget</button> -->
        <span class="border-right mx-2" style="height: 25px;"></span>
        <button type="button" class="btn btn-sm btn-light" disabled @click="edit()">Share</button>
        <button type="button" class="btn btn-sm btn-light" disabled @click="edit()">Export</button>
      </div>
      <div class="d-flex align-items-center">
        <button type="button" class="btn btn-sm btn-light d-inline-block" @click="showCustomiseModal = true">Customise dashboard</button>
        <button type="button" class="btn btn-sm btn-light d-inline-block" @click="$emit('delete', dashboard)">Delete dashboard</button>
      </div>
    </div>
    <div class="col-12 mb-3">
      <h6>Place selection</h6>
      <area-selection-control @change="updateSearchLocation"></area-selection-control>
    </div>
    <drag-drop-widgets v-bind:dashboard="dashboard" @edit="editWidget" @delete="removeWidget" v-bind:selectedArea="selectedArea"></drag-drop-widgets>
    <dashboard-customise-modal v-if="showCustomiseModal" @close="showCustomiseModal = false" @validate="setCustomisation" v-bind:dashboard="dashboard"></dashboard-customise-modal>
    <dashboard-card-modal v-if="showCardModal" @close="closeEditCardModal" @validate="setEditedWidget" :editedCard="editedCard"></dashboard-card-modal>
  </div>
  <Loading v-else/>
</div>
</template>

<script>
import DashboardWidget from '@/components/Dashboard/DashboardWidget'
import DashboardCardModal from '@/components/Dashboard/DashboardCardModal2'
import DashboardNewModal from '@/components/Dashboard/DashboardNewModal'
import DashboardCustomiseModal from '@/components/Dashboard/DashboardCustomiseModal'
import Loading from '@/components/Loading/Loading'
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import DashboardObj from '@/store/dashboard2'
import GeoResources from '@/store/geoResources'
import SideBar from '@/components/SideBar/SideBar'
import DragDropWidgets from '@/components/Dashboard/DragDropWidgets'

export default {
  name: 'DashboardContainer',
  components: {
    Loading,
    DashboardWidget,
    DashboardCardModal,
    DashboardNewModal,
    DashboardCustomiseModal,
    AreaSelectionControl,
    SideBar,
    DragDropWidgets
  },
  props: ['config'],
  data () {
    return {
      isLoaded: false,
      showCardModal: false,
      showCustomiseModal: false,
      showNewModal: false,
      selectedArea: false,
      dashboard: {},
      editedCard: {},
      editTitle: false
    }
  },
  async created () {
    await GeoResources.getAllResources()
    this.loadDashboard(this.config)
    // this.dashboard = DashboardObj.getSavedDashboard()
    this.isLoaded = true
  },
  methods: {
    loadDashboard (config) {
      this.dashboard = new DashboardObj(config)
    },
    updateSearchLocation (feature) {
      this.selectedArea = feature
    },
    addWidget (type = 'map') {
      this.editWidget({ title: '', type })
    },
    // addCard () {
    //   this.editCard(this.dashboard.addWidget())
    //   // Scroll to the next graph
    //   let container = document.querySelector('#page-container')
    //   this.$nextTick(() => {
    //     setTimeout(function () {
    //       container.scrollBy({
    //         top: container.scrollHeight,
    //         behavior: 'smooth'
    //       })
    //     }, 0)
    //   })
    //   this.$ga.event('dashboard', 'addCard')
    // },
    editWidget (card) {
      this.editedCard = card
      this.showCardModal = true
    },
    setEditedWidget (card) {
      this.closeEditCardModal()
      this.dashboard.setWidget(card)
      this.$ga.event('dashboard', 'editCard', `${card.title}: ${card.type}`)
      this.dashboard.save()
    },
    closeEditCardModal () {
      this.showCardModal = false
    },
    removeWidget (card) {
      this.dashboard.removeWidget(card)
      this.showCardModal = false
      this.$emit('save')
      this.$ga.event('dashboard', 'removeCard')
      // this.dashboard.save()
    },
    saveTitle (title) {
      this.editTitle = false
      this.dashboard.title = title
      this.dashboard.save()
      this.save()
    },
    setCustomisation (customisation) {
      this.showCustomiseModal = false
      this.dashboard.layout = customisation.layout
      this.dashboard.save()
      this.save()
    },
    save () {
      this.$emit('save')
      this.$ga.event('dashboard', 'save')
    },
    colFilter (list, col) {
      return list.filter(w => {
        w.colIndex = w.colIndex || 0
        return w.colIndex === col
      })
    }
  },
  watch: {
    config: 'loadDashboard'
  }
}
</script>
