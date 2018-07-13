<template>
  <div id="dashboard">
    <div v-if="isLoaded" class="container">
      <div class="row">
        <h4 class="col-12 mt-2 mb-2 p-2">Compare Parameter Graphs
          <button type="button" class="btn btn-light ml-2 edit" v-if="selectedArea &&!isEditing" @click="edit()"><font-awesome-icon :icon="iconEdit" /> Edit</button>
          <button type="button" class="btn btn-primary ml-2 save" v-if="selectedArea && isEditing" @click="save()"><font-awesome-icon :icon="iconSave" /> Save</button>
        </h4>
        <div class="col-12 mb-2 p-2">
          <SearchLocation @input="onSearchLocationSelected" />
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
    this.isEditing = true
    this.dashboard = new DashboardObj()
    this.isLoaded = true
  },
  methods: {
    onSearchLocationSelected (newValue) {
      this.selectedArea = newValue
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
