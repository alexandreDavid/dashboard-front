<template>
  <div class="dropdown-menu shadow p-2 show m-0" ref="dropdown">
    <h6 class="d-flex align-items-center">
      <span class="w-100">Layer setting tools</span>
      <button type="button" class="close" aria-label="Close" @click="$emit('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </h6>
    <div class="d-flex flex-wrap">
      <time-control class="m-1" v-if="parameter.hasTime()" @input="onTimeChange" v-model="parameter.geoResource.time" :times="parameter._availableTimes"></time-control>
      <button type="button" v-if="parameter.hasGraph()" class="btn btn-sm btn-secondary m-1" @click="openGraphModal"><font-awesome-icon icon="chart-bar" /> Open graph</button>
      <opacity-control class="m-1" v-model="parameter.geoResource.opacity" @input="setOpacity"></opacity-control>
    </div>
    <!-- <treshold-value-control :layer="parameter"></treshold-value-control> -->
    <GraphModal v-if="showModalGraph" v-bind:selectedArea="activeArea" v-bind:selectedParameter="parameter" @close="showModalGraph = false"></GraphModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import GraphModal from '@/components/Graph/GraphModal'
import OpacityControl from '@/components/Map/DisplayedLayer/OpacityControl'
import TimeControl from '@/components/Map/DisplayedLayer/TimeControl'
import TresholdValueControl from '@/components/Map/DisplayedLayer/TresholdValueControl'

export default {
  name: 'DisplayedLayerSettingTools',
  props: ['parameter'],
  components: {
    GraphModal,
    TimeControl,
    OpacityControl,
    TresholdValueControl
  },
  computed: mapGetters('areas', ['activeArea']),
  data () {
    return {
      showModalGraph: false
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
