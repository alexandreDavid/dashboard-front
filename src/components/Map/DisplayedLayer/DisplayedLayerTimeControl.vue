<template>
  <div class="w-100">
    <a class="nav-link dropdown-toggle" href="#" @click="showTime($event)" v-if="activeTime">{{ getTimeFormated(activeTime) }}</a>
    <div class="dropdown-menu shadow p-2 show" v-if="displayDropDownTime" v-fixed-position="position">
      <div class="mb-2" v-if="parameter.data">
        <displayed-layer-time-control-params :data="parameter.data" @changeDisplaying="changeSelectedModel"></displayed-layer-time-control-params>
      </div>
      <TimeSerie class="d-inline-block align-bottom" v-if="activeModel && parameter.hasTimeFrame" :activeTime="activeTime" v-model="activeModel" @change="onChange"></TimeSerie>
    </div>
  </div>
</template>

<script>
import TimeSerie from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSerie'
import DisplayedLayerTimeControlParams from './DisplayedLayerTimeControlParams'

export default {
  name: 'DisplayedLayerTimeControl',
  props: ['parameter', 'layer'],
  components: {
    TimeSerie,
    DisplayedLayerTimeControlParams
  },
  data () {
    return {
      displayDropDownTime: false,
      position: {},
      activeModel: false,
      activeTime: false,
      isLoaded: true
    }
  },
  mounted () {
    if (this.parameter.layer) {
      this.changeSelectedModel(this.parameter)
    }
    this.activeTime = this.calculateActiveTime(this.parameter)
  },
  methods: {
    showTime (el) {
      this.displayDropDownTime = true
      this.position = el.target.getBoundingClientRect()
      document.addEventListener('click', this.handleClickOutside)
    },
    onChange (value) {
      this.activeTime = value
      this.layer.setTime(value)
    },
    calculateActiveTime (model) {
      let activeTime = false
      if (model.type === 'interval') {
        let nowIndex = model.times.findIndex(time => (Date.now() / 1000) < time.endTime)
        activeTime = model.times[(nowIndex > -1 ? nowIndex : 0)]
      } else if (model.type === 'date') {
        activeTime = model.times[model.times.length - 1]
      }
      return activeTime || this.calculateActiveTime(model.data[0])
    },
    changeSelectedModel (model) {
      this.activeModel = model
      let layerParameters = {
        layers: model.layer,
        format: 'image/png',
        transparent: true
      }
      if (this.activeTime) {
        layerParameters.time = this.layer.formatTime(this.activeTime)
      }
      this.layer.setDisplayedLayer({
        layerUrl: `${process.env.GEOSERVER_URL}/wms`,
        layerParameters,
        unit: this.parameter.unit,
        legendUrl: this.parameter.legendUrl
      })
    },
    getTimeFormated (time) {
      let formatedDate
      if (time.startTime) {
        const startDate = new Date(time.startTime * 1000)
        const endDate = new Date(time.endTime * 1000)
        formatedDate = `${startDate.toDateString()} ${('0' + startDate.getHours()).slice(-2)}:${('0' + startDate.getMinutes()).slice(-2)} - ${('0' + endDate.getHours()).slice(-2)}:${('0' + endDate.getMinutes()).slice(-2)}`
      } else {
        const date = new Date(time * 1000)
        formatedDate = date.toDateString()
      }
      return formatedDate
    },
    handleClickOutside (evt) {
      if (this.$el.querySelector('.dropdown-menu') && !this.$el.querySelector('.dropdown-menu').contains(evt.target)) {
        this.displayDropDownTime = false
        document.removeEventListener('click', this.handleClickOutside)
      }
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
  },
  directives: {
    'fixed-position': function (el, binding) {
      el.style.position = 'fixed'
      el.style.top = `${binding.value.top + binding.value.height}px`
      el.style.left = `${binding.value.left}px`
      el.style.minWidth = `80%`
    }
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
