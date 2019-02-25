<template>
  <div class="btn-group">
    <button type="button" title="Change opacity" class="btn btn-secondary btn-sm dropdown-toggle" @click="displayDropDownMenu = true">
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
  computed: {
    opacity: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      displayDropDownMenu: false
    }
  },
  methods: {
    setOpacity (value) {
      this.opacity = value
    }
  }
}
</script>
