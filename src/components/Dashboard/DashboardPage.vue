<template>
  <div id="dashboard">
    <div v-if="isLoaded" class="container">
      <div class="row">
        <h4 class="col-12 mt-2 mb-2 p-2">
          <span v-if="!isEditing">{{ dashboard.title }}</span>
          <button type="button" class="btn btn-light ml-2 edit" v-if="!isEditing" @click="edit()"><font-awesome-icon :icon="iconEdit" /> Edit</button>
          <div class="d-flex" v-if="isEditing">
            <div class="flex-grow-1">
            <input type="text" v-model="dashboard.title" class="form-control" id="title" placeholder="title">
            </div>
            <button type="button" class="btn btn-primary ml-2 save" @click="save()"><font-awesome-icon :icon="iconSave" /> Save</button>
          </div>
        </h4>
        <div class="col-12 mb-2 p-2">
          <SearchLocation v-model="selectedArea" @openMap="displaySearchHelper = true" />
        </div>
        <div class="alert alert-info col-12" role="alert" v-if="!selectedArea">
          Select a location to display the dashboard
        </div>
        <div class="alert alert-info col-12" role="alert" v-if="isEditing && selectedArea">
          Click on <button type="button" class="btn btn-primary" id="add-card" @click="addCard()"><font-awesome-icon :icon="iconPlus" /> Add a card</button> to add a new card
        </div>
        <DashboardWidget v-if="selectedArea" v-for="card in dashboard.cards" :key="card.id" v-bind:cardConfiguration="card" @edit="editCard(card)" v-bind:isEditing="isEditing" v-bind:selectedArea="selectedArea" :allParameters="allParameters"></DashboardWidget>
        <div class="col-md-4 p-2" v-if="isEditing && selectedArea">
          <button type="button" class="btn btn-primary" id="add-card" @click="addCard()"><font-awesome-icon :icon="iconPlus" /> Add a card</button>
          <button type="button" class="btn btn-primary" @click="save()"><font-awesome-icon :icon="iconSave" /> Save</button>
        </div>
      </div>
      <DashboardCardModal v-if="showCardModal" @close="closeEditCardModal()" @delete="removeCard(editedCard)" :editedCard="editedCard" :allParameters="allParameters"></DashboardCardModal>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import DashboardWidget from './DashboardWidget'
import DashboardCardModal from './DashboardCardModal'
import Loading from '@/components/Loading/Loading'
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import Parameter from '@/store/parameter.js'
import Area from '@/store/area.js'
import Api from '@/store/api.js'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faSave from '@fortawesome/fontawesome-free-solid/faSave'
import DashboardObj from '@/store/dashboard'
import UserConfiguration from '@/store/userConfiguration'

export default {
  name: 'DashboardPage',
  components: {
    SearchLocation,
    Loading,
    DashboardWidget,
    DashboardCardModal,
    FontAwesomeIcon
  },
  data () {
    return {
      isLoaded: false,
      isEditing: false,
      showCardModal: false,
      allParameters: [],
      selectedArea: false,
      // searchLocationValue: false,
      displaySearchHelper: false,
      dashboard: {},
      editedCard: {}
    }
  },
  computed: {
    iconPlus () {
      return faPlus
    },
    iconEdit () {
      return faEdit
    },
    iconSave () {
      return faSave
    }
  },
  async created () {
    this.allParameters = await Parameter.getAllParameters()
    this.selectedArea = Area.getSelectedArea()
    const savedDashboard = UserConfiguration.getDashboardConfiguration()
    this.dashboard = new DashboardObj(savedDashboard.title, savedDashboard.cards)
    this.isLoaded = true
  },
  methods: {
    updateSearchLocation (feature) {
      Area.setSelectedArea(feature)
      this.selectedArea = feature
    },
    addCard () {
      this.editCard(this.dashboard.addCard())
      // Scroll to the next graph
      let container = document.querySelector('#page-container')
      this.$nextTick(() => {
        setTimeout(function () {
          container.scrollBy({
            top: container.scrollHeight,
            behavior: 'smooth'
          })
        }, 0)
      })
    },
    editCard (card) {
      this.editedCard = card
      this.showCardModal = true
    },
    closeEditCardModal () {
      this.dashboard.setCard(this.editedCard)
      this.showCardModal = false
    },
    removeCard (card) {
      this.dashboard.removeCard(card)
      this.showCardModal = false
    },
    edit () {
      this.isEditing = true
    },
    save () {
      Api.setDashboard(this.dashboard)
      this.isEditing = false
    }
  }
}
</script>
