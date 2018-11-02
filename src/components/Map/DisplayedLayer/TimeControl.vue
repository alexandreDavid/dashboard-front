<template>
  <div class="btn-group">
    <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" @click="displayDropDownMenu = true">
      <font-awesome-icon icon="calendar-alt" /> {{ getTimeFormated(value) }}
    </button>
    <select class="custom-select" v-model="selectedTime">
      <option v-for="(time, key) in times" :key="key" :value="time" href="#">{{ getTimeFormated(time) }}</option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'TimeControl',
  props: ['value', 'times'],
  data () {
    return {
      displayDropDownMenu: false
    }
  },
  computed: {
    selectedTime: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    getTimeFormated (time) {
      let formatedDate
      if (time && time.startTime) {
        const startDate = new Date(time.startTime * 1000)
        const endDate = new Date(time.endTime * 1000)
        formatedDate = `${startDate.toDateString()} ${('0' + startDate.getHours()).slice(-2)}:${('0' + startDate.getMinutes()).slice(-2)} - ${('0' + endDate.getHours()).slice(-2)}:${('0' + endDate.getMinutes()).slice(-2)}`
      } else if (time) {
        const date = new Date(time * 1000)
        formatedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`
      }
      return formatedDate
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-select {
  position: absolute;
  left: 0;
  opacity: 0;
}
</style>
