<template>
  <div id="dashboard">
    <div v-if="isLoaded" class="container col-md-9">
      <div class="row">
        <h4 class="col-12 mt-2 mb-2 p-2">Compare Parameter Graphs
          <button type="button" class="btn btn-light ml-2" v-if="selectedArea &&!isEditing" @click="edit()"><font-awesome-icon :icon="iconEdit" /> Edit</button>
          <button type="button" class="btn btn-primary ml-2" v-if="selectedArea && isEditing" @click="save()"><font-awesome-icon :icon="iconSave" /> Save</button>
        </h4>
        <div class="col-12 mb-2 p-2">
          <SearchLocation @input="onSearchLocationSelected" />
        </div>
        <DashboardWidget v-if="selectedArea" v-for="card in dashboard.cards" :key="card.id" v-bind:isEditing="isEditing2" v-bind:cardConfiguration="card" @edit="editCard(card)" v-bind:selectedArea="selectedArea" :allParameters="allParameters"></DashboardWidget>
        <div class="col-md-6 p-2" v-if="selectedArea && isEditing">
          <button type="button" class="btn btn-primary" @click="addCard()"><font-awesome-icon :icon="iconPlus" /> Add a card</button>
          <button type="button" class="btn btn-primary" @click="save()"><font-awesome-icon :icon="iconSave" /> Save</button>
        </div>
      </div>
      <modal v-if="showCardModal" @close="closeEditCardModal()">
        <div slot="header" class="w-100">
          <input type="text" v-model="editedCard.title" class="form-control" id="title" placeholder="title">
        </div>
        <DashboardCardModal slot="body" :editedCard="editedCard" @delete="removeCard(editedCard)" :allParameters="allParameters"></DashboardCardModal>
      </modal>
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
import DashboardObj from '@/store/dashboard.js'

export default {
  name: 'Dashboard',
  components: {
    SearchLocation,
    Loading,
    DashboardWidget,
    DashboardCardModal,
    FontAwesomeIcon
  },
  data() {
    return {
      isLoaded: false,
      isEditing: false,
      isEditing2: false,
      showCardModal: false,
      allParameters: [],
      selectedArea: false,
      dashboard: {},
      editedCard: {}
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
    this.isEditing = true
    this.dashboard = new DashboardObj()
    this.isLoaded = true
  },
  methods: {
    onSearchLocationSelected (newValue) {
      this.selectedArea = newValue
    },
    addCard() {
      this.editCard(this.dashboard.addCard())
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
    editCard (card) {
      this.editedCard = card
      this.isEditing2 = true
      this.showCardModal = true
    },
    closeEditCardModal () {
      this.dashboard.setCard(this.editedCard)
      this.showCardModal = false
      this.isEditing2 = false
    },
    removeCard (card) {
      console.log(this.dashboard.allContents.findIndex(card))
      this.dashboard.allContents.splice(this.dashboard.allContents.findIndex(card), 1);
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
