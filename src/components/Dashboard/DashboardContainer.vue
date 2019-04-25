<template>
<div id="dashboard-container" class="container-fluid pb-2">
  <div class="row" v-if="isLoaded">
    <h4 class="col-12 py-2 px-3 bg-light border-bottom">
      <div class="d-flex">
        <editable-input class="flex-grow-1" v-model="dashboard.title" @input="saveTitle" placeholder="title" required></editable-input>
        <div id="dashboard-actions" class="my-2 my-lg-0 d-none d-lg-block">
          <button type="button" class="btn btn-sm btn-light d-inline-block" @click="showCustomiseModal = true">Customise dashboard</button>
          <button type="button" class="btn btn-sm btn-light d-inline-block" @click="showConfirmDeleteDashboard = true">Delete dashboard</button>
        </div>
      </div>
    </h4>
    <div class="col-12 mb-3">
      <editable-text-area class="dashboard-description" v-model="dashboard.description" @input="saveDescription" placeholder="Description" add-button-label="Add a description"></editable-text-area>
    </div>
    <nav id="dashboard-cards-actions" class="navbar navbar-expand navbar-light bg-light col-12 mb-2 py-1 border-top border-bottom d-print-none">
      <div class="collapse navbar-collapse flex-wrap">
        <ul class="navbar-nav d-none d-md-flex">
          <li class="nav-item">
            <span class="navbar-text">Add a card:</span>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="addWidget('map')" title="Add a map"><font-awesome-icon icon="map" /></button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="addWidget('graph')" title="Add a graph"><font-awesome-icon icon="chart-bar" /></button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="addWidget('table')" title="Add a table"><font-awesome-icon icon="table" /></button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="addWidget('textarea')" title="Add a text area"><span style="font-size: 18px;line-height: 18px;font-family: initial;font-weight: bold;">T</span></button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="addWidget('image')" title="Add an image"><font-awesome-icon icon="image" /></button>
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
        <ul class="navbar-nav mr-3">
          <li class="nav-item">
            <span class="navbar-text border-right mx-2" style="height: 24px;vertical-align:middle;"></span>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-sm btn-light" disabled @click="edit()">Share</button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-sm btn-light" @click="printDashboard()">Export</button>
          </li>
        </ul>
      </div>
    </nav>
    <drag-drop-widgets v-bind:dashboard="dashboard" @edit="editWidget" @delete="removeWidget"></drag-drop-widgets>
    <dashboard-customise-modal v-if="showCustomiseModal" @close="showCustomiseModal = false" @validate="setCustomisation" v-bind:dashboard="dashboard"></dashboard-customise-modal>
    <dashboard-card-modal v-if="showCardModal" @close="closeEditCardModal" @input="setEditedWidget" v-model="editedCard"></dashboard-card-modal>
    <confirm-modal v-if="showConfirmDeleteDashboard" content="Do you really want to delete the dashboard?" @close="showConfirmDeleteDashboard = false" @confirm="deleteDashboard"></confirm-modal>
  </div>
  <Loading v-else/>
</div>
</template>

<script>
import DashboardCardModal from '@/components/Dashboard/DashboardCardModal'
import DashboardCustomiseModal from '@/components/Dashboard/DashboardCustomiseModal'
import Loading from '@/components/Loading/Loading'
import DashboardObj from '@/store/dashboard'
import GeoResources from '@/store/geoResources'
import DragDropWidgets from '@/components/Dashboard/DragDropWidgets'
import EditableInput from '@/components/EditableField/EditableInput'
import EditableTextArea from '@/components/EditableField/EditableTextArea'
import DropDown from '@/components/DropDown/DropDown'
import ConfirmModal from '@/components/Modal/ConfirmModal'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'DashboardContainer',
  components: {
    Loading,
    DashboardCardModal,
    DashboardCustomiseModal,
    DragDropWidgets,
    EditableInput,
    EditableTextArea,
    DropDown,
    ConfirmModal
  },
  computed: mapState({
    config: state => state.dashboards.active
  }),
  data () {
    return {
      isLoaded: false,
      showCardModal: false,
      showCustomiseModal: false,
      showConfirmDeleteDashboard: false,
      showNewModal: false,
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
    ...mapActions('dashboards', [
      'setDashboard', 'setWidget'
    ]),
    loadDashboard (config) {
      this.dashboard = new DashboardObj(config)
    },
    addWidget (type = 'map') {
      this.editWidget({ title: '', type, description: '' })
    },
    editWidget (card) {
      this.editedCard = Object.assign({}, card)
      this.showCardModal = true
    },
    setEditedWidget (card) {
      const scrollToCard = !card.id
      this.closeEditCardModal()
      this.setWidget(card)
      this.$ga.event('dashboard', 'editCard', `${card.title}: ${card.type}`)
      if (scrollToCard) {
        this.$nextTick(() => {
          let container = document.querySelector('#dashboard-container')
          let scrollY = container.offsetHeight
          setTimeout(function () {
            container.scrollTo({
              top: scrollY,
              behavior: 'smooth'
            })
          }, 0)
        })
      }
    },
    closeEditCardModal () {
      this.showCardModal = false
    },
    removeWidget (card) {
      this.dashboard.removeWidget(card)
      this.$ga.event('dashboard', 'removeCard')
      this.save()
    },
    saveTitle (title) {
      this.editedTitle = false
      this.dashboard.title = title
      this.save()
    },
    saveDescription (description) {
      this.editedDescription = false
      this.dashboard.description = description
      this.save()
    },
    setCustomisation (customisation) {
      this.showCustomiseModal = false
      this.dashboard.setLayout(customisation.layout)
      this.save()
    },
    save () {
      this.setDashboard(this.dashboard)
      this.$ga.event('dashboard', 'save')
    },
    deleteDashboard () {
      this.$emit('delete', this.dashboard)
      this.showConfirmDeleteDashboard = false
    },
    printDashboard () {
      window.print()
    }
  },
  watch: {
    config: 'loadDashboard'
  }
}
</script>

<style lang="scss">

#dashboard-container {
  position: absolute;
  overflow: auto;
  top: 0;
  bottom: 0;
  left:0;
  right:0;

  &.is-printing {
    position: relative;
    overflow: hidden;
  }
}

@media print {
  #dashboard-container {
    overflow: hidden;
    position: relative;

    button {
      display: none;
    }
  }
}
</style>
