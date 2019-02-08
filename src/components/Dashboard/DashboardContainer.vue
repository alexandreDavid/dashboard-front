<template>
<div class="container-fluid pb-2 border-bottom">
  <div class="row" v-if="isLoaded">
    <h4 class="col-12 mt-3 px-3">
      <div class="border-bottom pb-2">
      <editable-input v-model="dashboard.title" @input="saveTitle" placeholder="title" required></editable-input>
      </div>
    </h4>
    <div class="col-12 mb-3">
      <editable-text-area v-model="dashboard.description" @input="saveDescription" placeholder="Description" add-button-label="Add a description"></editable-text-area>
    </div>
    <nav class="navbar navbar-expand navbar-light bg-light col-12 mb-2 py-1 border-top border-bottom">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav d-none d-md-flex">
          <li class="nav-item">
            <span class="navbar-text">Add a widget:</span>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="addWidget('map')" title="Add a map"><font-awesome-icon icon="map" /><br/></button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="addWidget('graph')" title="Add a graph"><font-awesome-icon icon="chart-bar" /><br/></button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="addWidget('table')" title="Add a table"><font-awesome-icon icon="table" /><br/></button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="addWidget('textarea')" title="Add a text area"><span style="font-size: 18px;line-height: 18px;font-family: initial;font-weight: bold;">T</span></button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="addWidget('image')" title="Add an image"><font-awesome-icon icon="image" /><br/></button>
          </li>
        </ul>
        <ul class="navbar-nav d-flex d-md-none">
          <div class="nav-item btn-group">
            <a class="nav-link dropdown-toggle" href="#" @click="displayDropDownWidget = true"><font-awesome-icon icon="plus" /> Add a widget</a>
            <drop-down class="dropdown-menu shadow" v-if="displayDropDownWidget" @close="displayDropDownWidget = false">
              <button class="dropdown-item" type="button" @click="addWidget('map')"><font-awesome-icon icon="map" /> Add a map</button>
              <button class="dropdown-item" type="button" @click="addWidget('graph')"><font-awesome-icon icon="chart-bar" /> Add a graph</button>
              <button class="dropdown-item" type="button" @click="addWidget('table')"><font-awesome-icon icon="table" /> Add a table</button>
              <button class="dropdown-item" type="button" @click="addWidget('textarea')"><span style="font-size: 18px;line-height: 18px;font-family: initial;font-weight: bold;">T</span> Add a text area</button>
              <button class="dropdown-item" type="button" @click="addWidget('image')"><font-awesome-icon icon="image" /> Add an image</button>
            </drop-down>
          </div>
        </ul>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item m-auto">
            <span class="navbar-text border-right mx-2" style="height: 24px;vertical-align:middle;"></span>
          </li>
          <li class="nav-item m-auto">
            <button type="button" class="btn btn-sm btn-light" disabled @click="edit()">Share</button>
          </li>
          <li class="nav-item m-auto">
            <button type="button" class="btn btn-sm btn-light" disabled @click="edit()">Export</button>
          </li>
        </ul>
        <div class="my-2 my-lg-0 d-none d-lg-block">
          <button type="button" class="btn btn-sm btn-light d-inline-block" @click="showCustomiseModal = true">Customise dashboard</button>
          <button type="button" class="btn btn-sm btn-light d-inline-block" @click="$emit('delete', dashboard)">Delete dashboard</button>
        </div>
      </div>
    </nav>
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
import DashboardCardModal from '@/components/Dashboard/DashboardCardModal'
import DashboardNewModal from '@/components/Dashboard/DashboardNewModal'
import DashboardCustomiseModal from '@/components/Dashboard/DashboardCustomiseModal'
import Loading from '@/components/Loading/Loading'
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import DashboardObj from '@/store/dashboard'
import GeoResources from '@/store/geoResources'
import SideBar from '@/components/SideBar/SideBar'
import DragDropWidgets from '@/components/Dashboard/DragDropWidgets'
import EditableInput from '@/components/EditableField/EditableInput'
import EditableTextArea from '@/components/EditableField/EditableTextArea'
import DropDown from '@/components/DropDown/DropDown'

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
    DragDropWidgets,
    EditableInput,
    EditableTextArea,
    DropDown
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
      displayDropDownWidget: false
    }
  },
  async created () {
    await GeoResources.getAllResources()
    this.loadDashboard(this.config)
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
      this.$ga.event('dashboard', 'removeCard')
      this.dashboard.save()
      this.save()
    },
    saveTitle (title) {
      this.editedTitle = false
      this.dashboard.title = title
      this.dashboard.save()
      this.save()
    },
    saveDescription (description) {
      this.editedDescription = false
      this.dashboard.description = description
      this.dashboard.save()
      this.save()
    },
    setCustomisation (customisation) {
      this.showCustomiseModal = false
      this.dashboard.setLayout(customisation.layout)
      this.dashboard.save()
      this.save()
    },
    save () {
      this.$emit('save')
      this.$ga.event('dashboard', 'save')
    }
  },
  watch: {
    config: 'loadDashboard'
  }
}
</script>
