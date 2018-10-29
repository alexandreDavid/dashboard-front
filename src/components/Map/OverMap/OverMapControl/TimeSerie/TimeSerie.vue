<template>
  <div id="time-slot" class="w-100">
    <div class="d-flex align-items-end" v-if="isLoaded">
      <div class="mr-1">
        <div class="dropdown">
          <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" @click="displayDropDownMenu = true">
            {{ activeModel.name }}
          </button>
          <drop-down v-if="displayDropDownMenu" @close="displayDropDownMenu = false">
            <a class="dropdown-item" href="#" v-for="(model, key) in models" :key="key" @click="changeModel(model)">{{ model.name }}</a>
          </drop-down>
        </div>
      </div>
      <div class="mr-1">
        <button type="button" id="time-play" class="btn btn-secondary btn-sm" @click="play" v-show="!isPlaying"><font-awesome-icon icon="play" /></button>
        <button type="button" id="time-pause" class="btn btn-secondary btn-sm" @click="pause" v-show="isPlaying"><font-awesome-icon icon="pause" /></button>
      </div>
      <div class="flex-grow-1">
        <TimeSlider class="d-none d-sm-block" v-model="val" @input="onChange" v-bind:times="activeModel.times"></TimeSlider>
        <div class="text-center" style="font-size: 0.8em">{{ getTimeFormated(val) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown/DropDown'
import TimeSlider from '@/components/Slider/TimeSlider'

export default {
  name: 'TimeSerie',
  components: {
    DropDown, TimeSlider
  },
  props: [
    'value'
  ],
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {
      }
    }
  },
  data () {
    let twoDays = []
    let sevenDays = []
    // Try to find value to display to be removed for a smart service
    const initDate = new Date()
    // initDate.setDate(18)
    // initDate.setMonth(6)
    initDate.setHours(0, 0, 0, 0)
    for (let i = 0; i < 16; i++) {
      let startTime = initDate / 1000 + i * 10800
      let endTime = initDate / 1000 + (i + 1) * 10800
      twoDays.push({startTime, endTime})
    }
    for (let i = 0; i < 28; i++) {
      let startTime = initDate / 1000 + i * 21600
      let endTime = initDate / 1000 + (i + 1) * 21600
      sevenDays.push({startTime, endTime})
    }
    let sevenDaysSatellite = []
    let initDateSatellite = new Date()
    initDateSatellite.setHours(23, 59, 59, 0)
    initDateSatellite = initDateSatellite / 1000 - 30 * 86400
    for (let i = 0; i < 16; i++) {
      sevenDaysSatellite.push(initDateSatellite + i * 172800)
    }
    return {
      isLoaded: false,
      activeDateDuration: 1500,
      isPlaying: false,
      displayDropDownMenu: false,
      models: [
        {
          name: '2 days',
          times: twoDays
        }, {
          name: '7 days',
          times: sevenDays
        }, {
          name: '7 days bis',
          times: sevenDaysSatellite
        }
      ],
      currentIndex: 0,
      activeModel: {}
    }
  },
  created () {
    this.initActiveModelAndIndex()
    this.goToTime(this.currentIndex)
    this.isLoaded = true
  },
  methods: {
    initActiveModelAndIndex (currentTime) {
      let curIndex = -1
      for (let i = 0; i < this.models.length; i++) {
        let times = this.models[i].times
        if (currentTime && currentTime.endTime) {
          curIndex = times.findIndex(time => this.value.endTime === time.endTime)
        } else {
          curIndex = times.findIndex(time => this.value === time)
        }
        if (curIndex > -1) {
          this.currentIndex = curIndex
          this.activeModel = this.models[i]
          return
        }
      }
      this.activeModel = this.models[0]
      this.currentIndex = this.getNowIndex()
    },
    changeModel (model) {
      this.activeModel = model
      this.displayDropDownMenu = false
      this.currentIndex = this.getNowIndex()
      this.afterSelect()
    },
    getNowIndex () {
      let nowIndex = this.activeModel.times.findIndex(time => {
        let isIndex = false
        if (time.endTime) {
          isIndex = (Date.now() / 1000) < time.endTime
        } else {
          isIndex = (Date.now() / 1000) > time
        }
        return isIndex
      })
      return (nowIndex > -1 ? nowIndex : 0)
    },
    goToTime (timeIdx) {
      this.isPlaying = false
      this.currentIndex = timeIdx
      this.afterSelect()
    },
    afterSelect () {
      this.$emit('input', this.activeModel.times[this.currentIndex])
    },
    play () {
      this.isPlaying = true
      this.activePlay()
    },
    pause () {
      this.isPlaying = false
    },
    activePlay () {
      if (this.currentIndex < (this.models[0].times.length - 1)) {
        this.currentIndex++
        this.afterSelect()
        setTimeout(() => {
          if (this.isPlaying) {
            this.activePlay()
          }
        }, this.activeDateDuration)
      } else {
        this.pause()
      }
    },
    onChange (val) {
      this.$emit('input', val)
    },
    getTimeFormated (time) {
      let formatedDate
      if (time && time.startTime) {
        const startDate = new Date(time.startTime * 1000)
        const endDate = new Date(time.endTime * 1000)
        formatedDate = `${startDate.toDateString()} ${('0' + startDate.getHours()).slice(-2)}:${('0' + startDate.getMinutes()).slice(-2)} - ${('0' + endDate.getHours()).slice(-2)}:${('0' + endDate.getMinutes()).slice(-2)}`
      } else if (time) {
        const date = new Date(time * 1000)
        formatedDate = date.toDateString()
      }
      return formatedDate
    }
  }
}
</script>
