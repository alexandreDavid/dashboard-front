<template>
  <div id="time-slot" class="ml-4">
    <div>
      <div class="btn-group btn-group-sm" role="group">
        <button type="button" @click="changeSelectedModel(model)" class="change-selected-model btn btn-secondary btn-group-sm" v-for="model in daysModel" :key="model.value" v-bind:class="{active: model.value === activeModel.value}">
          {{model.label}}
        </button>
      </div>
    </div>
    <div class="mb-4 mt-1">
      <div class="d-inline-block align-middle">
        <button type="button" id="time-play" class="btn btn-secondary btn-sm" @click="play" v-show="!isPlaying"><font-awesome-icon :icon="iconPlay" /></button>
        <button type="button" id="time-pause" class="btn btn-secondary btn-sm" @click="pause" v-show="isPlaying"><font-awesome-icon :icon="iconPause" /></button>
      </div>
      <div class="d-inline-block align-middle position-relative ml-2">
        <div class="d-flex">
          <div class="flex-fill time-slot with-indicator" v-for="(time, i) in activeModel.times" :key="i" @click="goToTime(i)">
            <div v-if="i !== (activeModel.times.length - 1)" class="time-slot-content h-100 w-100">
            </div>
            <small class="time-slot-indicator">
              <div>{{getDateDay(time)}}</div>
              <div>{{getDateHour(time)}}</div>
            </small>
          </div>
          <div class="time-slot position-absolute current-time" :style="calculateCurrentPlacement()">
            <div class="bg-primary h-100 w-100">
            </div>
          </div>
          <div class="time-slot position-absolute now" :style="calculateNowPlacement()">
            <div class="h-100 w-100 text-center now-content">
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
import faPause from '@fortawesome/fontawesome-free-solid/faPause'

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default {
  name: 'TimeSlot',
  data () {
    const daysModel = this.getDaysModels()
    return {
      daysModel: daysModel,
      activeModel: daysModel[0],
      isPlaying: false,
      currentIndex: 0
    }
  },
  components: { FontAwesomeIcon },
  computed: {
    iconPlay () {
      return faPlay
    },
    iconPause () {
      return faPause
    }
  },
  methods: {
    changeSelectedModel (model) {
      this.activeModel = model
      this.isPlaying = false
      this.currentIndex = 0
    },
    play () {
      this.isPlaying = true
      this.activePlay()
    },
    pause () {
      this.isPlaying = false
    },
    activePlay () {
      if (this.currentIndex < (this.activeModel.times.length - 2)) {
        this.currentIndex++
        setTimeout(() => {
          if (this.isPlaying) {
            this.activePlay()
          }
        }, 1000)
      } else {
        this.pause()
      }
    },
    goToTime (timeIdx) {
      this.isPlaying = false
      this.currentIndex = timeIdx
    },
    getDateDay (date) {
      return dayNames[new Date(date * 1000).getDay() - 1]
    },
    getDateHour (date) {
      const d = new Date(date * 1000)
      return `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
    },
    getTransformValues (idx) {
      const translateValue = `translateX(${50 * idx}px)`
      return {
        transform: translateValue,
        WebkitTransform: translateValue,
        msTransform: translateValue
      }
    },
    calculateNowPlacement () {
      let now = Date.now() / 1000
      let nowIndex = this.activeModel.times.findIndex(time => now < time)
      if (nowIndex !== -1) {
        return this.getTransformValues(nowIndex - 1)
      } else {
        return {
          display: 'none'
        }
      }
    },
    calculateCurrentPlacement () {
      return this.getTransformValues(this.currentIndex)
    },
    getDaysModels () {
      return [
        {
          value: 2,
          label: '2 days',
          times: [1527717600, 1527728400, 1527739200, 1527750000, 1527760800, 1527771600, 1527782400, 1527793200, 1527804000, 1527814800, 1527825600, 1527836400, 1527846400]
        }, {
          value: 10,
          label: '10 days',
          times: [1527717600, 1527728400, 1527739200, 1527750000, 1527760800, 1527771600, 1527793200, 1527804000, 1527814800, 1527825600, 1527836400, 1527936400]
        }, {
          value: 90,
          label: '90 days'
        }
      ]
    }
  }
}
</script>
