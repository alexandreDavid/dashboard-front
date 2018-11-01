<template>
  <div class="btn-group">
    <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" @click="displayDropDownMenu = true">
      Opacity {{ opacity }}%
    </button>
    <drop-down class="dropdown-menu-right" v-if="displayDropDownMenu" @close="displayDropDownMenu = false">
      <opacity-slider class="w-100" v-model="opacity" @input="setOpacity"></opacity-slider>
    </drop-down>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown/DropDown'
import OpacitySlider from '@/components/Slider/OpacitySlider'

export default {
  name: 'OpacityControl',
  props: ['value'],
  components: {
    DropDown,
    OpacitySlider
  },
  data () {
    return {
      displayDropDownMenu: false,
      opacity: 0
    }
  },
  created () {
    this.opacity = this.value
  },
  methods: {
    setOpacity (value) {
      this.opacity = value
      this.$emit('input', value)
    }
  }
}
</script>
