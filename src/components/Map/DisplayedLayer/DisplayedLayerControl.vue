<template>
  <div class="card shadow mt-2 w-100">
    <div class="card-body p-2" v-if="isLoaded">
      <h6 class="d-flex align-items-center">
        <button class="btn btn-sm btn-light flex-shrink-1" @click="toggleDisplay"><font-awesome-icon v-bind:icon="opacity ? 'eye' : 'eye-slash'" /></button>
        <span class="w-100"> {{ parameter.label }}</span>
        <div class="btn-group btn-group-sm flex-shrink-1" role="group">
          <button class="btn btn-sm btn-light" @click="$emit('up')"><font-awesome-icon icon="arrow-up" /></button>
          <button class="btn btn-sm btn-light" @click="$emit('down')"><font-awesome-icon icon="arrow-down" /></button>
          <button class="btn btn-sm btn-light" @click="$emit('remove')"><font-awesome-icon icon="trash" /></button>
        </div>
      </h6>
      <button v-if="parameter.hasGraph" type="button" id="open-graph-modal" class="btn btn-sm btn-secondary align-bottom ml-2 mb-2" @click="initModal()"><font-awesome-icon icon="chart-bar" /> Open graph</button>
      <GraphModal v-if="showModalGraph" v-bind:selectedArea="selectedArea" v-bind:selectedParameter="parameter" @close="showModalGraph = false"></GraphModal>
      <displayed-layer-time-control class="ml-2 mb-2" v-bind:parameter="val" @timeChange="setTime" @layerChange="setLayer" v-if="val"></displayed-layer-time-control>
      <opacity-slider class="w-100" v-model="opacity" @input="setOpacity"></opacity-slider>
      <Legend class="p-2" v-if="parameter" v-bind:layer="layer"></Legend>
    </div>
  </div>
</template>

<script>
import OpacitySlider from '@/components/Slider/OpacitySlider'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import Area from '@/store/area'
import GraphModal from '@/components/Graph/GraphModal'
import DisplayedLayerTimeControl from '@/components/Map/DisplayedLayer/DisplayedLayerTimeControl'

import DisplayedLayer from '@/store/displayedLayer'

export default {
  name: 'DisplayedLayerControl',
  inject: ['getMap'],
  props: ['parameter'],
  components: {
    OpacitySlider,
    Legend,
    GraphModal,
    DisplayedLayerTimeControl
  },
  computed: {
    val: {
      get () {
        return this.parameter
      },
      set (val) {
      }
    }
  },
  data () {
    return {
      layer: false,
      activeModel: false,
      isLoaded: false,
      opacity: false,
      savedOpacity: false,
      selectedArea: false,
      showModalGraph: false,
      displayDropDownTime: false
    }
  },
  mounted () {
    this.layer = new DisplayedLayer(this.getMap())
    this.update(this.parameter)
    this.isLoaded = true
  },
  methods: {
    update (parameter) {
      this.layer.setDisplayedLayer(parameter)
      this.setOpacity(parameter.opacity)
      this.layer.setZIndex(parameter.zIndex)
      if (parameter.activeTime) {
        this.setTime(parameter.activeTime)
      }
    },
    setOpacity (value) {
      this.opacity = value
      if (isNaN(this.opacity)) {
        this.opacity = 80
      }
      this.layer.setOpacity(value)
      this.val.opacity = value
      this.$emit('input', this.val)
    },
    setLayer (value) {
      let layerParameters = {
        layers: value,
        format: 'image/png',
        transparent: true
      }
      if (this.val.time) {
        layerParameters.time = this.layer.formatTime(this.val.time)
      }
      this.layer.setDisplayedLayer({
        layerUrl: `${process.env.GEOSERVER_URL}/wms`,
        layerParameters,
        unit: this.val.unit,
        legendUrl: this.val.legendUrl
      })
      this.val.activeLayer = value
      this.$emit('input', this.val)
    },
    setTime (value) {
      this.layer.setTime(value)
      this.val.activeTime = value
      this.$emit('input', this.val)
    },
    toggleDisplay () {
      if (this.opacity) {
        this.savedOpacity = this.opacity
        this.opacity = 0
      } else {
        this.opacity = this.savedOpacity
      }
      this.setOpacity(this.opacity)
    },
    initModal () {
      this.selectedArea = Area.getSelectedArea()
      this.showModalGraph = true
    }
  },
  watch: {
    parameter: 'update'
  },
  destroyed () {
    this.layer.remove()
  }
}
</script>
