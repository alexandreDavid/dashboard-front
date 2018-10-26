<template>
  <div class="w-100 card shadow">
    <div class="card-body p-2">
      <button id="forecast-selection-btn" @click="$emit('openAddingLayerSideBar')" class="btn btn-secondary w-100"><font-awesome-icon icon="plus" /> Add coverage maps</button>
      <div v-for="(layer, key) in val" :key="key">
        <displayed-layer-control v-bind:parameter="layer" @remove="remove(key)" @up="up(key)" @down="down(key)"></displayed-layer-control>
      </div>
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
  props: ['value'],
  computed: {
    val: {
      get () {
        const val = this.calculateZIndex(this.value)
        Parameter.setDisplayedParameters(val)
        return val
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      displayedParameter: {}
    }
  },
  methods: {
    remove (index) {
      this.val.splice(index, 1)
    },
    up (index) {
      this.val = this.move(this.val, index, index - 1)
    },
    down (index) {
      this.val = this.move(this.val, index, index + 1)
    },
    move (arr, oldIndex, newIndex) {
      if (newIndex >= arr.length) {
        return arr
      }
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
      return arr
    },
    calculateZIndex (layers) {
      layers.forEach((layer, key) => {
        layer.zIndex = (layers.length - key) * 10
      })
      return layers
    }
  }
}
</script>
