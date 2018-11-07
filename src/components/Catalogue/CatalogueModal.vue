<template>
  <modal @close="close()">
    <div slot="header">Add coverage maps</div>
    <div slot="body" class="catalogue-modal-content">
      <div class="row h-100" v-if="isLoaded" v-bind:class="{'selected-ressource': selectedRessource}">
        <div class="col-lg-4 h-100 d-flex flex-column ressource-selection">
          <div>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><font-awesome-icon icon="search" /></span>
              </div>
              <input type="text" class="form-control" v-model="searchRessource" placeholder="Search a ressource" aria-label="Search a ressource" aria-describedby="Search a ressource">
              <div class="input-group-append" v-if="searchRessource">
                <button class="btn btn-outline-secondary" type="button" @click="searchRessource = ''">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>
          </div>
          <div class="h-100 position-relative">
            <div class="ressources-list">
              <div v-for="group in groups" :key="group.id" v-if="!searchRessource">
                <button class="btn btn-light d-flex w-100" @click="toggleGroup(group)">
                  <div class="w-100 text-left font-weight-bold">{{ group.friendly_name }}</div>
                  <div class="flex-shrink-1">
                    <font-awesome-icon v-bind:class="{'fa-rotate-90': displayedGroups.indexOf(group) > -1}" icon="caret-right" />
                  </div>
                </button>
                <div class="list-group list-group-flush" v-show="displayedGroups.indexOf(group) > -1">
                  <a href="#" class="list-group-item list-group-item-action" @click="selectRessource(ressource)" v-for="ressource in ressources" :key="ressource.name">{{ ressource.name }}</a>
                </div>
              </div>
              <div v-if="searchRessource">
                <h6>Search results</h6>
                <div class="list-group list-group-flush">
                  <a href="#" class="list-group-item list-group-item-action" @click="selectRessource(ressource)" v-for="ressource in foundRessources" :key="ressource.name">{{ ressource.name }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 h-100 ressource-info">
          <div v-if="selectedRessource">
            <button class="btn btn-link d-lg-none" @click="backToList"><font-awesome-icon icon="caret-left" /> Back</button>
            <div id="preview-map" class="w-100 mb-2" style="height:200px"></div>
            <div class="container">
              <h5>{{ selectedRessource.name }}</h5>
              <span v-for="(tag, key) in selectedRessource.tags" :key="key" class="badge badge-secondary badge-pill mr-1 mb-2">{{ tag }}</span>
              <h6>Description</h6>
              <div class="mb-2">{{ selectedRessource.description }}</div>
              <h6>Type</h6>
              <div class="mb-2">{{ selectedRessource.type }}</div>
              <h6>Creation date</h6>
              <div class="mb-2">{{ selectedRessource.creation_date }}</div>
              <h6>Ingestion date</h6>
              <div class="mb-2">{{ selectedRessource.ingestion_date }}</div>
              <button type="button" class="btn btn-primary" @click="addToMap(selectedRessource)"><font-awesome-icon icon="plus" /> Add to the map</button>
            </div>
          </div>
          <div class="alert alert-info" v-else>Select a ressource to see a preview</div>
        </div>
      </div>
      <Loading v-else></Loading>
    </div>
  </modal>
</template>

<script>
import Georessources from '@/store/geoRessources'
import GeoressourcesGroups from '@/store/geoRessourcesGroups'
import MapObj from '@/store/map'
import L from 'leaflet'

import Modal from '@/components/Modal/Modal'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'CatalogueModal',
  components: {
    Modal,
    Loading
  },
  computed: {
    foundRessources () {
      return this.ressources.filter(ressource => {
        return ressource.name.toLowerCase().includes(this.searchRessource.toLowerCase())
      })
    }
  },
  data () {
    return {
      groups: [],
      displayedGroups: [],
      ressources: [],
      isLoaded: false,
      selectedRessource: false,
      map: false,
      currentLayer: false,
      searchRessource: ''
    }
  },
  async created () {
    this.groups = await GeoressourcesGroups.getAllGroups()
    this.displayedGroups.push(this.groups[0])
    this.ressources = await Georessources.getAll()
    this.isLoaded = true
  },
  methods: {
    toggleGroup (group) {
      const idx = this.displayedGroups.indexOf(group)
      if (idx > -1) {
        this.displayedGroups.splice(idx, 1)
      } else {
        this.displayedGroups.push(group)
      }
    },
    selectRessource (ressource) {
      this.selectedRessource = ressource
      this.$nextTick(() => {
        if (!this.map) {
          this.map = new MapObj('preview-map')
        }
        if (this.currentLayer) {
          this.currentLayer.remove()
        }
        this.currentLayer = new L.GeoJSON(this.selectedRessource.extent)
        this.currentLayer.addTo(this.map)
        this.map.fitBounds(this.currentLayer.getBounds())
      })
    },
    backToList () {
      this.selectedRessource = false
      this.map.remove()
      this.map = false
    },
    addToMap (ressource) {
      this.$emit('selectedRessource', ressource)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
