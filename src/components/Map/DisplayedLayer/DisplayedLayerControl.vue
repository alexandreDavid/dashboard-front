<template>
  <div class="card mt-2 w-100" ref="layer">
    <div class="card-body p-2">
      <h6 class="d-flex align-items-start">
        <button class="btn btn-xs btn-outline-secondary flex-shrink-1 mr-1" @click="select"><font-awesome-icon v-bind:class="{'text-white': !selected}" icon="check" /></button>
        <button class="btn btn-xs btn-secondary flex-shrink-1" @click="toggleDisplay"><font-awesome-icon v-bind:icon="layer.geoRessource.opacity ? 'eye' : 'eye-slash'" /></button>
        <span class="w-100 mx-1"> {{ layer.geoRessource.name }}</span>
        <div class="btn-group btn-group-xs flex-shrink-1" role="group">
          <button class="btn btn-sm btn-light" @click="$emit('up')"><font-awesome-icon icon="arrow-up" /></button>
          <button class="btn btn-sm btn-light" @click="$emit('down')"><font-awesome-icon icon="arrow-down" /></button>
          <button class="btn btn-sm btn-light" @click="edit"><font-awesome-icon icon="cog" /></button>
          <button class="btn btn-sm btn-light" @click="$emit('remove')"><font-awesome-icon icon="trash" /></button>
        </div>
      </h6>
      <Legend class="p-2" v-bind:layer="layer"></Legend>
      <time-serie v-model="layer._time" :times="layer._availableTimes" @input="setTime"></time-serie>
    </div>
    <displayed-layer-setting-tools v-if="showSettingTools" :parameter="val" v-fixed-position="position" @setTime="setTime" @setOpacity="setOpacity" @close="showSettingTools = false"></displayed-layer-setting-tools>
  </div>
</template>

<script>
import TimeSerie from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSerie'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import DisplayedLayerSettingTools from '@/components/Map/DisplayedLayer/DisplayedLayerSettingTools'

export default {
  name: 'DisplayedLayerControl',
  props: ['layer'],
  computed: {
    val: {
      get () {
        return this.layer
      },
      set (val) {}
    }
  },
  components: {
    Legend,
    DisplayedLayerSettingTools,
    TimeSerie
  },
  data () {
    return {
      savedOpacity: false,
      displayDropDownTime: false,
      showSettingTools: false,
      position: false,
      selected: false
    }
  },
  methods: {
    select () {
      this.selected = !this.selected
      this.$emit('select', this.selected)
    },
    edit () {
      this.position = this.$refs.layer.getBoundingClientRect()
      this.showSettingTools = !this.showSettingTools
    },
    setOpacity (value) {
      this.layer.setOpacity(value)
      this.$emit('change')
    },
    setTime (value) {
      this.layer.setTime(value)
      this.$emit('change')
    },
    toggleDisplay () {
      let opacity
      if (this.layer.geoRessource.opacity) {
        this.savedOpacity = this.layer.geoRessource.opacity
        opacity = 0
      } else {
        opacity = this.savedOpacity
      }
      this.setOpacity(opacity)
    }
  },
  directives: {
    'fixed-position': function (el, binding) {
      el.style.position = 'fixed'
      el.style.top = `${binding.value.top}px`
      el.style.left = `${binding.value.left + binding.value.width}px`
    }
  }
}
</script>
