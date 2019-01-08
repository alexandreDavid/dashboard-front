<template>
  <div class="draw-control card shadow m-2">
    <div class="card-body p-2">
      <div class="btn-group mb-2" role="group" aria-label="Draw group">
        <button type="button" class="btn btn-secondary btn-sm" @click="startDrawMode('polygon')">Draw an area:</button>
        <button type="button" class="btn btn-secondary btn-sm" @click="startDrawMode('polygon')" v-bind:class="{active: drawMode === 'polygon'}"><font-awesome-icon icon="draw-polygon" /></button>
        <button type="button" class="btn btn-secondary btn-sm" @click="startDrawMode('circle')" v-bind:class="{active: drawMode === 'circle'}"><font-awesome-icon icon="circle" /></button>
        <button type="button" class="btn btn-secondary btn-sm" @click="startDrawMode('rectangle')" v-bind:class="{active: drawMode === 'rectangle'}"><font-awesome-icon icon="vector-square" /></button>
      </div>
      <div class="alert alert-info mb-0" role="alert">
        {{ message }}
      </div>
    </div>
    <div class="card-footer p-2">
      <button class="btn btn-secondary btn-sm" @click="(isEditing ? cancelEditing : cancelDraw)()">Cancel</button>
      <button class="btn btn-primary btn-sm" @click="stopEditing" v-if="isEditing">Save</button>
      <button class="btn btn-secondary btn-sm" @click="editDraw" v-if="!isDrawing && !isEditing">Edit</button>
      <button class="btn btn-secondary btn-sm" @click="deleteLastPoint" v-if="isDrawing && drawMode === 'polygon'" v-bind:disabled="!canDeleteLastPoint">Delete the last point</button>
      <button class="btn btn-primary btn-sm" @click="stopDraw" v-if="isDrawing" v-bind:disabled="!canValidateDraw">Finish</button>
      <button class="btn btn-success btn-sm" @click="validate" v-if="!isDrawing && !isEditing">Validate</button>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet-draw'

export default {
  name: 'AreaSelectionDrawControls',
  inject: ['getMap'],
  props: ['drawMode'],
  computed: {
    mode: {
      get () {
        return this.drawMode
      },
      set (val) {
        this.$emit('changeMode', val)
      }
    }
  },
  data () {
    return {
      isDrawing: false,
      isEditing: false,
      drawPolygon: false,
      customLayer: false,
      savedCustomLayer: false,
      canValidateDraw: false,
      canDeleteLastPoint: false,
      message: false
    }
  },
  mounted () {
    this.startDraw(this.mode)
  },
  methods: {
    startDrawMode (mode) {
      this.mode = mode
      this.eraseDraw()
      this.startDraw(mode)
    },
    startDrawPolygon () {
      this.drawPolygon = new L.Draw.Polygon(this.getMap())
      this.drawPolygon.enable()
      this.message = 'Click to start drawing a shape'

      this.getMap().on(L.Draw.Event.DRAWVERTEX, (event) => {
        this.canValidateDraw = event.layers.getLayers().length > 2
        this.canDeleteLastPoint = event.layers.getLayers().length > 1

        if (this.canValidateDraw) {
          this.message = 'Click first point to close this shape'
        } else {
          this.message = 'Click to continue drawing shape'
        }
      })
    },
    startDrawRectangle () {
      this.drawPolygon = new L.Draw.Rectangle(this.getMap())
      this.drawPolygon.enable()
      this.message = 'Click and drag to draw rectangle'
    },
    startDrawCircle () {
      this.drawPolygon = new L.Draw.Circle(this.getMap())
      this.drawPolygon.enable()
      this.message = 'Click and drag to draw circle'
    },
    startDraw (mode) {
      this.$ga.event('area', 'custom startDraw', mode)
      this.isDrawing = true
      this.canValidateDraw = false
      if (this.customLayer) {
        this.customLayer.remove()
      }

      switch (mode) {
        case 'polygon':
          this.startDrawPolygon()
          break
        case 'rectangle':
          this.startDrawRectangle()
          break
        case 'circle':
          this.startDrawCircle()
          break
      }

      const onCreated = (event) => {
        this.customLayer = event.layer
        this.drawPolygon.disable()
        this.customLayer.addTo(this.getMap())
        this.isDrawing = false
        this.getMap().off(L.Draw.Event.CREATED, onCreated)
        this.message = 'Click on the button Validate to save the area'
      }

      this.getMap().on(L.Draw.Event.CREATED, onCreated)
    },
    stopDraw () {
      this.$ga.event('area', 'custom stopDraw', this.mode)
      this.drawPolygon.completeShape()
    },
    deleteLastPoint () {
      this.drawPolygon.deleteLastVertex()
    },
    eraseDraw () {
      this.isDrawing = false
      this.drawPolygon && this.drawPolygon.disable()
      this.customLayer && this.customLayer.remove()
    },
    cancelDraw () {
      this.eraseDraw()
      this.$emit('cancel')
    },
    editDraw () {
      if (this.customLayer.getLatLngs) {
        this.savedCustomLayer = {
          latLngs: L.LatLngUtil.cloneLatLngs(this.customLayer.getLatLngs())
        }
      } else {
        this.savedCustomLayer = {
          latLng: L.LatLngUtil.cloneLatLng(this.customLayer.getLatLng()),
          radius: this.customLayer.getRadius()
        }
      }
      this.customLayer.editing.enable()
      this.isEditing = true
    },
    cancelEditing () {
      this.customLayer.edited = false
      if (this.savedCustomLayer.latLngs) {
        this.customLayer.setLatLngs(this.savedCustomLayer.latLngs)
      } else {
        this.customLayer.setLatLng(this.savedCustomLayer.latLng)
        this.customLayer.setRadius(this.savedCustomLayer.radius)
      }
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
      this.$ga.event('area', 'custom validate', this.mode)
      this.$emit('validate', this.customLayer)
    }
  }
}
</script>
<style lang="scss" scoped>

.draw-control {
  position: fixed;
  left: 400px;
  top: 62px;
}
</style>
