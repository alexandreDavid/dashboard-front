<template>
  <div class="form-group">
    <div class="custom-control custom-switch">
      <input type="checkbox" v-model="hasCustomTitle" class="custom-control-input" id="has-custom-title">
      <label class="custom-control-label" for="has-custom-title">Define a custom title</label>
    </div>
    <input class="form-control" id="custom-title" placeholder="Custom title" v-model="customTitle" :disabled="!hasCustomTitle">
  </div>
</template>

<script>
export default {
  name: 'EditTitleField',
  props: [ 'value', 'defaultTitle' ],
  computed: {
    valueModel: {
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
      hasCustomTitle: false,
      customTitle: false
    }
  },
  mounted () {
    if (this.valueModel) {
      this.customTitle = this.valueModel
      this.hasCustomTitle = true
    } else {
      this.customTitle = this.defaultTitle
    }
  },
  methods: {
  },
  watch: {
    hasCustomTitle (val) {
      this.customTitle = this.defaultTitle
      this.valueModel = val && this.defaultTitle
    },
    customTitle (val) {
      if (this.hasCustomTitle && val) {
        this.valueModel = val
      }
    },
    defaultTitle (val) {
      if (!this.hasCustomTitle && val) {
        this.customTitle = this.defaultTitle
      }
    }
  }
}
</script>
