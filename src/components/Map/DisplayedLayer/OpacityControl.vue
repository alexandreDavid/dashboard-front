<template>
  <div class="btn-group">
    <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" @click="displayDropDownMenu = true">
      Opacity {{ val }}%
    </button>
    <drop-down class="dropdown-menu-right" v-if="displayDropDownMenu" @close="displayDropDownMenu = false">
      <opacity-slider class="w-100" v-model="val" @input="setOpacity"></opacity-slider>
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
    val: {
      get () {
        return this.value
      },
      set (val) {}
    }
  },
  data () {
    return {
      displayDropDownMenu: false,
      opacity: 50
    }
  },
  methods: {
    setOpacity (value) {
      this.$emit('input', value)
    }
  }
}
</script>
