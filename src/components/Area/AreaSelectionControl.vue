<template>
  <div class="card">
    <div class="card-body p-2">
      <h6>Place selection</h6>
      <SearchLocation v-if="!drawMode" class="w-100 mb-2" v-model="val" @input="onSearchLocationSelected" @locate="zoom" />
      <area-selection-draw-controls v-if="drawMode" :drawMode="drawMode" @cancel="cancelDrawing" @validate="saveCustomLocation" @changeMode="switchDrawMode">
      </area-selection-draw-controls>
      <div class="btn-group btn-group-sm" role="group" aria-label="Draw group">
        <button type="button" class="btn btn-secondary" @click="startDrawMode('polygon')">Draw an area:</button>
        <button type="button" class="btn btn-secondary" @click="startDrawMode('polygon')" v-bind:class="{active: drawMode === 'polygon'}"><font-awesome-icon icon="draw-polygon" /></button>
        <button type="button" class="btn btn-secondary" @click="startDrawMode('circle')" v-bind:class="{active: drawMode === 'circle'}"><font-awesome-icon icon="circle" /></button>
        <button type="button" class="btn btn-secondary" @click="startDrawMode('rectangle')" v-bind:class="{active: drawMode === 'rectangle'}"><font-awesome-icon icon="vector-square" /></button>
      </div>
      <button type="button" class="btn btn-secondary btn-sm" disabled><font-awesome-icon icon="file-import" /> Import from file</button>
    </div>
  </div>
</template>

<script>
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import AreaSelectionDrawControls from './AreaSelectionDrawControls'
import Area from '@/store/area'

export default {
  name: 'AreaSelectionControl',
  inject: ['getMap', 'getAreaLayer'],
  components: {SearchLocation, AreaSelectionDrawControls},
  data () {
    return {
      drawMode: false,
      val: false
    }
  },
  mounted () {
    this.val = Area.getSelectedArea()
  },
  methods: {
    zoom () {
      this.getAreaLayer().zoomToArea()
    },
    async onSearchLocationSelected (val) {
      this.val = val
      Area.setSelectedArea(val)
      await this.getAreaLayer().setSelectedArea(val)
      this.$emit('change', val)
    },
    switchDrawMode (mode) {
      this.drawMode = mode
    },
    startDrawMode (mode) {
      this.getAreaLayer().remove()
      this.drawMode = mode
    },
    cancelDrawing () {
      this.getAreaLayer().add()
      this.drawMode = false
    },
    saveCustomLocation (newArea) {
      this.onSearchLocationSelected({
        name: 'Custom area',
        type: 'custom',
        geom: newArea.toGeoJSON(),
        radius: this.drawMode === 'circle' && newArea.getRadius()
      })
      this.drawMode = false
    }
  }
}
</script>
