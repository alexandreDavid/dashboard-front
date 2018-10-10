<template>
  <div class="d-flex">
    <div class="btn-group btn-group-sm mr-2" role="group">
      <button type="button" @click="changeSelectedValue(value)" v-for="(value, key) in data" v-bind:key="key" class="change-selected-model btn btn-secondary btn-group-sm" v-bind:class="{active: value.label === activeValue.label}">
        {{value.label}}
      </button>
    </div>
    <displayed-layer-control-params v-if="activeValue.data" :data="activeValue.data" @changeDisplaying="changeDisplaying"></displayed-layer-control-params>
  </div>
</template>

<script>
export default {
  name: 'DisplayedLayerControlParams',
  props: ['data'],
  data () {
    return {
      activeValue: false
    }
  },
  created () {
    this.changeSelectedValue(this.data[0])
  },
  methods: {
    changeSelectedValue (value) {
      this.activeValue = value
      if (value.layer) {
        this.changeDisplaying(value)
      }
    },
    changeDisplaying (value) {
      this.$emit('changeDisplaying', value)
    }
  }
}
</script>
