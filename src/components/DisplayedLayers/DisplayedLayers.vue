<template>
  <div class="w-100 card shadow">
    <div class="card-body p-2">
      <button id="forecast-selection-btn" @click="$emit('openAddingLayerSideBar')" class="btn btn-secondary w-100"><font-awesome-icon icon="plus" /> Add coverage maps</button>
      <displayed-layers-tools class="mt-2" v-bind:layers="getSelectedLayers()" v-if="refLayer" v-bind:time="refLayer._time" v-bind:times="refLayer._availableTimes" v-bind:opacity="refLayer._opacity" @setTime="onTimeChanges" @setOpacity="setOpacity" @openGraphModal="openGraphModalSelected"></displayed-layers-tools>
      <div v-for="(layer, key) in allLayers" :key="key">
        <displayed-layer-control v-bind:layer="layer" @change="saveChanges" @select="select(key)" @remove="remove(key)" @up="up(key)" @down="down(key)"></displayed-layer-control>
      </div>
      <multi-graph-modal v-if="showModalGraph" v-bind:selectedArea="selectedArea" v-bind:resources="modalParams" @close="showModalGraph = false"></multi-graph-modal>
    </div>
  </div>
</template>

<script>
import SelectedLayers from '@/store/selectedLayers'
import Settings from '@/store/settings'
import DefinedAreas from '@/store/definedAreas'

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
      allLayers: SelectedLayers.allSelectedLayers,
      refLayer: false,
      showModalGraph: false,
      selectedArea: false,
      modalParams: false,
      activeUnits: Settings.activeSettings
    }
  },
  methods: {
    saveChanges () {
      SelectedLayers.saveChanges()
    },
    remove (index) {
      SelectedLayers.remove(index)
      this.select()
    },
    up (index) {
      SelectedLayers.up(index)
    },
    down (index) {
      SelectedLayers.down(index)
    },
    select () {
      const allSelectedLayers = this.getSelectedLayers()
      if (allSelectedLayers.length > 1) {
        this.refLayer = allSelectedLayers[0]
      } else {
        this.refLayer = false
      }
    },
    onTimeChanges (time) {
      this.getSelectedLayers().forEach(l => l.setTime(time))
      this.saveChanges()
    },
    setOpacity (opacity) {
      this.getSelectedLayers().forEach(l => l.setOpacity(opacity))
      this.saveChanges()
    },
    openGraphModalSelected () {
      this.openGraphModal(this.getSelectedLayers())
    },
    openGraphModal (modalParams) {
      this.selectedArea = DefinedAreas.getActiveArea()
      this.showModalGraph = true
      this.modalParams = this.getSelectedLayers()
    },
    getSelectedLayers () {
      return this.allLayers.filter(l => l.isSelected())
    }
  },
  watch: {
    activeUnits: {
      handler (val) {
        this.allLayers.forEach(l => {
          l.setUnit(val[l.getUnitFamily()])
        })
      },
      deep: true
    }
  }
}
</script>
