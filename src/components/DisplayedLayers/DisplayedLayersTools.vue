<template>
  <div>
    <time-control class="mb-1" @input="onTimeChanges" v-model="currentTime" :times="times"></time-control>
    <play-button class="mb-1" @input="onTimeChanges" v-model="currentTime" :times="times" :wait-load="waitLoad"></play-button>
    <opacity-control class="mb-1" v-model="currentOpacity" @input="setOpacity"></opacity-control>
    <button type="button" class="btn btn-sm btn-secondary mb-1" @click="$emit('openGraphModal')"><font-awesome-icon icon="chart-bar" /> Open graph</button>
  </div>
</template>

<script>
import OpacityControl from '@/components/Map/DisplayedLayer/OpacityControl'
import TimeControl from '@/components/Map/DisplayedLayer/TimeControl'
import PlayButton from '@/components/Map/OverMap/OverMapControl/TimeSerie/PlayButton'

export default {
  name: 'DisplayedLayersTools',
  components: {
    TimeControl,
    OpacityControl,
    PlayButton
  },
  props: [
    'time', 'times', 'opacity', 'layers'
  ],
  computed: {
    currentTime: {
      get () {
        return this.time
      },
      set (val) {
        this.$emit('setTime', val)
      }
    },
    currentOpacity: {
      get () {
        return this.opacity
      },
      set (val) {
        this.$emit('setOpacity', val)
      }
    }
  },
  data () {
    return {
      showModalGraph: false,
      selectedArea: false
    }
  },
  methods: {
    setOpacity (val) {
      this.currentOpacity = val
    },
    onTimeChanges (time) {
      this.currentTime = time
    },
    async waitLoad () {
      let allPromises = []
      this.layers.forEach(l => {
        let promise = new Promise(function (resolve, reject) {
          l._layer.once('load', () => {
            resolve()
          })
        })
        allPromises.push(promise)
      })
      return Promise.all(allPromises)
    }
  }
}
</script>
