<template>
  <div id="time-serie" class="w-100" v-if="isLoaded">
    <div class="mb-2" v-if="parameter.data">
      <displayed-layer-control-params :data="parameter.data" @changeDisplaying="changeSelectedModel"></displayed-layer-control-params>
    </div>
    <TimeSerie class="d-inline-block align-bottom" v-if="activeModel && parameter.hasTimeFrame" v-model="activeModel" @change="onChange"></TimeSerie>
  </div>
</template>

<script>
import TimeSerie from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSerie'
import DisplayedLayerControlParams from './DisplayedLayerControlParams'

export default {
  name: 'DisplayedLayerControl',
  inject: ['getDisplayedLayer'],
  props: ['parameter'],
  components: {
    TimeSerie,
    DisplayedLayerControlParams
  },
  data () {
    return {
      activeModel: false,
      isLoaded: true
    }
  },
  mounted () {
    if (this.parameter.layer) {
      this.changeSelectedModel(this.parameter)
    }
  },
  methods: {
    onChange (value) {
      this.getDisplayedLayer().setTime(value)
    },
    changeSelectedModel (model) {
      this.activeModel = model
      let activeTime = false
      if (model.type === 'interval') {
        let nowIndex = model.times.findIndex(time => (Date.now() / 1000) < time.endTime)
        activeTime = model.times[(nowIndex > -1 ? nowIndex : 0)]
      } else if (model.type === 'date') {
        activeTime = model.times[model.times.length - 1]
      }
      let layerParameters = {
        layers: model.layer,
        format: 'image/png',
        transparent: true
      }
      if (activeTime) {
        layerParameters.time = this.getDisplayedLayer().formatTime(activeTime)
      }
      this.getDisplayedLayer().setDisplayedLayer({
        layerUrl: `${process.env.GEOSERVER_URL}/wms`,
        layerParameters,
        unit: this.parameter.unit,
        legendUrl: this.parameter.legendUrl
      })
    }
  },
  watch: {
    parameter (parameter) {
      this.isLoaded = false
      if (parameter.layer) {
        this.changeSelectedModel(parameter)
      }
      this.$nextTick(() => {
        this.isLoaded = true
      })
    }
  }
}
</script>
