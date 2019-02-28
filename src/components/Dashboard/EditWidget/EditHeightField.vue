<template>
  <div class="form-group">
    <label class="w-100" for="title">Height</label>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-sm btn-secondary" @click="setAdvancedHeight('default')" v-bind:class="{active: valueModel === 'default'}">Default</button>
      <button type="button" class="btn btn-sm btn-secondary" @click="setAdvancedHeight('large')" :class="{active: valueModel === 'large'}">Large</button>
      <button type="button" class="btn btn-sm btn-secondary" @click="isCustomHeight = true" :class="{active: isCustomHeight}">
        <div class="form-inline">
          <label for="custom-height" class="mr-1">Custom</label>
          <div class="input-group input-group-sm">
            <input id="custom-height" type="number" min="0" :disabled="!isCustomHeight" @input="setAdvancedHeight(customHeight)" v-model="customHeight" class="form-control" placeholder="Height" aria-label="Height">
            <div class="input-group-append">
              <span class="input-group-text">px</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditHeightField',
  props: {
    value: {
      type: [String, Number],
      default: 'default'
    }
  },
  computed: {
    valueModel: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  data () {
    return {
      customHeight: null,
      isCustomHeight: false
    }
  },
  mounted () {
    this.checkCustomHeight(this.value)
    if (this.isCustomHeight) {
      this.customHeight = this.value
    }
  },
  methods: {
    setAdvancedHeight (val) {
      this.checkCustomHeight(val)
      this.valueModel = val
    },
    checkCustomHeight (val) {
      this.isCustomHeight = !isNaN(val)
    }
  },
  watch: {
    isCustomHeight (val) {
      if (val) {
        this.valueModel = this.customHeight
      }
    }
  }
}
</script>
