<template>
  <modal @close="close()">
    <div slot="header">Add coverage maps</div>
    <div slot="body" class="catalogue-modal-content">
      <div class="row h-100" v-if="isLoaded">
        <div class="col-md-4 h-100">
          <div class="ressources-list">
            <div class="list-group list-group-flush">
              <a href="#" class="list-group-item list-group-item-action" @click="selectRessource(ressource)" v-for="ressource in ressources" :key="ressource.name">{{ ressource.name }}</a>
            </div>
          </div>
        </div>
        <div class="col-md-8 h-100">
          <div v-if="selectedRessource">
            <div id="preview-map" class="w-100" style="height:200px"></div>
            <h5>{{ selectedRessource.name }}</h5>
            <span v-for="(tag, key) in selectedRessource.tags" :key="key" class="badge badge-secondary badge-pill mr-1 mb-2">{{ tag }}</span>
            <h6>Description</h6>
            <div class="mb-2">{{ selectedRessource.description }}</div>
            <button type="button" class="btn btn-primary" @click="addToMap(selectedRessource)"><font-awesome-icon icon="plus" /> Add to the map</button>
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
  data () {
    return {
      ressources: [],
      isLoaded: false,
      selectedRessource: false,
      map: false,
      currentLayer: false
    }
  },
  async created () {
    this.ressources = await Georessources.getAll()
    this.isLoaded = true
  },
  methods: {
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
    addToMap (ressource) {
      this.$emit('selectedRessource', ressource)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>

.catalogue-modal-content {
  height: 70vh;

  .ressources-list {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: auto;
  }
}

</style>
