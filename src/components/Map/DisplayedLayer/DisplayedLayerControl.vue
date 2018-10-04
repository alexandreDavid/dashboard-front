<template>
  <div id="time-serie" class="w-100">
    <div class="mb-2" v-if="parameter.data">
      <displayed-layer-control-params :data="parameter.data" @changeDisplaying="changeSelectedModel"></displayed-layer-control-params>
    </div>
    <TimeSerie class="d-inline-block align-bottom" v-if="activeModel && activeModel.hasTimeFrame" v-model="activeModel" @change="onChange"></TimeSerie>
  </div>
</template>

<script>
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import TimeSerie from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSerie'
import DisplayedLayerControlParams from './DisplayedLayerControlParams'

export default {
  name: 'DisplayedLayerControl',
  inject: ['getDisplayedLayer'],
  props: ['parameter'],
  components: {
    Legend,
    TimeSerie,
    DisplayedLayerControlParams
  },
  data () {
    return {
      activeModel: false,
      activeTime: false,
      activeIndex: false
    }
  },
  mounted () {
    if (!this.parameter.data) {
      this.changeSelectedModel(this.parameter)
    }
  },
  methods: {
    onChange (value) {
      this.getDisplayedLayer().setTime(value)
    },
    setActiveIndex (idx) {
      this.activeIndex = idx
    },
    changeSelectedModel (model) {
      this.activeModel = model
      this.activeTime = false
      if (model.type === 'interval') {
        let nowIndex = model.times.findIndex(time => (Date.now() / 1000) < time.endTime)
        this.activeIndex = (nowIndex > -1 ? nowIndex : 0)
        this.activeTime = model.times[this.activeIndex]
      } else if (model.type === 'date') {
        this.activeTime = model.times[model.times.length - 1]
      }
      let layerParameters = {
        layers: model.layer,
        format: 'image/png',
        transparent: true
      }
      if (this.activeTime) {
        layerParameters.time = this.getDisplayedLayer().formatTime(this.activeTime)
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
      if (parameter.layer) {
        this.changeSelectedModel(parameter)
      }
    }
  }
}
</script>
