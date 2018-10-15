<template>
  <div class="card shadow mt-2 over-map-control w-100">
    <div class="card-body p-2" v-if="isLoaded">
      <h6>
        <button class="btn btn-sm btn-light" @click="toggleDisplay"><font-awesome-icon v-bind:icon="opacity ? 'eye' : 'eye-slash'" /></button> {{ parameter.label }}
      </h6>
      <button v-if="parameter.hasGraph" type="button" id="open-graph-modal" class="btn btn-sm btn-secondary align-bottom ml-2 mb-2" @click="initModal()"><font-awesome-icon icon="chart-bar" /> Open graph</button>
      <GraphModal v-if="showModalGraph" v-bind:selectedArea="selectedArea" v-bind:selectedParameter="parameter" @close="showModalGraph = false"></GraphModal>
      <opacity-slider class="w-100" v-model="opacity" @input="setOpacity"></opacity-slider>
      <Legend class="pl-2" v-if="parameter" v-bind:layer="layer"></Legend>
    </div>
    <Loading v-else></Loading>
  </div>
</template>

<script>
import OpacitySlider from '@/components/Slider/OpacitySlider'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import Area from '@/store/area'
import GraphModal from '@/components/Graph/GraphModal'
import Loading from '@/components/Loading/Loading'

import DisplayedLayer from '@/store/displayedLayer'

export default {
  name: 'DisplayedLayerControl',
  inject: ['getMap'],
  props: ['parameter'],
  components: {
    OpacitySlider,
    Legend,
    GraphModal,
    Loading
  },
  data () {
    return {
      layer: false,
      activeModel: false,
      isLoaded: false,
      opacity: 80,
      savedOpacity: false,
      selectedArea: false,
      showModalGraph: false
    }
  },
  mounted () {
    this.layer = new DisplayedLayer(this.getMap(), this.parameter)
    this.setOpacity(this.opacity)
    this.isLoaded = true
  },
  methods: {
    setOpacity (value) {
      this.layer.setOpacity(value)
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
  }
}
</script>
