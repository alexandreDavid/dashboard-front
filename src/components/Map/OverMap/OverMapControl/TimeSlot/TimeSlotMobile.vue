<template>
  <div id="time-slot" class="w-100">
    <div class="btn-group pb-2" role="group">
      <button type="button" @click="changeSelectedModel(model)" class="change-selected-model btn btn-secondary" v-for="model in daysModel" :key="model.value" v-bind:class="{active: model.value === activeModel.value}">
        {{model.label}}
      </button>
    </div>
    <div class="d-flex">
      <button type="button" id="time-slot-previous" class="btn btn-secondary shadow" @click="previous()"><font-awesome-icon :icon="iconPrevious" /></button>
      <div class="flex-grow-1 pl-2 pr-2">
        <select v-model="currentIndex" class="form-control w-100 shadow" @change="goToTime(currentIndex)">
          <option v-for="(time, i) in activeModel.times" :key="i" v-bind:value="i">{{getTimeFormated(time)}}</option>
        </select>
      </div>
      <div>
        <button type="button" id="time-slot-next" class="btn btn-secondary shadow" @click="next()"><font-awesome-icon :icon="iconNext" /></button>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretLeft from '@fortawesome/fontawesome-free-solid/faCaretLeft'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'
import TimeSlotCommon from './TimeSlotCommon'

export default {
  name: 'TimeSlotMobile',
  mixins: [TimeSlotCommon],
  components: { FontAwesomeIcon },
  computed: {
    iconPrevious () {
      return faCaretLeft
    },
    iconNext () {
      return faCaretRight
    }
  },
  methods: {
    changeSelectedModel (model) {
      this.activeModel = model
      this.currentIndex = 0
    },
    previous () {
      if (this.currentIndex > 0) {
        this.currentIndex--
        this.goToTime(this.currentIndex)
      }
    },
    next () {
      if (this.currentIndex < this.activeModel.times.length - 1) {
        this.currentIndex++
        this.goToTime(this.currentIndex)
      }
    },
    getTimeFormated (date) {
      const d = new Date(date * 1000)
      return `${d.toDateString()} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
    }
  }
}
</script>
