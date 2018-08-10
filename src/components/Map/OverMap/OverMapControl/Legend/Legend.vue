<template>
  <div>
    <div class="legend-displaying" v-if="getDisplayedLayer()._hasInteractiveLegend">
      <div v-if="asline" class="on-line position-relative d-flex border rounded-left rounded-right">
        <button type="button" class="btn btn-sm btn-secondary rounded-0" @click="switchUnit()">{{ activeUnit.label}}</button>
        <div class="gradient" v-bind:style="{ background: gradientColor }">
          <div class="d-flex justify-content-between align-items-center h-100 mx-3">
            <div v-for="(displayedValue, key) in displayedValues" :key="key" class="font-weight-bold">
              {{ displayedValue.quantity | convert(defaultUnit, activeUnit.unit) }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="p-1">
        <div class="btn-group btn-group-sm mb-1" role="group" aria-label="unit">
          <button type="button" @click="changeActiveUnit(unit)" class="btn btn-secondary" v-for="unit in availableUnits" :key="unit.key" v-bind:class="{active: unit.key === activeUnit.key}">
            {{unit.label}}
          </button>
        </div>
        <div class="d-flex align-items-stretch">
          <div class="gradient mr-1" v-bind:style="{ background: gradientColor }"></div>
          <div class="d-flex flex-column">
            <div v-for="(displayedValue, key) in displayedValues" :key="key">
              {{ displayedValue.quantity | convert(defaultUnit, activeUnit.unit) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <img v-bind:src="getDisplayedLayer()._legendUrl" v-else>
  </div>
</template>

<script>
import Unit from '@/utils/unit'

export default {
  name: 'Legend',
  inject: ['getDisplayedLayer'],
  props: [
    'asline'
  ],
  data () {
    let availableUnits = Unit.getUnitsFamily('temperature')
    return {
      defaultUnit: 'C',
      activeUnit: availableUnits.find(u => u.key === 'C'),
      hasInteractiveLegend: false,
      legendUrl: false,
      gradientColor: false,
      availableUnits: availableUnits,
      displayedValues: [{
        color: '#2c7bb6',
        opacity: '0.5',
        quantity: 281,
        label: '281'
      }, {
        color: '#abd9e9',
        opacity: '0.5',
        quantity: 286.1,
        label: '286.1'
      }, {
        color: '#ffffbf',
        opacity: '0.5',
        quantity: 291.2,
        label: '291.2'
      }, {
        color: '#fdae61',
        opacity: '0.5',
        quantity: 296.2,
        label: '296.2'
      }, {
        color: '#d7191c',
        opacity: '0.5',
        quantity: 301.3,
        label: '301.3'
      }]
    }
  },
  mounted () {
    this.gradientColor = `linear-gradient(${this.asline ? 'to right,' : ''}${this.displayedValues.map(d => this.convertHex(d.color, d.opacity)).join(', ')})`
  },
  methods: {
    switchUnit () {
      let curIndex = this.availableUnits.findIndex(u => u.key === this.activeUnit.key)
      curIndex++
      if (curIndex === this.availableUnits.length) {
        curIndex = 0
      }
      this.changeActiveUnit(this.availableUnits[curIndex])
    },
    changeActiveUnit (unit) {
      this.activeUnit = unit
      this.getDisplayedLayer().setUnit(this.activeUnit.key)
    },
    convertHex (hex, opacity) {
      const r = parseInt(hex.substring(1, 3), 16)
      const g = parseInt(hex.substring(3, 5), 16)
      const b = parseInt(hex.substring(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }
  },
  filters: {
    convert: function (value, from, to) {
      if (from !== to) {
        value = Unit.convert(from, to, value).toFixed(2)
      }
      return value
    }
  }
}
</script>

<style lang="scss" scoped>

.legend-displaying {
  background: white;
  position: relative;
  height: 100%;

  .gradient {
    width: 20px;
  }

  .on-line {
    .gradient {
      width: 100%;
    }
  }
}
</style>
