<template>
  <div class="position-relative" :class="{'mb-3': legend.range}">
    <div v-for="(val, key) in legend.values" :key="key" class="d-flex align-self-center">
      <div class="discrete-square border mr-2" v-bind:style="{backgroundColor: val.color}"></div>
      <span class="flex-grow-1">{{ val.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegendDiscrete',
  props: {
    legend: {
      type: Object,
      required: true
    }
  },
  methods: {
  }
}
</script>
