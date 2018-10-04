<template>
  <div class="btn-group-sm btn-group-vertical shadow">
    <button type="button" class="btn btn-primary" id="zoom-in" @click="zoomIn" :disabled="zoomInDisabled"><font-awesome-icon icon="plus" /></button>
    <button type="button" class="btn btn-primary" id="zoom-out" @click="zoomOut" :disabled="zoomOutDisabled"><font-awesome-icon icon="minus" /></button>
    <button type="button" class="btn btn-primary" id="go-to-global" @click="goToGlobalView"><font-awesome-icon icon="globe-africa" /></button>
    <button type="button" class="btn btn-primary" id="open-base-map-control" @click="openBaseMapControl"><font-awesome-icon icon="layer-group" /></button>
  </div>
</template>

<script>
export default {
  name: 'BarControl',
  inject: ['getMap'],
  data () {
    return {
      map: this.getMap(),
      zoomInDisabled: false,
      zoomOutDisabled: false
    }
  },
  mounted () {
    this._updateDisabled()
    this.map.on('zoomend zoomlevelschange', this._updateDisabled, this)
  },
  methods: {
    zoomIn (e) {
      if (this.map._zoom < this.map.getMaxZoom()) {
        this.map.zoomIn(this.map.options.zoomDelta * (e.shiftKey ? 3 : 1))
      }
    },
    zoomOut (e) {
      if (this.map._zoom > this.map.getMinZoom()) {
        this.map.zoomOut(this.map.options.zoomDelta * (e.shiftKey ? 3 : 1))
      }
    },
    _updateDisabled () {
      this.zoomInDisabled = this.map._zoom === this.map.getMaxZoom()
      this.zoomOutDisabled = this.map._zoom === this.map.getMinZoom()
    },
    goToGlobalView () {
      this.map.setDefaultMap()
    },
    openBaseMapControl () {
      this.$emit('openBaseMapControl')
    }
  }
}
</script>
