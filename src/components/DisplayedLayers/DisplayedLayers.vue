<template>
  <div class="w-100 card shadow">
    <div class="card-body p-2">
      <button id="forecast-selection-btn" @click="$emit('openAddingLayerSideBar')" class="btn btn-secondary w-100"><font-awesome-icon icon="plus" /> Add coverage maps</button>
      <displayed-layers-tools class="mt-2" v-if="refLayer" v-bind:time="refLayer._time" v-bind:times="refLayer._availableTimes" v-bind:opacity="refLayer._opacity" @setTime="onTimeChanges" @setOpacity="setOpacity" @openGraphModal="openGraphModalSelected"></displayed-layers-tools>
      <div v-for="(layer, key) in selectedLayers" :key="key">
        <displayed-layer-control v-bind:layer="layer" @change="saveChanges" @select="select(key)" @remove="remove(key)" @up="up(key)" @down="down(key)"></displayed-layer-control>
      </div>
      <multi-graph-modal v-if="showModalGraph" v-bind:selectedArea="selectedArea" v-bind:resources="modalParams" @close="showModalGraph = false"></multi-graph-modal>
    </div>
  </div>
</template>

<script>
import SelectedLayers from '@/store/selectedLayers'
import Area from '@/store/area'

import DisplayedLayerControl from '@/components/Map/DisplayedLayer/DisplayedLayerControl'
import DisplayedLayersTools from '@/components/DisplayedLayers/DisplayedLayersTools'
import MultiGraphModal from '@/components/Graph/MultiGraphModal'

export default {
  name: 'DisplayedLayers',
  components: {
    DisplayedLayersTools,
    DisplayedLayerControl,
    MultiGraphModal
  },
  data () {
    return {
      selectedLayers: SelectedLayers.allSelectedLayers,
      selectedIndexes: [],
      refLayer: false,
      showModalGraph: false,
      selectedArea: false,
      modalParams: false
    }
  },
  methods: {
    saveChanges () {
      SelectedLayers.saveChanges()
    },
    remove (index) {
      SelectedLayers.remove(index)
    },
    up (index) {
      SelectedLayers.up(index)
    },
    down (index) {
      SelectedLayers.down(index)
    },
    select (index) {
      const allSelectedLayers = this.selectedLayers.filter(l => l.isSelected())
      if (allSelectedLayers.length > 1) {
        this.refLayer = allSelectedLayers[0]
        this.refLayer2 = allSelectedLayers[1]
      } else {
        this.refLayer = false
        this.refLayer2 = false
      }
    },
    onTimeChanges (time) {
      this.selectedLayers.filter(l => l.isSelected()).forEach(l => l.setTime(time))
      this.selectedIndexes.forEach(i => {
        this.selectedLayers[i].setTime(time)
      })
      this.saveChanges()
    },
    setOpacity (opacity) {
      this.selectedLayers.filter(l => l.isSelected()).forEach(l => l.setOpacity(opacity))
      this.saveChanges()
    },
    openGraphModalSelected () {
      this.openGraphModal(this.refLayer.geoResource, this.refLayer2.geoResource)
    },
    openGraphModal (modalParams, modalParams2) {
      this.selectedArea = Area.getSelectedArea()
      this.showModalGraph = true
      this.modalParams = this.selectedLayers.filter(l => l.isSelected())
      this.modalParams2 = modalParams2
    }
  }
}
</script>
