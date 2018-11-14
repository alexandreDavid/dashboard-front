<template>
  <div class="dropdown-menu shadow p-2 show m-0" ref="dropdown">
    <h6 class="d-flex align-items-center">
      <span class="w-100">Layer setting tools</span>
      <button type="button" class="close" aria-label="Close" @click="$emit('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </h6>
    <div class="d-flex">
      <time-control class="m-1" @input="onTimeChange" v-model="parameter.geoResource.time" :times="parameter._availableTimes"></time-control>
      <button type="button" class="btn btn-sm btn-secondary m-1" @click="openGraphModal"><font-awesome-icon icon="chart-bar" /> Open graph</button>
      <opacity-control class="m-1" v-model="parameter.geoResource.opacity" @input="setOpacity"></opacity-control>
    </div>
    <GraphModal v-if="showModalGraph" v-bind:selectedArea="selectedArea" v-bind:selectedParameter="parameter" @close="showModalGraph = false"></GraphModal>
  </div>
</template>

<script>
import GraphModal from '@/components/Graph/GraphModal'
import Area from '@/store/area'
import OpacityControl from '@/components/Map/DisplayedLayer/OpacityControl'
import TimeControl from '@/components/Map/DisplayedLayer/TimeControl'

export default {
  name: 'DisplayedLayerSettingTools',
  props: ['parameter'],
  components: {
    GraphModal,
    TimeControl,
    OpacityControl
  },
  data () {
    return {
      showModalGraph: false,
      selectedArea: false
    }
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutside)
  },
  methods: {
    setOpacity (val) {
      this.$emit('setOpacity', val)
    },
    openGraphModal () {
      this.selectedArea = Area.getSelectedArea()
      this.showModalGraph = true
    },
    onTimeChange (time) {
      this.$emit('setTime', time)
    },
    handleClickOutside (evt) {
      if (!this.$el.contains(evt.target)) {
        this.$emit('close')
      }
    }
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
