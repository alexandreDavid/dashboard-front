<template>
  <div class="card mt-2 w-100" ref="layer">
    <div class="card-body p-2">
      <h6 class="d-flex align-items-start">
        <button class="btn btn-xs btn-outline-secondary flex-shrink-1 mr-1" @click="select"><font-awesome-icon v-bind:class="{'text-white': !selected}" icon="check" /></button>
        <button class="btn btn-xs btn-secondary flex-shrink-1" @click="toggleDisplay"><font-awesome-icon v-bind:icon="opacity ? 'eye' : 'eye-slash'" /></button>
        <span class="w-100 mx-1"> {{ layer.geoResource.label }}</span>
        <div class="btn-group btn-group-xs flex-shrink-1" role="group">
          <button class="btn btn-sm btn-light up" @click="$emit('up')"><font-awesome-icon icon="arrow-up" /></button>
          <button class="btn btn-sm btn-light" @click="$emit('down')"><font-awesome-icon icon="arrow-down" /></button>
          <button class="btn btn-sm btn-light" @click="edit"><font-awesome-icon icon="cog" /></button>
          <button class="btn btn-sm btn-light" @click="$emit('remove')"><font-awesome-icon icon="trash" /></button>
        </div>
      </h6>
      <Legend class="py-2" v-bind:legend="layer._legend"></Legend>
      <time-serie v-if="layer.hasTime()" v-model="layer._time" :times="layer._availableTimes" @input="setTime"></time-serie>
    </div>
    <displayed-layer-setting-tools v-if="showSettingTools" :parameter="layer" v-fixed-position="position" @setTime="setTime" @setOpacity="setOpacity" @close="showSettingTools = false"></displayed-layer-setting-tools>
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
    opacity: {
      get () {
        return this.layer._opacity
      },
      set (val) {}
    },
    selected: {
      get () {
        return this.layer._selected
      },
      set (val) {
        this.layer.setSelected(val)
        this.$emit('select')
      }
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
      position: false
    }
  },
  methods: {
    select () {
      this.selected = !this.selected
    },
    edit () {
      this.position = this.$refs.layer.getBoundingClientRect()
      this.showSettingTools = !this.showSettingTools
    },
    setOpacity (value) {
      this.layer.setOpacity(value)
      this.$emit('change')
    },
    async setTime (value) {
      await this.layer.setTime(value)
      this.$emit('change')
    },
    toggleDisplay () {
      let opacity
      if (this.layer.geoResource.opacity) {
        this.savedOpacity = this.layer.geoResource.opacity
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
      if (document.body.clientWidth < el.offsetWidth) {
        el.style.left = 0
        el.style.right = 0
      } else if (document.body.clientWidth < (binding.value.left + binding.value.width + el.offsetWidth)) {
        el.style.left = `${document.body.clientWidth - el.offsetWidth}px`
        el.style.right = 0
      } else {
        el.style.left = `${binding.value.left + binding.value.width}px`
      }
    }
  }
}
</script>
