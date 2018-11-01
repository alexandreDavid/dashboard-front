<template>
  <div class="w-100 card shadow">
    <div class="card-body p-2">
      <button id="forecast-selection-btn" @click="$emit('openAddingLayerSideBar')" class="btn btn-secondary w-100"><font-awesome-icon icon="plus" /> Add coverage maps</button>
      <div v-for="(layer, key) in selectedLayers" :key="key">
        <displayed-layer-control v-bind:layer="layer" @remove="remove(key)" @up="up(key)" @down="down(key)"></displayed-layer-control>
      </div>
    </div>
  </div>
</template>

<script>
import SelectedLayers from '@/store/selectedLayers'

import DisplayedLayerControl from '@/components/Map/DisplayedLayer/DisplayedLayerControl'

export default {
  name: 'DisplayedLayers',
  components: {
    DisplayedLayerControl
  },
  data () {
    return {
      selectedLayers: SelectedLayers.allSelectedLayers
    }
  },
  methods: {
    remove (index) {
      SelectedLayers.remove(index)
    },
    up (index) {
      SelectedLayers.up(index)
    },
    down (index) {
      SelectedLayers.down(index)
    }
  }
}
</script>
