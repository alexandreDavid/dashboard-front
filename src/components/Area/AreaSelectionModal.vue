<template>
  <modal @close="close()">
    <div slot="header">Area configuration</div>
    <div slot="body" class="managing-modal-content">
      <div class="row h-100" v-bind:class="{'has-selection': editedArea}">
        <div class="col-lg-4 h-100 managing-modal-list" v-bind:class="areas.length ? 'd-flex flex-column' : 'd-none'">
          <button class="btn btn-primary mb-2 new-area" @click="editArea({})"><font-awesome-icon icon="plus" /> Add a new area</button>
          <div class="h-100 position-relative">
            <div class="managing-modal-list-container list-group list-group-flush" role="tablist">
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" @click="editArea(area)" v-for="(area, key) in areas" :key="key" v-bind:class="{active: area.isEditing}">
                {{ area.name }}
              </a>
            </div>
          </div>
        </div>
        <div class="h-100 managing-modal-selection position-relative" v-bind:class="areas.length ? 'col-lg-8' : 'w-100'">
          <div class="managing-modal-selection-container" v-if="editedArea">
            <button v-if="areas.length" class="btn btn-link d-lg-none back-to-list" @click="backToList"><font-awesome-icon icon="caret-left" /> Back</button>
            <div class="container">
              <h4>{{ editedArea.name || 'New area' }}</h4>
              <area-edition v-model="editedArea" @input="afterEdit" class="col-12"></area-edition>
            </div>
          </div>
          <div class="alert alert-info" v-else>Select an area to see a preview</div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="close()">Close</button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import AreaEdition from '@/components/Area/AreaEdition'

import DefinedAreas from '@/store/definedAreas'

export default {
  name: 'AreaSelectionModal',
  components: {
    Modal,
    AreaEdition
  },
  data () {
    return {
      areas: [],
      editedArea: false,
      drawControl: false
    }
  },
  created () {
    this.areas = DefinedAreas.getAll()
    this.areas.forEach(a => {
      a.isEditing = false
    })
    if (!this.areas.length) {
      this.editArea({})
    }
  },
  methods: {
    editArea (area) {
      this.areas.forEach(a => {
        a.isEditing = false
      })
      area.isEditing = true
      this.editedArea = area
      this.$nextTick()
    },
    close () {
      this.$emit('close')
    },
    afterEdit (area) {
      let idx = this.areas.findIndex(a => a.isEditing === true)
      if (idx !== -1) {
        this.areas[idx] = area
      } else {
        area.id = ((this.areas.length && this.areas.sort((a, b) => b.id - a.id)[0].id) || 0) + 1
        this.areas.push(area)
      }
      DefinedAreas.setAll(this.areas)
      this.editArea(area)
    },
    backToList () {
      this.editedArea = false
    }
  }
}
</script>
