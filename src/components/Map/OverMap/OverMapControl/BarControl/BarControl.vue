<template>
  <div id="bar-control" class="btn-group-sm btn-group-vertical shadow">
    <button type="button" class="btn btn-primary" title="Zoom to my location" id="zoom-current-location" @click="zoomToCurrentLocation" v-if="hasCurrentLocation"><font-awesome-icon icon="location-arrow" /></button>
    <button type="button" class="btn btn-primary" title="Zoom in" id="zoom-in" @click="zoomIn" :disabled="zoomInDisabled"><font-awesome-icon icon="plus" /></button>
    <button type="button" class="btn btn-primary" title="Zoom out" id="zoom-out" @click="zoomOut" :disabled="zoomOutDisabled"><font-awesome-icon icon="minus" /></button>
    <button type="button" class="btn btn-primary" title="Zoom to area" id="zoom-to-area" @click="zoomToArea"><font-awesome-icon :icon="['far', 'square']" /></button>
    <button type="button" class="btn btn-primary" title="Manage the base map" id="open-base-map-control" @click="openBaseMapControl"><font-awesome-icon icon="layer-group" /></button>
  </div>
</template>

<script>
export default {
  name: 'BarControl',
  inject: ['getMap', 'getAreaLayer'],
  data () {
    return {
      map: this.getMap(),
      hasCurrentLocation: false,
      zoomInDisabled: false,
      zoomOutDisabled: false
    }
  },
  async created () {
    this.hasCurrentLocation = await this.getMap().setCurrentLocationLayer()
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
    zoomToCurrentLocation () {
      this.getMap().zoomToCurrentLocation()
    },
    _updateDisabled () {
      this.zoomInDisabled = this.map._zoom === this.map.getMaxZoom()
      this.zoomOutDisabled = this.map._zoom === this.map.getMinZoom()
    },
    zoomToArea () {
      this.getAreaLayer().zoomToArea()
    },
    openBaseMapControl () {
      this.$emit('openBaseMapControl')
    }
  }
}
</script>
