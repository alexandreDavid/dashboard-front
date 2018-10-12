<template>
  <div class="card">
    <div class="card-body p-2">
      <h6>Working area</h6>
      <SearchLocation v-if="!drawMode" class="w-100" v-model="val" @input="onSearchLocationSelected" @locate="zoom" />
      <div class="text-center">
        <button class="btn btn-link" @click="startDrawMode">Draw a custom location on the map</button>
      </div>
      <area-selection-draw-controls v-if="drawMode" @cancel="cancelDrawing" @validate="saveCustomLocation">
      </area-selection-draw-controls>
    </div>
  </div>
</template>

<script>
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import AreaSelectionDrawControls from './AreaSelectionDrawControls'
import Area from '@/store/area'

export default {
  name: 'AreaSelectionControl',
  inject: ['getAreaLayer'],
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
    onSearchLocationSelected (val) {
      this.val = val
      Area.setSelectedArea(val)
      this.getAreaLayer().setSelectedArea(val)
    },
    startDrawMode () {
      this.getAreaLayer().remove()
      this.drawMode = true
    },
    cancelDrawing () {
      this.getAreaLayer().add()
      this.drawMode = false
    },
    saveCustomLocation (newArea) {
      this.drawMode = false
      this.onSearchLocationSelected({
        name: 'Custom area',
        type: 'custom',
        geom: newArea.toGeoJSON()
      })
    }
  }
}
</script>
