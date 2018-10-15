<template>
  <div class="w-100">
    <button id="forecast-selection-btn" @click="$emit('openAddingLayerSideBar')" class="btn btn-primary shadow"><font-awesome-icon icon="plus" /> Add a layers</button>
    <div v-for="(layer, key) in layers" :key="key">
      <displayed-layer-control v-bind:parameter="layer"></displayed-layer-control>
    </div>
  </div>
</template>

<script>
import DisplayedLayerControl from '@/components/Map/DisplayedLayer/DisplayedLayerControl'

import Parameter from '@/store/parameter'

export default {
  name: 'DisplayedLayers',
  components: {
    DisplayedLayerControl
  },
  props: ['layers'],
  inject: ['getMap', 'getDisplayedLayer', 'getAreaLayer'],
  data () {
    return {
      displayedParameter: {}
    }
  },
  watch: {
    layers (layers) {
      Parameter.setDisplayedParameters(layers)
    }
  }
}
</script>
