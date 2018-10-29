<template>
  <div class="card mt-2 w-100" ref="layer">
    <div class="card-body p-2" v-if="isLoaded">
      <h6 class="d-flex align-items-center">
        <button class="btn btn-sm btn-light flex-shrink-1" @click="toggleDisplay"><font-awesome-icon v-bind:icon="opacity ? 'eye' : 'eye-slash'" /></button>
        <span class="w-100"> {{ parameter.label }}</span>
        <div class="btn-group btn-group-sm flex-shrink-1" role="group">
          <button class="btn btn-sm btn-light" @click="$emit('up')"><font-awesome-icon icon="arrow-up" /></button>
          <button class="btn btn-sm btn-light" @click="$emit('down')"><font-awesome-icon icon="arrow-down" /></button>
          <button class="btn btn-sm btn-light" @click="edit"><font-awesome-icon icon="cog" /></button>
          <button class="btn btn-sm btn-light" @click="$emit('remove')"><font-awesome-icon icon="trash" /></button>
        </div>
      </h6>
      <!-- <displayed-layer-time-control class="ml-2 mb-2" v-bind:parameter="val" @timeChange="setTime" @layerChange="setLayer" v-if="val"></displayed-layer-time-control> -->
      <opacity-slider class="w-100" v-model="opacity" @input="setOpacity"></opacity-slider>
      <Legend class="p-2" v-if="parameter" v-bind:layer="layer"></Legend>
      <time-serie v-model="val.activeTime" @input="setTime"></time-serie>
    </div>
    <displayed-layer-setting-tools v-if="showSettingTools" :parameter="val" v-fixed-position="position" @close="showSettingTools = false"></displayed-layer-setting-tools>
  </div>
</template>

<script>
import TimeSerie from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSerie'
import OpacitySlider from '@/components/Slider/OpacitySlider'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import DisplayedLayerTimeControl from '@/components/Map/DisplayedLayer/DisplayedLayerTimeControl'
import DisplayedLayerSettingTools from '@/components/Map/DisplayedLayer/DisplayedLayerSettingTools'

import DisplayedLayer from '@/store/displayedLayer'

export default {
  name: 'DisplayedLayerControl',
  inject: ['getMap'],
  props: ['parameter'],
  components: {
    OpacitySlider,
    Legend,
    DisplayedLayerTimeControl,
    DisplayedLayerSettingTools,
    TimeSerie
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
      displayDropDownTime: false,
      showSettingTools: false,
      position: false
    }
  },
  mounted () {
    this.layer = new DisplayedLayer(this.getMap())
    this.update(this.parameter)
    this.isLoaded = true
  },
  methods: {
    edit () {
      this.position = this.$refs.layer.getBoundingClientRect()
      this.showSettingTools = !this.showSettingTools
    },
    update (parameter) {
      this.layer.setDisplayedLayer(parameter)
      this.setOpacity(parameter.opacity)
      this.layer.setZIndex(parameter.zIndex)
      if (parameter.activeTime) {
        this.setTime(parameter.activeTime)
      }
    },
    setOpacity (value) {
      this.opacity = this.layer.setOpacity(value)
      this.val.opacity = this.opacity
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
    }
  },
  watch: {
    parameter: 'update'
  },
  destroyed () {
    this.layer.remove()
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
