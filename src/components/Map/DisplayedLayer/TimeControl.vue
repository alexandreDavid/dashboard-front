<template>
  <div class="btn-group">
    <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" @click="displayDropDownMenu = true">
      <font-awesome-icon icon="calendar-alt" /> {{ value }}
    </button>
    <select class="custom-select" v-model="selectedTime">
      <option v-for="(time, key) in times" :key="key" :value="time" href="#">{{ time }}</option>
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
