<template>
  <modal @close="close()">
    <div slot="header">Add coverage maps</div>
    <div slot="body" class="managing-modal-content">
      <div class="row h-100" v-if="isLoaded" v-bind:class="{'has-selection': selectedResource}">
        <div class="col-lg-4 h-100 d-flex flex-column managing-modal-list">
          <div>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><font-awesome-icon icon="search" /></span>
              </div>
              <input type="text" class="form-control" v-model="searchResource" placeholder="Search a resource" aria-label="Search a resource" aria-describedby="Search a resource">
              <div class="input-group-append" v-if="searchResource">
                <button class="btn btn-outline-secondary" title="Reset the search" type="button" @click="searchResource = ''">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>
          </div>
          <div class="h-100 position-relative">
            <div class="managing-modal-list-container">
              <div v-for="group in groups" :key="group.id" v-if="!searchResource">
                <button class="btn btn-light d-flex w-100" title="Toggle the group" @click="toggleGroup(group)">
                  <div class="w-100 text-left font-weight-bold">{{ group.label }}</div>
                  <div class="flex-shrink-1">
                    <font-awesome-icon v-bind:class="{'fa-rotate-90': displayedGroups.indexOf(group) > -1}" icon="caret-right" />
                  </div>
                </button>
                <div class="list-group list-group-flush" v-show="displayedGroups.indexOf(group) > -1">
                  <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" @click="selectResource(resource)" v-for="resource in getResourceByGroup(group)" :key="resource.id">
                    {{ resource.label }}
                  </a>
                </div>
              </div>
              <div v-if="searchResource">
                <h6>Search results</h6>
                <div class="list-group list-group-flush">
                  <a href="#" class="list-group-item list-group-item-action" @click="selectResource(resource)" v-for="resource in foundResources" :key="resource.id">{{ resource.label }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 h-100 managing-modal-selection position-relative">
          <div v-if="selectedResource" class="managing-modal-selection-container">
            <button class="btn btn-link d-lg-none" @click="backToList"><font-awesome-icon icon="caret-left" /> Back</button>
            <div class="container">
              <div id="preview-map" class="w-100 mb-2" style="height:200px"></div>
              <h5>{{ selectedResource.label }}</h5>
              <span v-for="(tag, key) in selectedResource.tags" :key="key" class="badge badge-secondary badge-pill mr-1 mb-2">{{ tag }}</span>
              <h6>Description</h6>
              <div class="mb-2">{{ selectedResource.description }}</div>
              <h6>Last update</h6>
              <div class="mb-2">{{ selectedResource.ingestion_date }}</div>
              <div v-if="isSelected" class="alert alert-info" role="alert">Resource already added</div>
              <button v-if="!isSelected && !isAdding && !showAlertMessage" type="button" class="btn btn-primary" @click="addToMap(selectedResource)"><font-awesome-icon icon="plus" /> Add to the map</button>
              <Loading v-if="isAdding"></Loading>
              <div v-if="showAlertMessage" class="alert alert-success mt-2" role="alert">
                Resource added to the map
              </div>
            </div>
          </div>
          <div class="alert alert-info" v-else>Select a resource to see a preview</div>
        </div>
      </div>
      <Loading v-else></Loading>
    </div>
  </modal>
</template>

<script>
import GeoResources from '@/store/geoResources'
import GeoResourcesGroups from '@/store/geoResourcesGroups'
import MapObj from '@/store/map'
import SelectedLayer from '@/store/selectedLayer'
import SelectedLayers from '@/store/selectedLayers'

import Modal from '@/components/Modal/Modal'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'CatalogueModal',
  components: {
    Modal,
    Loading
  },
  computed: {
    foundResources () {
      return this.resources.filter(resource => {
        return resource.label.toLowerCase().includes(this.searchResource.toLowerCase())
      })
    }
  },
  data () {
    return {
      groups: [],
      displayedGroups: [],
      resources: [],
      isLoaded: false,
      selectedResource: false,
      map: false,
      currentLayer: false,
      searchResource: '',
      selectedLayers: SelectedLayers.allSelectedLayers,
      isAdding: false,
      showAlertMessage: false,
      isSelected: false
    }
  },
  async created () {
    this.groups = await GeoResourcesGroups.getAllGroups()
    this.displayedGroups.push(this.groups[0])
    this.resources = await GeoResources.getAllResources()
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
    getResourceByGroup (group) {
      return this.resources.filter(r => r.groups.indexOf(group.id) > -1)
    },
    selectResource (resource) {
      this.selectedResource = resource
      this.isSelected = SelectedLayers.isSelected(resource)
      this.$nextTick(async () => {
        if (!this.map) {
          this.map = new MapObj('preview-map')
        }
        if (this.currentLayer) {
          this.currentLayer.remove()
        }

        this.currentLayer = await new SelectedLayer()
        await this.currentLayer.setLayer(this.selectedResource)
        this.currentLayer.addTo(this.map)
      })
    },
    backToList () {
      this.selectedResource = false
      this.map.remove()
      this.map = false
    },
    addToMap (resource) {
      this.isAdding = true
      this.$emit('selectedResource', resource)
    },
    close () {
      this.$emit('close')
    }
  },
  watch: {
    selectedLayers () {
      this.isAdding = false
      this.showAlertMessage = true
      setTimeout(() => {
        this.showAlertMessage = false
        this.isSelected = true
      }, 3000)
    }
  }
}
</script>
