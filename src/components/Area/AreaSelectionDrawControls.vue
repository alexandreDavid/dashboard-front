<template>
  <div>
    <div class="alert alert-info" role="alert">
      Click to start drawing a shape on the map
    </div>
    <button class="btn btn-secondary" @click="(isEditing ? cancelEditing : cancelDraw)()">Cancel</button>
    <button class="btn btn-primary" @click="stopEditing" v-if="isEditing">Save</button>
    <button class="btn btn-secondary" @click="editDraw" v-if="!isDrawing && !isEditing">Edit</button>
    <button class="btn btn-secondary" @click="deleteLastPoint" v-if="isDrawing" v-bind:disabled="!canDeleteLastPoint">Delete the last point</button>
    <button class="btn btn-primary" @click="stopDraw" v-if="isDrawing" v-bind:disabled="!canValidateDraw">Finish</button>
    <button class="btn btn-success" @click="validate" v-if="!isDrawing && !isEditing">Validate</button>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet-draw'

export default {
  name: 'AreaSelectionDrawControls',
  inject: ['getMap'],
  props: ['value'],
  data () {
    return {
      isDrawing: false,
      isEditing: false,
      drawPolygon: false,
      customLayer: false,
      savedCustomLayerLatLngs: false,
      canValidateDraw: false,
      canDeleteLastPoint: false
    }
  },
  mounted () {
    this.startDraw()
  },
  methods: {
    startDraw () {
      this.isDrawing = true
      this.canValidateDraw = false
      if (this.customLayer) {
        this.customLayer.remove()
      }

      this.drawPolygon = new L.Draw.Polygon(this.getMap())
      this.drawPolygon.enable()

      this.getMap().on(L.Draw.Event.CREATED, (event) => {
        this.customLayer = event.layer
        this.drawPolygon.disable()
        this.customLayer.addTo(this.getMap())
        this.isDrawing = false
      })

      this.getMap().on(L.Draw.Event.DRAWVERTEX, (event) => {
        this.canValidateDraw = event.layers.getLayers().length > 2
        this.canDeleteLastPoint = event.layers.getLayers().length > 1
      })
    },
    stopDraw () {
      this.drawPolygon.completeShape()
    },
    deleteLastPoint () {
      this.drawPolygon.deleteLastVertex()
    },
    cancelDraw () {
      this.isDrawing = false
      this.drawPolygon && this.drawPolygon.disable()
      this.customLayer && this.customLayer.remove()
      this.$emit('cancel')
    },
    editDraw () {
      this.savedCustomLayerLatLngs = L.LatLngUtil.cloneLatLngs(this.customLayer.getLatLngs())
      this.customLayer.editing.enable()
      this.isEditing = true
    },
    cancelEditing () {
      this.customLayer.edited = false
      this.customLayer.setLatLngs(this.savedCustomLayerLatLngs)
      this.customLayer.fire('revert-edited', {layer: this.customLayer})
      this.stopEditing()
    },
    stopEditing () {
      this.customLayer.editing.disable()
      this.isEditing = false
    },
    validate () {
      if (this.customLayer) {
        this.customLayer.remove()
      }
      this.$emit('validate', this.customLayer)
    }
  }
}
</script>
