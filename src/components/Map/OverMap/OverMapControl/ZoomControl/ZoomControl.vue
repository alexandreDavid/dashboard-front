<template>
  <div class="btn-group-vertical shadow">
    <button type="button" class="btn btn-primary btn-sm border-bottom" @click="zoomIn" :disabled="zoomInDisabled"><font-awesome-icon :icon="iconPlus" /></button>
    <button type="button" class="btn btn-primary btn-sm border-top" @click="zoomOut" :disabled="zoomOutDisabled"><font-awesome-icon :icon="iconMinus" /></button>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faMinus from '@fortawesome/fontawesome-free-solid/faMinus'

export default {
  name: 'ZoomControl',
  inject: ['getMap'],
  data () {
    return {
      map: this.getMap(),
      zoomInDisabled: false,
      zoomOutDisabled: false
    }
  },
  components: { FontAwesomeIcon },
  computed: {
    iconPlus () {
      return faPlus
    },
    iconMinus () {
      return faMinus
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
    }
  }
}
</script>
