<template>
  <div class="w-100 card shadow">
    <div class="card-body p-2">
      <button id="forecast-selection-btn" @click="$emit('openAddingLayerSideBar')" class="btn btn-secondary w-100"><font-awesome-icon icon="plus" /> Add coverage maps</button>
      <displayed-layers-tools class="mt-2" v-if="selectedIndexes.length" v-bind:time="refLayer._time" v-bind:times="refLayer._availableTimes" v-bind:opacity="refLayer._opacity" @setTime="onTimeChanges" @setOpacity="setOpacity" @openGraphModal="openGraphModalSelected"></displayed-layers-tools>
      <div v-for="(layer, key) in selectedLayers" :key="key">
        <displayed-layer-control v-bind:layer="layer" @change="saveChanges" @select="select(key)" @remove="remove(key)" @up="up(key)" @down="down(key)"></displayed-layer-control>
      </div>
      <GraphModal v-if="showModalGraph" v-bind:selectedArea="selectedArea" v-bind:selectedParameter="modalParams" @close="showModalGraph = false"></GraphModal>
    </div>
  </div>
</template>

<script>
import SelectedLayers from '@/store/selectedLayers'
import Area from '@/store/area'

import DisplayedLayerControl from '@/components/Map/DisplayedLayer/DisplayedLayerControl'
import DisplayedLayersTools from '@/components/DisplayedLayers/DisplayedLayersTools'
import GraphModal from '@/components/Graph/GraphModal'

export default {
  name: 'DisplayedLayers',
  components: {
    DisplayedLayersTools,
    DisplayedLayerControl,
    GraphModal
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
      const selectedIdx = this.selectedIndexes.findIndex(i => i === index)
      if (selectedIdx > -1) {
        this.selectedIndexes.splice(selectedIdx, 1)
      } else {
        this.selectedIndexes.push(index)
      }
      this.refLayer = this.selectedLayers[this.selectedIndexes[0]]
    },
    onTimeChanges (time) {
      this.selectedIndexes.forEach(i => {
        this.selectedLayers[i].setTime(time)
      })
    },
    setOpacity (opacity) {
      this.selectedIndexes.forEach(i => {
        this.selectedLayers[i].setOpacity(opacity)
      })
    },
    openGraphModalSelected () {
      this.openGraphModal(this.refLayer.geoResource)
    },
    openGraphModal (modalParams) {
      this.selectedArea = Area.getSelectedArea()
      this.showModalGraph = true
      this.modalParams = modalParams
    }
  }
}
</script>
