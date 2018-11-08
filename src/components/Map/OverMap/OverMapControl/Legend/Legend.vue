<template>
  <div class="legend-displaying" v-if="isLoaded">
    <div class="position-relative d-flex align-items-center">
      <div class="mr-1 label">{{ legend.values[0].name }}</div>
      <div class="gradient flex-grow-1" v-bind:style="{ background: getGradientColor(legend.values) }"></div>
      <div class="ml-1 label">{{ legend.values[legend.values.length - 1].name }}</div>
    </div>
  </div>
</template>

<script>
// import Unit from '@/utils/unit'
import Settings from '@/store/settings'

export default {
  name: 'Legend',
  props: [
    'layer'
  ],
  data () {
    return {
      // unitFamily: false,
      // activeUnit: false,
      activeUnits: Settings.activeSettings,
      legend: false,
      isLoaded: false
    }
  },
  created () {
  },
  async mounted () {
    this.legend = await this.layer.getLegend()
    this.isLoaded = true
  },
  methods: {
    getGradientColor (values) {
      return `linear-gradient(to right, ${values.map(d => this.convertHex(d.color)).join(', ')})`
    },
    // changeActiveUnit (unit) {
    //   this.$set(this, 'activeUnit', unit)
    //   this.activeUnitLabel = Unit.getLabel(unit)
    // },
    convertHex (hex) {
      const r = parseInt(hex.substring(1, 3), 16)
      const g = parseInt(hex.substring(3, 5), 16)
      const b = parseInt(hex.substring(5, 7), 16)
      return `rgba(${r}, ${g}, ${b})`
    }
  },
  // filters: {
  //   convert: function (value, from, to) {
  //     if (from !== to) {
  //       value = Unit.convert(from, to, value)
  //     }
  //     return value
  //   }
  // },
  watch: {
    activeUnits: {
      async handler (val) {
        this.isLoaded = false
        this.legend = await this.layer.getLegend()
        this.isLoaded = true
        // this.changeActiveUnit(val[this.unitFamily])
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>

.legend-displaying {
  background: var(--white);
  position: relative;

  .gradient {
    height: 10px;
  }

  .label {
    font-size: 0.8em;
  }
}
</style>
